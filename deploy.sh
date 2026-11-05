#!/bin/bash

# ==== 配置开始 ====
REMOTE_USER=root
REMOTE_HOST=47.98.244.69
REMOTE_PATH=/www/blog
LOCAL_BUILD_DIR=docs/.vitepress/dist
# ==== 配置结束 ====

echo "🚀 开始构建 VitePress 项目..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ 构建失败，退出脚本。"
  exit 1
fi

echo "📦 开始上传到服务器：$REMOTE_HOST"

# 使用 rsync 更快，带删除功能（保留最新文件）
rsync -avz --delete $LOCAL_BUILD_DIR/ $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/

if [ $? -ne 0 ]; then
  echo "❌ 上传失败，请检查网络和权限。"
  exit 1
fi

echo "✅ 上传成功！"

# （可选）重启 Nginx
echo "🔄 重启远程 Nginx 服务..."
ssh $REMOTE_USER@$REMOTE_HOST "bt restart nginx"

echo "🎉 部署完成！访问：http://$REMOTE_HOST"
