# 小储的博客

基于 [VitePress](https://vitepress.dev/) 的个人博客，内容位于 `docs/` 目录。

## 本地开发

```bash
npm install
npm run dev      # 启动本地开发服务器
npm run build    # 构建静态站点到 docs/.vitepress/dist
npm run preview  # 预览构建结果
```

## 部署到 GitHub Pages

站点以「用户站点」形式发布，地址为 <https://old-gang.github.io/>，
仓库名必须是 `old-gang.github.io`，因此 `base` 配置为 `/`。

部署流程由 `.github/workflows/deploy.yml` 自动完成：推送到 `main` 分支即构建并发布。

首次部署只需要在仓库的 `Settings → Pages` 中把 `Source` 选为 **GitHub Actions**。

## 其他部署方式

`deploy.sh` 用于把构建产物通过 rsync 上传到自有服务器，与 GitHub Pages 互不影响。
