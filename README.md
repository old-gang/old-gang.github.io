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

同一个仓库也可以同时部署到自己的服务器，两条流水线互不影响。

### 一次性准备

1. 准备配置：`cp deploy.config.example.sh deploy.config.sh`，然后填写服务器地址、上传目录和对外访问的域名。
   `deploy.config.sh` 已在 `.gitignore` 中，不会被提交。
2. 服务器上创建站点目录，并让 Nginx 指向它（示例见 `deploy/nginx.blog.conf`）：

   ```bash
   ssh root@你的服务器
   mkdir -p /www/blog
   ```

3. 把 `deploy/nginx.blog.conf` 里的域名、`root`、证书路径改成自己的，放到 Nginx 的站点配置目录，然后 `nginx -t && nginx -s reload`。

### 每次发布

```bash
npm run deploy    # 等价于 ./deploy.sh
```

脚本会依次：构建 → rsync 增量上传（`--delete` 清理旧页面）→ 在服务器 reload Nginx。
因为用的是 `base: "/"`，部署在域名根路径（如 `https://blog.abc.xyz/`）不需要改任何 VitePress 配置。

如果不想每次都输密码，可以把本机公钥加到服务器：`ssh-copy-id root@你的服务器`。
