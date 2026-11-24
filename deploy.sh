#!/usr/bin/env bash
#
# 把 VitePress 构建产物通过 rsync 上传到自己的服务器。
#
# 用法：
#   cp deploy.config.example.sh deploy.config.sh   # 首次使用，先填好服务器信息
#   npm run deploy                                 # 或 ./deploy.sh
#
# 环境变量可以覆盖 deploy.config.sh 里的任意配置，例如临时换服务器：
#   REMOTE_HOST=1.2.3.4 ./deploy.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

CONFIG_FILE="$SCRIPT_DIR/deploy.config.sh"
if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ 找不到部署配置：$CONFIG_FILE"
  echo "   请先执行：cp deploy.config.example.sh deploy.config.sh 并填写服务器信息。"
  exit 1
fi

# 先记下调用时传入的环境变量，source 之后再用它们覆盖配置文件里的同名值，
# 这样 `REMOTE_HOST=1.2.3.4 ./deploy.sh` 这种临时覆盖才生效。
ENV_REMOTE_USER="${REMOTE_USER:-}"
ENV_REMOTE_HOST="${REMOTE_HOST:-}"
ENV_REMOTE_PORT="${REMOTE_PORT:-}"
ENV_REMOTE_PATH="${REMOTE_PATH:-}"
ENV_SITE_URL="${SITE_URL:-}"
ENV_REMOTE_RELOAD_COMMAND="${REMOTE_RELOAD_COMMAND:-}"

# shellcheck source=/dev/null
source "$CONFIG_FILE"

REMOTE_USER="${ENV_REMOTE_USER:-${REMOTE_USER:-root}}"
REMOTE_HOST="${ENV_REMOTE_HOST:-${REMOTE_HOST:-}}"
REMOTE_PORT="${ENV_REMOTE_PORT:-${REMOTE_PORT:-22}}"
REMOTE_PATH="${ENV_REMOTE_PATH:-${REMOTE_PATH:-/www/blog}}"
SITE_URL="${ENV_SITE_URL:-${SITE_URL:-}}"
REMOTE_RELOAD_COMMAND="${ENV_REMOTE_RELOAD_COMMAND:-${REMOTE_RELOAD_COMMAND:-}}"
LOCAL_BUILD_DIR="docs/.vitepress/dist"

if [ -z "$REMOTE_HOST" ]; then
  echo "❌ 没有配置 REMOTE_HOST，请在 deploy.config.sh 里填写服务器地址。"
  exit 1
fi

echo "🔨 开始构建 VitePress ..."
npm run build

if [ ! -f "$LOCAL_BUILD_DIR/index.html" ]; then
  echo "❌ 构建产物不存在：$LOCAL_BUILD_DIR/index.html"
  exit 1
fi

echo "📦 上传 $LOCAL_BUILD_DIR/ → $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

# --delete 让服务器上的文件和本地构建产物完全一致，会删掉已废弃的旧页面。
# 重复部署时 rsync 只传有变化的文件，第二次开始很快。
rsync -avz --delete \
  --human-readable \
  -e "ssh -p $REMOTE_PORT" \
  "$LOCAL_BUILD_DIR/" \
  "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

echo "✅ 文件上传完成"

if [ -n "$REMOTE_RELOAD_COMMAND" ]; then
  echo "🔄 在服务器执行：$REMOTE_RELOAD_COMMAND"
  ssh -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST" "$REMOTE_RELOAD_COMMAND"
fi

if [ -n "$SITE_URL" ]; then
  echo "🎉 部署完成：$SITE_URL"
else
  echo "🎉 部署完成"
fi
