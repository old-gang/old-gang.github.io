# 本地化 Spring 文档图片

## Goal

将 `docs/java/Spring.md` 中的语雀图片保存到博客仓库，避免语雀 CDN 的 Referer 防盗链导致构建部署后图片无法展示。

## Background

- `Spring.md` 中有 137 个 `<img>` 引用，全部指向 `cdn.nlark.com/yuque/`，对应 134 个唯一 URL。
- CDN 图片无 Referer 请求返回 `200`，携带博客页面 Referer 请求返回 `403`（`denied by Referer ACL`）。
- VitePress 当前构建会保留这些远程 `<img>` 标签；故障原因是运行时加载被 CDN 拒绝，不是构建阶段删除了图片。
- 项目现有静态图片存放在 `docs/public/images/`，构建后可通过 `/images/...` 路径访问。

## Requirements

- 下载 `Spring.md` 当前引用的所有语雀图片到 `docs/public/images/spring/`，按 URL 文件名保存；相同 URL 只保存一份。
- 仅将 `Spring.md` 中的语雀图片 `src` 改为对应的站点本地绝对路径（`/images/spring/<filename>`），保留标签其他属性及文档内容。
- 不修改其他文档中的图片引用，也不改变图片内容或尺寸属性。

## Acceptance Criteria

- [ ] `Spring.md` 不再有指向 `cdn.nlark.com/yuque/` 的图片引用，137 个图片标签均指向本地静态资源。
- [ ] 本地图片文件与引用一一对应；重复 URL 不产生重复文件，所有图片均成功下载且为有效图片文件。
- [ ] `npm run build` 成功，构建产物包含这些图片并保留正确的本地图片路径。
- [ ] 文档中除图片 `src` 及新增图片文件外无无关改动。

## Out of Scope

- 本地化其他文档中的外链图片。
- 调整全站图片样式、尺寸或 VitePress 图片处理配置。

## Open Questions

- None. Scope is limited to `Spring.md`; use the existing `docs/public/images/` convention with a Spring-specific subdirectory.

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
