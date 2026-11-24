#!/usr/bin/env node
/**
 * 把 Markdown 文档里引用的远程图片导出到站点静态目录，并把 src 改写成本地路径。
 *
 * 图片落盘位置和站点路径由 Markdown 文件自身推导，每个文档独占一个子目录：
 *   docs/java/Spring.md -> docs/public/images/spring/  （src 前缀 /images/spring）
 * 站点根目录（含 public/ 或 .vitepress/ 的目录）从文件所在目录逐级向上查找。
 *
 * 语雀 CDN 按 Referer 防盗链：不带 Referer 请求返回 200，带博客页面 Referer 返回 403。
 * 因此这里下载时显式不发送 Referer 头。
 *
 * 用法：
 *   npm run export:images -- --file docs/java/Spring.md
 *   npm run export:images -- --file docs/java/Spring.md docs/java/MySQL.md
 *   npm run export:images -- --file docs/java/Spring.md --dry-run
 *   npm run export:images -- --file docs/java/Spring.md --force --retries 10
 */

import { mkdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const DEFAULT_CONCURRENCY = 4;
const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_RETRY_COUNT = 5;
const RETRY_BACKOFF_BASE_MS = 800;

/** 站点静态资源目录：<站点根>/public/images/<文档名>/，对应站点路径 /images/<文档名>/。 */
const STATIC_ASSET_ROOT_SEGMENTS = ['public', 'images'];
const PUBLIC_PATH_ROOT_SEGMENT = 'images';

/** 判断"站点根目录"的标记：VitePress 配置目录或静态资源目录。 */
const SITE_ROOT_MARKERS = ['public', '.vitepress'];

/**
 * 每次返回新的正则实例，避免全局正则的 lastIndex 在多处复用时互相影响。
 * 匹配 HTML 的 <img ... src="..."> 标签，同时兼容 src='...' 的写法。
 */
function createHtmlImageSourcePattern() {
  return /<img\b[^>]*?\bsrc\s*=\s*(["'])([^"']+)\1/gi;
}

/** 匹配 Markdown 的 ![alt](url) 写法，便于处理使用该语法的文档。 */
function createMarkdownImagePattern() {
  return /!\[[^\]]*\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g;
}

const IMAGE_SIGNATURES = [
  { extensions: ['.png'], bytes: [0x89, 0x50, 0x4e, 0x47] },
  { extensions: ['.jpg', '.jpeg'], bytes: [0xff, 0xd8, 0xff] },
  { extensions: ['.gif'], bytes: [0x47, 0x49, 0x46, 0x38] },
];

function parsePositiveInteger(rawValue, optionName) {
  const parsedValue = Number.parseInt(rawValue, 10);
  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    throw new Error(`${optionName} 必须是大于 0 的整数`);
  }
  return parsedValue;
}

function parseCommandLineArguments(argv) {
  const options = {
    markdownFiles: [],
    outputDirectoryOverride: null,
    publicPrefixOverride: null,
    concurrency: DEFAULT_CONCURRENCY,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    retryCount: DEFAULT_RETRY_COUNT,
    overwriteExisting: false,
    rewriteMarkdown: true,
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!argument.startsWith('-')) {
      throw new Error(`无法识别的参数：${argument}（Markdown 文件请用 --file 指定）`);
    }

    const readSingleValue = () => {
      index += 1;
      if (index >= argv.length) {
        throw new Error(`参数 ${argument} 缺少取值`);
      }
      return argv[index];
    };

    switch (argument) {
      case '--file': {
        // 支持 --file a.md b.md 与 --file a.md --file b.md 两种写法
        let collectedCount = 0;
        while (index + 1 < argv.length && !argv[index + 1].startsWith('-')) {
          index += 1;
          options.markdownFiles.push(argv[index]);
          collectedCount += 1;
        }
        if (collectedCount === 0) {
          throw new Error('参数 --file 缺少取值');
        }
        break;
      }
      case '--out-dir':
        options.outputDirectoryOverride = readSingleValue();
        break;
      case '--public-prefix':
        options.publicPrefixOverride = readSingleValue();
        break;
      case '--concurrency':
        options.concurrency = parsePositiveInteger(readSingleValue(), '--concurrency');
        break;
      case '--timeout':
        options.timeoutMs = parsePositiveInteger(readSingleValue(), '--timeout') * 1000;
        break;
      case '--retries':
        options.retryCount = parsePositiveInteger(readSingleValue(), '--retries');
        break;
      case '--force':
        options.overwriteExisting = true;
        break;
      case '--no-rewrite':
        options.rewriteMarkdown = false;
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--help':
      case '-h':
        printUsageAndExit();
        break;
      default:
        throw new Error(`未知参数：${argument}`);
    }
  }

  if (options.markdownFiles.length === 0) {
    throw new Error('缺少必填参数 --file（可传多个文件）');
  }

  const hasOutputDirectoryOverride = options.outputDirectoryOverride !== null;
  const hasPublicPrefixOverride = options.publicPrefixOverride !== null;
  if (hasOutputDirectoryOverride !== hasPublicPrefixOverride) {
    throw new Error('--out-dir 与 --public-prefix 需要同时指定');
  }
  if (hasOutputDirectoryOverride && options.markdownFiles.length > 1) {
    throw new Error('--out-dir / --public-prefix 只能用于单个 --file，多文件会按文件名自动分目录');
  }

  if (hasPublicPrefixOverride) {
    options.publicPrefixOverride = options.publicPrefixOverride.replace(/\/+$/, '');
  }

  return options;
}

function printUsageAndExit() {
  console.log(`用法：node scripts/export-images.mjs --file <path> [--file <path> ...] [选项]

必填：
  --file <path...>        要处理的 Markdown 文件，可传多个（也可重复写 --file）
                          图片输出到 <站点根>/public/images/<文件名小写>/，src 前缀 /images/<文件名小写>

选项：
  --out-dir <dir>         覆盖图片输出目录（仅单文件可用，需与 --public-prefix 同时指定）
  --public-prefix <path>  覆盖改写 src 时使用的站点路径前缀（仅单文件可用）
  --concurrency <n>       并发下载数（默认 ${DEFAULT_CONCURRENCY}）
  --timeout <seconds>     单个请求超时秒数（默认 ${DEFAULT_TIMEOUT_MS / 1000}）
  --retries <n>           单张图片最多尝试次数（默认 ${DEFAULT_RETRY_COUNT}）
  --force                 覆盖已存在的同名图片
  --no-rewrite            只下载图片，不改写 Markdown
  --dry-run               只打印计划，不下载也不改文件
  -h, --help              显示本帮助`);
  process.exit(0);
}

function collectImageSources(markdown) {
  const sources = [];

  for (const match of markdown.matchAll(createHtmlImageSourcePattern())) {
    sources.push(match[2]);
  }
  for (const match of markdown.matchAll(createMarkdownImagePattern())) {
    sources.push(match[1]);
  }

  return sources;
}

function isRemoteHttpUrl(candidate) {
  return /^https?:\/\//i.test(candidate);
}

/**
 * 取 URL 最后一段作为文件名，去掉查询串和锚点。
 * 例：https://cdn.nlark.com/yuque/0/2025/png/21376908/1763643561157-xxx.png -> 1763643561157-xxx.png
 */
function fileNameFromUrl(imageUrl) {
  const pathname = new URL(imageUrl).pathname;
  const lastSegment = pathname.split('/').pop() ?? '';
  let decodedSegment = lastSegment;
  try {
    decodedSegment = decodeURIComponent(lastSegment);
  } catch {
    // 文件名编码异常时退回原始片段
  }
  return decodedSegment;
}

/** docs/java/Spring.md -> spring */
function imageDirectoryNameFromMarkdownPath(markdownPath) {
  return path.basename(markdownPath, path.extname(markdownPath)).toLowerCase();
}

async function pathExists(candidatePath) {
  try {
    await stat(candidatePath);
    return true;
  } catch {
    return false;
  }
}

/** 从 Markdown 所在目录向上查找站点根目录（含 public/ 或 .vitepress/），找不到返回 null。 */
async function findSiteRootDirectory(startDirectory) {
  let currentDirectory = startDirectory;

  while (true) {
    for (const marker of SITE_ROOT_MARKERS) {
      if (await pathExists(path.join(currentDirectory, marker))) {
        return currentDirectory;
      }
    }

    const parentDirectory = path.dirname(currentDirectory);
    if (parentDirectory === currentDirectory) {
      return null;
    }
    currentDirectory = parentDirectory;
  }
}

/**
 * 决定一个文档的图片落盘目录与站点前缀。
 * 默认按文档名推导；只有显式传入 --out-dir / --public-prefix 时才整体覆盖。
 */
async function resolveExportTarget({ markdownPath, outputDirectoryOverride, publicPrefixOverride }) {
  if (outputDirectoryOverride !== null) {
    return {
      outputDirectory: path.resolve(outputDirectoryOverride),
      publicPrefix: publicPrefixOverride,
    };
  }

  const siteRootDirectory = await findSiteRootDirectory(path.dirname(markdownPath));
  if (siteRootDirectory === null) {
    throw new Error(
      `无法从 ${markdownPath} 推断站点根目录（向上未找到 public/ 或 .vitepress/），请用 --out-dir 与 --public-prefix 指定`,
    );
  }

  const directoryName = imageDirectoryNameFromMarkdownPath(markdownPath);
  return {
    outputDirectory: path.join(siteRootDirectory, ...STATIC_ASSET_ROOT_SEGMENTS, directoryName),
    publicPrefix: `/${PUBLIC_PATH_ROOT_SEGMENT}/${directoryName}`,
  };
}

/**
 * 不同 URL 但末段同名的会互相覆盖，这里提前暴露出来，避免静默丢图。
 */
function buildDownloadPlan(imageUrls) {
  const planByFileName = new Map();
  const duplicateFileNameConflicts = [];

  for (const imageUrl of imageUrls) {
    const fileName = fileNameFromUrl(imageUrl);
    if (!fileName) {
      duplicateFileNameConflicts.push({ imageUrl, fileName, reason: 'URL 末段为空' });
      continue;
    }

    const existingEntry = planByFileName.get(fileName);
    if (existingEntry && existingEntry.imageUrl !== imageUrl) {
      duplicateFileNameConflicts.push({ imageUrl, fileName, reason: '与另一个 URL 末段同名' });
      continue;
    }

    planByFileName.set(fileName, { fileName, imageUrl });
  }

  return {
    downloads: [...planByFileName.values()],
    duplicateFileNameConflicts,
  };
}

async function fileExistsWithContent(filePath) {
  try {
    const fileStats = await stat(filePath);
    return fileStats.isFile() && fileStats.size > 0;
  } catch {
    return false;
  }
}

function validateImageBytes(buffer, fileName) {
  const extension = path.extname(fileName).toLowerCase();
  const signature = IMAGE_SIGNATURES.find((entry) => entry.extensions.includes(extension));
  if (!signature) {
    return;
  }

  const matchesSignature = signature.bytes.every((byte, offset) => buffer[offset] === byte);
  if (!matchesSignature) {
    throw new Error(`响应内容不是有效的 ${extension} 图片`);
  }
}

/**
 * Undici 的 "fetch failed" 会把真实原因放在 cause 里（ENOTFOUND / ECONNRESET 等），
 * 这里把 cause 一起拼进消息，方便定位是 DNS、网络还是防盗链问题。
 */
function describeFetchError(error) {
  const causeCode = error?.cause?.code;
  const causeMessage = error?.cause?.message;
  if (causeCode && causeMessage) {
    return `${error.message}（${causeCode}: ${causeMessage}）`;
  }
  if (causeCode) {
    return `${error.message}（${causeCode}）`;
  }
  return error?.message ?? String(error);
}

async function downloadImageOnce(imageUrl, destinationPath, timeoutMs) {
  const response = await fetch(imageUrl, {
    // 不发送 Referer：语雀 CDN 命中防盗链会返回 403
    headers: {
      Accept: 'image/avif,image/webp,image/png,image/*,*/*;q=0.8',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('text/html')) {
    throw new Error(`返回了 HTML 页面而不是图片（${contentType}）`);
  }

  const imageBytes = Buffer.from(await response.arrayBuffer());
  if (imageBytes.length === 0) {
    throw new Error('响应内容为空');
  }
  validateImageBytes(imageBytes, destinationPath);

  const temporaryPath = `${destinationPath}.part`;
  await writeFile(temporaryPath, imageBytes);
  await rename(temporaryPath, destinationPath);
  return imageBytes.length;
}

async function downloadImageWithRetry({ imageUrl, destinationPath, timeoutMs, retryCount }) {
  let lastError = null;

  for (let attempt = 1; attempt <= retryCount; attempt += 1) {
    try {
      const byteLength = await downloadImageOnce(imageUrl, destinationPath, timeoutMs);
      return { ok: true, byteLength, attempts: attempt };
    } catch (error) {
      lastError = error;
      await rm(`${destinationPath}.part`, { force: true });
      if (attempt < retryCount) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_BACKOFF_BASE_MS * attempt));
      }
    }
  }

  return {
    ok: false,
    errorMessage: describeFetchError(lastError),
    attempts: retryCount,
  };
}

async function runWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await worker(items[currentIndex], currentIndex);
    }
  });

  await Promise.all(workers);
  return results;
}

/**
 * 把命中的远程 src 替换成本地路径，其余属性（width/height/style 等）原样保留。
 */
function rewriteImageSources(markdown, urlToLocalPath) {
  let replacementCount = 0;

  const replaceUrl = (matchedUrl) => {
    const localPath = urlToLocalPath.get(matchedUrl);
    if (!localPath) {
      return null;
    }
    replacementCount += 1;
    return localPath;
  };

  const rewrittenMarkdown = markdown
    .replace(createHtmlImageSourcePattern(), (fullMatch, quote, url) => {
      const localPath = replaceUrl(url);
      return localPath ? fullMatch.replace(`${quote}${url}${quote}`, `${quote}${localPath}${quote}`) : fullMatch;
    })
    .replace(createMarkdownImagePattern(), (fullMatch, url) => {
      const localPath = replaceUrl(url);
      return localPath ? fullMatch.replace(url, localPath) : fullMatch;
    });

  return { rewrittenMarkdown, replacementCount };
}

/**
 * 处理单个 Markdown 文档：下载远程图片、按需改写 src，并返回本次统计。
 */
async function exportDocumentImages({ markdownFile, markdownPath, options }) {
  console.log(`\n=== ${markdownFile} ===`);

  const markdown = await readFile(markdownPath, 'utf8');
  const remoteImageUrls = [...new Set(collectImageSources(markdown).filter(isRemoteHttpUrl))];

  if (remoteImageUrls.length === 0) {
    console.log('没有找到远程图片引用，跳过。');
    return { downloadedCount: 0, skippedCount: 0, failureCount: 0, conflictCount: 0 };
  }

  const { outputDirectory, publicPrefix } = await resolveExportTarget({
    markdownPath,
    outputDirectoryOverride: options.outputDirectoryOverride,
    publicPrefixOverride: options.publicPrefixOverride,
  });

  const { downloads, duplicateFileNameConflicts } = buildDownloadPlan(remoteImageUrls);
  console.log(`远程图片引用：${remoteImageUrls.length} 个唯一 URL，计划导出 ${downloads.length} 个文件`);
  console.log(`输出目录：${path.relative(process.cwd(), outputDirectory) || '.'}`);
  console.log(`站点路径前缀：${publicPrefix}`);

  if (duplicateFileNameConflicts.length > 0) {
    console.warn('\n以下 URL 的文件名与其他 URL 冲突，已跳过：');
    for (const conflict of duplicateFileNameConflicts) {
      console.warn(`  - ${conflict.fileName}（${conflict.reason}）：${conflict.imageUrl}`);
    }
  }

  if (options.dryRun) {
    console.log('\n[dry-run] 将下载以下文件：');
    for (const download of downloads) {
      console.log(`  ${download.fileName}  <-  ${download.imageUrl}`);
    }
    return {
      downloadedCount: 0,
      skippedCount: 0,
      failureCount: 0,
      conflictCount: duplicateFileNameConflicts.length,
    };
  }

  await mkdir(outputDirectory, { recursive: true });

  const urlToLocalPath = new Map();
  let downloadedCount = 0;
  let skippedCount = 0;
  const failures = [];

  await runWithConcurrency(downloads, options.concurrency, async (download) => {
    const destinationPath = path.join(outputDirectory, download.fileName);
    const localPath = `${publicPrefix}/${download.fileName}`;
    urlToLocalPath.set(download.imageUrl, localPath);

    if (!options.overwriteExisting && (await fileExistsWithContent(destinationPath))) {
      skippedCount += 1;
      console.log(`跳过（已存在）：${download.fileName}`);
      return;
    }

    const result = await downloadImageWithRetry({
      imageUrl: download.imageUrl,
      destinationPath,
      timeoutMs: options.timeoutMs,
      retryCount: options.retryCount,
    });

    if (result.ok) {
      downloadedCount += 1;
      console.log(`已下载：${download.fileName}（${(result.byteLength / 1024).toFixed(1)} KB）`);
      return;
    }

    urlToLocalPath.delete(download.imageUrl);
    failures.push({ ...download, errorMessage: result.errorMessage });
    console.error(`下载失败：${download.fileName} - ${result.errorMessage}`);
  });

  console.log(
    `\n小结：成功 ${downloadedCount}，跳过 ${skippedCount}，失败 ${failures.length}，冲突跳过 ${duplicateFileNameConflicts.length}`,
  );

  if (options.rewriteMarkdown && urlToLocalPath.size > 0) {
    const { rewrittenMarkdown, replacementCount } = rewriteImageSources(markdown, urlToLocalPath);
    if (replacementCount > 0) {
      await writeFile(markdownPath, rewrittenMarkdown, 'utf8');
      console.log(`已改写 ${markdownFile} 中 ${replacementCount} 处图片引用为本地路径`);
    } else {
      console.log('文档中没有可改写的远程图片引用');
    }
  }

  if (failures.length > 0) {
    console.log('\n失败清单（可稍后重跑，已下载的会自动跳过）：');
    for (const failure of failures) {
      console.log(`  ${failure.fileName}  ${failure.imageUrl}`);
    }
  }

  return {
    downloadedCount,
    skippedCount,
    failureCount: failures.length,
    conflictCount: duplicateFileNameConflicts.length,
  };
}

async function main() {
  const options = parseCommandLineArguments(process.argv.slice(2));
  const processedPaths = new Set();
  const summaries = [];

  for (const markdownFile of options.markdownFiles) {
    const markdownPath = path.resolve(markdownFile);
    if (processedPaths.has(markdownPath)) {
      console.log(`\n跳过重复指定的文件：${markdownFile}`);
      continue;
    }
    processedPaths.add(markdownPath);

    summaries.push(await exportDocumentImages({ markdownFile, markdownPath, options }));
  }

  if (options.dryRun || summaries.length === 0) {
    return;
  }

  const totalDownloadedCount = summaries.reduce((total, summary) => total + summary.downloadedCount, 0);
  const totalSkippedCount = summaries.reduce((total, summary) => total + summary.skippedCount, 0);
  const totalFailureCount = summaries.reduce((total, summary) => total + summary.failureCount, 0);
  const totalConflictCount = summaries.reduce((total, summary) => total + summary.conflictCount, 0);

  console.log(
    `\n全部完成：共 ${summaries.length} 个文档，成功 ${totalDownloadedCount}，跳过 ${totalSkippedCount}，失败 ${totalFailureCount}，冲突跳过 ${totalConflictCount}`,
  );

  if (totalFailureCount > 0 || totalConflictCount > 0) {
    process.exitCode = 1;
  }
}

// 作为库被 import 时可以单独测试解析/改写逻辑，直接执行时才跑主流程
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`执行失败：${error.message}`);
    process.exitCode = 1;
  });
}

export {
  buildDownloadPlan,
  collectImageSources,
  fileNameFromUrl,
  imageDirectoryNameFromMarkdownPath,
  parseCommandLineArguments,
  resolveExportTarget,
  rewriteImageSources,
};
