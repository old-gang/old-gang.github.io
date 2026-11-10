import { defineConfig } from "vitepress";

const frontendSidebarItems = [
  { text: "Vue3 上手指南", link: "/frontend/vue3-guide" },
  { text: "Vue 的组件通信", link: "/frontend/vue-component-communication" },
  { text: "邂逅 React", link: "/frontend/react-getting-started" },
  { text: "React 路由 v6", link: "/frontend/react-router-v6" },
  { text: "React 实现插槽功能", link: "/frontend/react-slots" },
  { text: "学习 TypeScript", link: "/frontend/typescript-notes" },
  { text: "学习构建工具", link: "/frontend/build-tools" },
  { text: "Node 相关", link: "/frontend/node-basics" },
  { text: "服务端渲染", link: "/frontend/server-side-rendering" },
  { text: "数据结构与算法", link: "/frontend/data-structures-algorithms" },
  { text: "数组的常用方法", link: "/frontend/array-methods" },
  { text: "CSS 小技巧", link: "/frontend/css-tips" },
  { text: "Grid 网格布局", link: "/frontend/grid-layout" },
  { text: "深入了解前端可视化", link: "/frontend/css-visualization" },
  { text: "前端导出 Excel", link: "/frontend/export-excel" },
  { text: "微信小程序", link: "/frontend/mini-program" },
  {
    text: "微信小程序中视频的播放与暂停",
    link: "/frontend/mini-program-video",
  },
  { text: "bug 的解决", link: "/frontend/bug-solutions" },
  { text: "邂逅 electron", link: "/frontend/electron-basics" },
];

const backendSidebarItems = [
  { text: "邂逅 Java", link: "/java/java-base" },
  { text: "MySQL", link: "/java/MySQL" },
  { text: "MyBatis", link: "/java/MyBatis" },
];

const toolboxSidebarItems = [
  { text: "Python 学习", link: "/toolbox/python-basics" },
  { text: "mac brew 切换源", link: "/toolbox/brew-mirror" },
  { text: "邂逅鸿蒙", link: "/toolbox/harmonyos-basics" },
];

const essaySidebarItems = [{ text: "云服务器", link: "/essay/cloud-server" }];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 用户站点（仓库名 old-gang.github.io）部署在根路径，因此 base 为 "/"。
  // 若将来改为项目站点（如 /blog/），需要把这里改成 "/blog/"。
  base: "/",
  title: "小储的博客",
  description: "日常随笔",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/images/avatar.jpg",
    lastUpdatedText: "最后更新于",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端",
        link: "/frontend/vue3-guide",
        activeMatch: "^/frontend/",
      },
      {
        text: "后端",
        link: "/java/java-base",
        activeMatch: "^/java/",
      },
      {
        text: "工具箱",
        link: "/toolbox/python-basics",
        activeMatch: "^/toolbox/",
      },
      {
        text: "随笔",
        link: "/essay/cloud-server",
        activeMatch: "^/essay/",
      },
    ],

    // 按目录划分侧边栏：进入某个分区后只展示该分区的内容。
    sidebar: {
      "/frontend/": [
        { text: "前端", collapsed: false, items: frontendSidebarItems },
      ],
      "/java/": [
        { text: "后端", collapsed: false, items: backendSidebarItems },
      ],
      "/toolbox/": [
        { text: "工具箱", collapsed: false, items: toolboxSidebarItems },
      ],
      "/essay/": [{ text: "随笔", collapsed: false, items: essaySidebarItems }],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/old-gang" }],
    search: {
      provider: "local",
    },
  },
  locales: {
    root: {
      lang: "zh-CN",
      label: "简体中文",
      themeConfig: {
        outlineTitle: "目录",
      },
    },
  },
  // 笔记是从语雀导出的，正文里大量使用 <font style="color:..."> 做重点着色。
  // Vue 的内置 HTML 标签白名单里没有 font，会把它当成未注册的自定义组件，
  // 结果整段文字被丢弃（构建产物里只剩 <!---->）。
  // 这里把 font 声明为原生元素，让浏览器按 HTML 正常渲染并保留内部文字与颜色。
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tagName) => tagName === "font",
      },
    },
  },
});
