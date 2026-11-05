---
title: Grid网格布局
tags: web前端
abbrlink: d97530e8
date: 2026-07-23 11:03:15
---

# CSS Grid 布局学习手册

> 从零到进阶的系统性学习指南，覆盖核心概念、常用属性、实战模式与排错技巧。  
> 适合：有一定 CSS 基础、希望掌握二维布局的前端开发者。

---

## 目录

1. [为什么学 Grid](#1-为什么学-grid)
2. [核心概念速览](#2-核心概念速览)
3. [创建网格容器](#3-创建网格容器)
4. [定义轨道：列与行](#4-定义轨道列与行)
5. [间距 gap](#5-间距-gap)
6. [放置网格项](#6-放置网格项)
7. [命名网格线与区域](#7-命名网格线与区域)
8. [对齐与分布](#8-对齐与分布)
9. [隐式网格与自动放置](#9-隐式网格与自动放置)
10. [响应式 Grid 模式](#10-响应式-grid-模式)
11. [Subgrid 子网格](#11-subgrid-子网格)
12. [常用布局模板](#12-常用布局模板)
13. [Grid vs Flexbox](#13-grid-vs-flexbox)
14. [调试与浏览器兼容](#14-调试与浏览器兼容)
15. [速查表](#15-速查表)
16. [练习题](#16-练习题)
17. [学习路径建议](#17-学习路径建议)

---

## 1. 为什么学 Grid

### 1.1 Grid 解决什么问题

CSS Grid 是**二维布局系统**：同时控制**行**和**列**。

| 布局方式       | 维度         | 典型场景                             |
| -------------- | ------------ | ------------------------------------ |
| 普通流 / float | 近似一维     | 图文环绕（历史方案）                 |
| Flexbox        | 一维（主轴） | 导航栏、工具条、组件内部排列         |
| **Grid**       | **二维**     | 整页骨架、卡片墙、仪表盘、杂志式排版 |

一句话：

- **Flex**：沿着一条线排东西  
- **Grid**：在一张表里摆东西  

### 1.2 你将获得的能力

- 用少量代码搭出页头 / 侧栏 / 主内容 / 页脚的整页骨架  
- 写自适应卡片列表，少写甚至不写媒体查询  
- 精确控制元素跨行、跨列、对齐  
- 读懂他人项目里的 `grid-template-*`、`fr`、`minmax`、`auto-fit`

---

## 2. 核心概念速览

先建立「地图」，后面所有属性都挂在这些概念上。

```
┌─── 网格容器 (Grid Container) ───────────────────────────┐
│  ┌─────┬─────┬─────┐                                    │
│  │ ①  │ ②  │ ③  │  ← 网格项 (Grid Items)               │
│  ├─────┼─────┼─────┤                                    │
│  │ ④  │ ⑤  │ ⑥  │                                    │
│  └─────┴─────┴─────┘                                    │
│                                                         │
│  轨道 (Track) = 一行或一列                               │
│  单元格 (Cell) = 一行与一列的交叉                        │
│  区域 (Area) = 一个或多个单元格组成的矩形                │
│  网格线 (Line) = 划分轨道的线（从 1 开始编号）            │
└─────────────────────────────────────────────────────────┘
```

### 2.1 术语对照

| 术语     | 英文           | 含义                              |
| -------- | -------------- | --------------------------------- |
| 网格容器 | Grid Container | `display: grid` 的元素            |
| 网格项   | Grid Item      | 容器的**直接子元素**              |
| 网格线   | Grid Line      | 划分行/列的线，默认从 1 编号      |
| 轨道     | Track          | 一条行或一条列                    |
| 单元格   | Cell           | 最小单位，一行一列交叉            |
| 区域     | Area           | 矩形范围，可跨多行多列            |
| 间距     | Gap            | 轨道之间的空隙                    |
| 显式网格 | Explicit Grid  | 你用 `grid-template-*` 定义的部分 |
| 隐式网格 | Implicit Grid  | 多出来的项自动生成的行/列         |

### 2.2 网格线编号示意（3 列 × 2 行）

```
        列线1    列线2    列线3    列线4
          │       │       │       │
行线1 ────┼───────┼───────┼───────┤
          │  ①   │  ②   │  ③   │
行线2 ────┼───────┼───────┼───────┤
          │  ④   │  ⑤   │  ⑥   │
行线3 ────┴───────┴───────┴───────┘
```

- 3 列 → 有 **4** 条列线  
- 2 行 → 有 **3** 条行线  
- 放一个元素「从第 1 列线到第 3 列线」= 横跨 2 列

> 也可用负数从末尾计数：`-1` 是最后一条线。

---

## 3. 创建网格容器

### 3.1 基本写法

```css
.container {
  display: grid; /* 块级网格 */
}

.inline-container {
  display: inline-grid; /* 行内网格，宽度由内容决定 */
}
```

一旦设为 grid：

1. 直接子元素变成网格项  
2. 浮动、`vertical-align` 等对网格项失效  
3. 默认按「自动行列」排列（不写模板也能用）

### 3.2 最小可运行示例

```html
<div class="grid">
  <div>A</div>
  <div>B</div>
  <div>C</div>
  <div>D</div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列等宽 */
  gap: 16px;
}
```

结果：A B 第一行，C D 第二行。

---

## 4. 定义轨道：列与行

### 4.1 grid-template-columns / grid-template-rows

```css
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 100px; /* 左固定 / 中间弹性 / 右固定 */
  grid-template-rows: 80px auto 1fr;     /* 顶固定 / 中自适应 / 底吃剩余 */
}
```

#### 可用尺寸类型

| 类型            | 例子                 | 说明                       |
| --------------- | -------------------- | -------------------------- |
| 长度            | `200px` `10rem`      | 固定尺寸                   |
| 百分比          | `25%`                | 相对容器                   |
| `fr`            | `1fr` `2fr`          | 分配剩余空间（强烈推荐）   |
| `auto`          | `auto`               | 由内容决定，可伸缩         |
| `min-content`   | `min-content`        | 尽量小（不换行时的最小宽） |
| `max-content`   | `max-content`        | 尽量大（内容完整显示的宽） |
| `minmax()`      | `minmax(200px, 1fr)` | 设最小最大边界             |
| `fit-content()` | `fit-content(300px)` | 内容宽，但不超过上限       |

### 4.2 fr 单位（理解重点）

`fr` = fraction，分剩余空间。

```css
/* 三列：中间是两边的两倍 */
grid-template-columns: 1fr 2fr 1fr;
```

计算逻辑（简化）：

1. 先扣掉固定尺寸、gap、minmax 的下限等  
2. 剩余空间按 fr 比例分配  

```css
/* 左边 200px，右边平分剩余 */
grid-template-columns: 200px 1fr 1fr;
```

### 4.3 repeat()：少写重复值

```css
/* 等价于 1fr 1fr 1fr 1fr */
grid-template-columns: repeat(4, 1fr);

/* 复杂模式也可重复 */
grid-template-columns: repeat(3, 100px 1fr); /* 共 6 轨 */
```

### 4.4 minmax()：弹性且有下限

```css
/* 每列至少 200px，最多均分剩余 */
grid-template-columns: repeat(3, minmax(200px, 1fr));
```

这是响应式卡片墙的基础积木。

### 4.5 auto-fill 与 auto-fit（响应式神器）

```css
/* 尽可能多放「至少 240px」的列，放不下就换行 */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
```

| 关键字      | 行为                                             |
| ----------- | ------------------------------------------------ |
| `auto-fill` | 尽可能多创建列；空列也会保留「占位」             |
| `auto-fit`  | 同样尽量多列，但会把**空列折叠**，已有列拉伸填满 |

多数卡片墙用 `auto-fit` 更自然：

```css
grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
```

> `min(100%, 280px)` 可避免小屏上出现横向滚动（列最小宽超过容器）。

### 4.6 简写：grid-template

```css
.grid {
  /* 行定义 / 列定义 */
  grid-template: 100px 1fr 50px / 200px 1fr;
  /* 等价于：
     grid-template-rows: 100px 1fr 50px;
     grid-template-columns: 200px 1fr;
  */
}
```

配合区域命名时还有更强简写（见第 7 节）。

---

## 5. 间距 gap

### 5.1 基本用法

```css
.grid {
  gap: 16px;           /* 行、列间距都是 16px */
  row-gap: 24px;       /* 只设行间距 */
  column-gap: 12px;    /* 只设列间距 */
  gap: 24px 12px;      /* 行 列 */
}
```

### 5.2 注意点

- `gap` 在轨道**之间**，不在外围产生外边距  
- 比用 `margin` 控制子项间距更干净，不会出现「首尾多出空白」问题  
- Flex 也支持 `gap`，写法一致  

---

## 6. 放置网格项

默认按「从左到右、从上到下」自动填满。需要精确位置时用线号或跨度。

### 6.1 线号定位

```css
.item {
  grid-column-start: 1;
  grid-column-end: 3;   /* 不包含第 3 列线之后 → 占第 1、2 列 */
  grid-row-start: 1;
  grid-row-end: 2;
}
```

简写：

```css
.item {
  grid-column: 1 / 3;   /* start / end */
  grid-row: 1 / 2;
}

/* 只写跨度 */
.item {
  grid-column: span 2;  /* 横跨 2 列 */
  grid-row: 2 / span 3; /* 从第 2 行线起，跨 3 行 */
}

/* 从某线一直到最后 */
.item {
  grid-column: 2 / -1;
}
```

### 6.2 简写 place：grid-area

```css
.item {
  /* row-start / column-start / row-end / column-end */
  grid-area: 1 / 2 / 3 / 4;
}
```

> 后面讲命名区域时，`grid-area: header;` 更常见。

### 6.3 重叠与层叠

多个项可以占同一区域，用 `z-index` 控制叠放：

```css
.bg { grid-area: 1 / 1 / 3 / 3; z-index: 0; }
.fg { grid-area: 1 / 1 / 2 / 2; z-index: 1; }
```

---

## 7. 命名网格线与区域

命名后代码可读性大幅提升，尤其适合整页布局。

### 7.1 命名网格线

用方括号 `[]` 给线起名：

```css
.layout {
  display: grid;
  grid-template-columns: [sidebar-start] 240px [sidebar-end main-start] 1fr [main-end];
  grid-template-rows: [header-start] 64px [header-end content-start] 1fr [content-end];
}

.sidebar {
  grid-column: sidebar-start / sidebar-end;
  grid-row: content-start / content-end;
}
```

一条线可以有多个名字：`[sidebar-end main-start]`。

### 7.2 命名区域：grid-template-areas（强烈推荐）

```css
.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
  gap: 0;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

```html
<div class="page">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="main">Main</main>
  <footer class="footer">Footer</footer>
</div>
```

规则：

- 区域名必须形成**矩形**  
- `.`（点）表示空单元格  
- 同一名字重复 = 合并区域  
- 每行字符串的「单元格数」必须一致  

空单元格示例：

```css
grid-template-areas:
  "header header header"
  "nav    main   ."
  "footer footer footer";
```

### 7.3 区域简写一气呵成

```css
.page {
  display: grid;
  grid-template:
    "header header" 64px
    "sidebar main"  1fr
    "footer footer" auto
    / 240px 1fr;
}
```

格式：`"区域名..." 行高`，最后 `/ 列宽定义`。

---

## 8. 对齐与分布

Grid 的对齐分两层：

1. **整份网格**在容器里怎么放（轨道总尺寸 < 容器时）  
2. **每个格子里的内容**怎么对齐  

### 8.1 轴的方向

| 属性前缀    | 对应方向                      |
| ----------- | ----------------------------- |
| `justify-*` | 行内方向（通常是水平 / 列轴） |
| `align-*`   | 块方向（通常是垂直 / 行轴）   |
| `place-*`   | 两者简写                      |

> 在 `writing-mode` 改变时，「水平/垂直」可能对调，记「justify = inline，align = block」更稳。

### 8.2 对齐整份网格（容器属性）

当轨道总宽/高小于容器时：

```css
.grid {
  justify-content: start | end | center | stretch | space-between | space-around | space-evenly;
  align-content:   start | end | center | stretch | space-between | space-around | space-evenly;
  place-content: center; /* align-content + justify-content */
}
```

### 8.3 对齐单元格内的项（容器默认值）

```css
.grid {
  justify-items: start | end | center | stretch; /* 默认 stretch */
  align-items:   start | end | center | stretch;
  place-items: center; /* 常见：格子内容居中 */
}
```

### 8.4 单个项覆盖（项目属性）

```css
.item {
  justify-self: center;
  align-self: end;
  place-self: center end; /* align-self justify-self */
}
```

### 8.5 记忆口诀

| 你想做的事           | 用什么                                         |
| -------------------- | ---------------------------------------------- |
| 卡片内容在格子里居中 | `place-items: center`                          |
| 整表在页面里水平居中 | `justify-content: center`                      |
| 某一个按钮靠右       | `justify-self: end`                            |
| 行与行之间拉开       | `align-content: space-between`（需有剩余高度） |

---

## 9. 隐式网格与自动放置

### 9.1 显式 vs 隐式

```css
.grid {
  grid-template-columns: repeat(3, 1fr); /* 显式：3 列 */
  /* 若有 7 个项，会自动多出隐式行 */
  grid-auto-rows: 120px;   /* 隐式行的高度 */
  grid-auto-columns: 1fr;  /* 隐式列的宽度（少用） */
}
```

常用组合：

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: minmax(160px, auto);
  gap: 16px;
}
```

### 9.2 流向：grid-auto-flow

```css
.grid {
  grid-auto-flow: row;        /* 默认：先填行 */
  grid-auto-flow: column;     /* 先填列 */
  grid-auto-flow: dense;      /* 尽量填补空洞（可能打乱视觉顺序） */
  grid-auto-flow: row dense;
}
```

`dense` 适合杂志式不规则卡片，但要注意**可访问性**：视觉顺序可能与 DOM 顺序不一致。

### 9.3 简写属性 grid

```css
.grid {
  /* 较完整的一种形式 */
  grid: 100px 1fr / repeat(3, 1fr);
  /* ≈ grid-template-rows / grid-template-columns */
}
```

日常更推荐拆开写，可读性更好。

---

## 10. 响应式 Grid 模式

### 10.1 少用断点：auto-fit + minmax

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1rem;
}
```

随容器变宽自动 1 列 → 2 列 → 3 列……

### 10.2 用媒体查询改区域（整页骨架）

```css
.page {
  display: grid;
  gap: 1rem;
  grid-template-areas:
    "header"
    "main"
    "sidebar"
    "footer";
}

@media (min-width: 900px) {
  .page {
    grid-template-columns: 240px 1fr;
    grid-template-areas:
      "header  header"
      "sidebar main"
      "footer  footer";
  }
}
```

同一套 HTML，改 `grid-template-areas` 即可换布局，不必改 DOM 顺序（仍建议 DOM 顺序符合阅读逻辑）。

### 10.3 容器查询（现代增强）

```css
.card-list {
  container-type: inline-size;
}

.card-list__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@container (min-width: 600px) {
  .card-list__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

组件在侧栏里变窄时也能自适应，不依赖整页断点。

### 10.4 流体字号 / 间距配合

```css
.grid {
  gap: clamp(12px, 2vw, 24px);
}
```

---

## 11. Subgrid 子网格

当子元素也是 grid，并希望**对齐父网格的轨道**时用 `subgrid`。

```css
.parent {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.child {
  grid-column: span 2;
  display: grid;
  grid-template-columns: subgrid; /* 继承父级列轨 */
  gap: inherit; /* 注意：子网格默认不继承 gap，需自行处理 */
}
```

适用场景：

- 卡片内部标题 / 价格 / 按钮要对齐成「多卡同一基线」  
- 表单标签列与输入列跨组件对齐  

兼容性：现代 Chromium / Firefox / Safari 已支持，旧浏览器需降级为普通嵌套 grid。

---

## 12. 常用布局模板

### 12.1 圣杯 / 整页应用壳

```css
.app {
  min-height: 100vh;
  display: grid;
  grid-template:
    "header header" 56px
    "nav    main"   1fr
    "footer footer" auto
    / 220px 1fr;
}

@media (max-width: 768px) {
  .app {
    grid-template:
      "header" 56px
      "main"   1fr
      "nav"    auto
      "footer" auto
      / 1fr;
  }
}
```

### 12.2 卡片瀑布（等高行，非 masonry）

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  align-items: stretch; /* 默认，卡片同高 */
}
```

> 真正的瀑布流（高低错落填缝）可用 `grid-template-rows: masonry`（支持仍有限）或 JS 方案。

### 12.3 侧栏可收缩

```css
.shell {
  display: grid;
  grid-template-columns: var(--sidebar, 240px) 1fr;
  transition: grid-template-columns 0.2s ease;
}

.shell.is-collapsed {
  --sidebar: 64px;
}
```

### 12.4 居中英雄区（Grid 一行搞定）

```css
.hero {
  min-height: 70vh;
  display: grid;
  place-items: center; /* 水平垂直居中 */
}
```

### 12.5  holygrail 变体：主内容最大宽度居中

```css
.page {
  display: grid;
  grid-template-columns: 1fr min(100%, 960px) 1fr;
}

.page > * {
  grid-column: 2;
}

.page > .full-bleed {
  grid-column: 1 / -1; /* 通栏 */
}
```

### 12.6 仪表盘：不规则跨度

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 16px;
}

.widget-large { grid-column: span 8; grid-row: span 2; }
.widget-mid   { grid-column: span 4; }
.widget-full  { grid-column: 1 / -1; }
```

### 12.7 表单两列标签

```css
.form {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 12px 16px;
  align-items: center;
}

.form .full {
  grid-column: 1 / -1;
}
```

---

## 13. Grid vs Flexbox

### 13.1 怎么选

| 场景                         | 更合适      |
| ---------------------------- | ----------- |
| 导航项横排、间距均匀         | Flex        |
| 整页行列骨架                 | Grid        |
| 组件内部：图标 + 文字        | Flex        |
| 卡片墙自适应列数             | Grid        |
| 一维空间分配（剩余空间给谁） | Flex 很直观 |
| 二维对齐、跨行跨列           | Grid        |

### 13.2 常见组合

```css
.page {
  display: grid;           /* 外层骨架用 Grid */
  grid-template-rows: auto 1fr auto;
}

.header {
  display: flex;           /* 内层控件用 Flex */
  justify-content: space-between;
  align-items: center;
}
```

口诀：**外 Grid 内 Flex**（多数业务页面成立，不是绝对）。

### 13.3 都能做「居中」

```css
/* Flex */
.box { display: flex; justify-content: center; align-items: center; }

/* Grid */
.box { display: grid; place-items: center; }
```

单元素居中时 Grid 更短；一维列表仍偏 Flex。

---

## 14. 调试与浏览器兼容

### 14.1 DevTools 技巧

1. 选中网格容器，点 layout / grid 徽章  
2. 显示网格线编号、区域名、轨道尺寸  
3. 检查 `fr` 实际算出的 px  
4. 看是否意外生成了大量隐式行  

### 14.2 常见坑

| 现象             | 可能原因                                                     |
| ---------------- | ------------------------------------------------------------ |
| 子元素没进网格   | 不是**直接**子元素（被包了一层）                             |
| 横向滚动         | `minmax` 下限过大；用 `min(100%, …)`                         |
| 区域报错、布局乱 | `grid-template-areas` 非矩形 / 每行列数不一致                |
| 对齐无效         | 搞混了 `*-content` 与 `*-items`                              |
| 高度 1fr 不生效  | 祖先链没有明确高度（给 `html, body, #app { height: 100%; }` 或用 `min-height: 100vh`） |
| 顺序怪异         | 用了 `dense` 或手动 `grid-column` 导致视觉顺序 ≠ DOM         |

### 14.3 兼容性简述

- 基础 Grid：现代浏览器全支持  
- `subgrid`：较新，注意旧版 Safari / 企业内嵌浏览器  
- `masonry`：实验性，勿直接上生产  

渐进增强示例：

```css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

@supports (display: grid) {
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}
```

---

## 15. 速查表

### 15.1 容器属性

| 属性                                                  | 作用             |
| ----------------------------------------------------- | ---------------- |
| `display: grid \| inline-grid`                        | 创建网格         |
| `grid-template-columns`                               | 定义列           |
| `grid-template-rows`                                  | 定义行           |
| `grid-template-areas`                                 | 命名区域         |
| `grid-template`                                       | 行/列/区域简写   |
| `gap` / `row-gap` / `column-gap`                      | 间距             |
| `justify-items` / `align-items` / `place-items`       | 单元格内默认对齐 |
| `justify-content` / `align-content` / `place-content` | 整份网格对齐     |
| `grid-auto-rows` / `grid-auto-columns`                | 隐式轨道尺寸     |
| `grid-auto-flow`                                      | 自动放置流向     |
| `grid`                                                | 总简写           |

### 15.2 项目属性

| 属性                                         | 作用             |
| -------------------------------------------- | ---------------- |
| `grid-column`                                | 列起止 / span    |
| `grid-row`                                   | 行起止 / span    |
| `grid-area`                                  | 区域名或四线简写 |
| `justify-self` / `align-self` / `place-self` | 单项对齐         |
| `z-index`                                    | 重叠时层叠       |

### 15.3 函数与关键字

| 写法                                   | 含义           |
| -------------------------------------- | -------------- |
| `fr`                                   | 剩余空间份数   |
| `repeat(n, …)`                         | 重复轨道       |
| `repeat(auto-fill \| auto-fit, …)`     | 自动列数       |
| `minmax(min, max)`                     | 轨道区间       |
| `min-content` / `max-content` / `auto` | 内容尺寸关键字 |
| `span n`                               | 跨 n 条轨道    |
| `subgrid`                              | 继承父轨道     |

### 15.4 高频片段

```css
/* 自适应卡片 */
grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));

/* 两栏：侧栏 + 主区 */
grid-template-columns: 240px 1fr;

/* 内容居中 */
place-items: center;

/* 通栏 */
grid-column: 1 / -1;

/* 跨两列 */
grid-column: span 2;
```

---

## 16. 练习题

建议每题自己写 HTML/CSS，用 DevTools 打开网格线验证。

### 练习 1：基础三列

- 容器 3 列等宽，`gap: 16px`  
- 放入 6 个色块  

### 练习 2：圣杯布局

- 用 `grid-template-areas` 实现 header / sidebar / main / footer  
- `< 800px` 时改为单列，顺序：header → main → sidebar → footer  

### 练习 3：响应式相册

- 仅用 `auto-fit + minmax`，不写媒体查询  
- 窄屏 1 列，宽屏自动多列  

### 练习 4：跨行特色卡

- 12 列网格  
- 第一张卡 `span 8` 且 `span 2` 行，其余普通卡 `span 4`  

### 练习 5：对齐辨析

- 同一容器分别试验 `place-items`、`place-content`、`place-self`  
- 用文字记录三者差异（轨道有剩余空间时差异最明显）  

### 练习 6：命名线重构

- 把练习 2 的 areas 方案改成命名网格线方案  
- 对比可读性  

---

## 17. 学习路径建议

### 第 1 天：建立肌肉记忆

1. `display: grid`  
2. `grid-template-columns` + `fr` + `gap`  
3. `grid-column: span 2`  

### 第 2 天：整页与命名

1. `grid-template-areas`  
2. `minmax` / `repeat`  
3. 对齐四件套：`place-items` / `place-content`  

### 第 3 天：响应式与实战

1. `auto-fit` + `minmax(min(100%, …), 1fr)`  
2. 媒体查询切换 areas  
3. 复刻一个真实后台壳或作品集首页骨架  

### 巩固资源

- MDN： [CSS Grid layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_grid_layout)  
- 互动游戏： [Grid Garden](https://cssgridgarden.com/)  
- 规范概念图： [css-tricks.com/snippets/css/complete-guide-grid](https://css-tricks.com/snippets/css/complete-guide-grid/)  

---

## 附录 A：完整示例页（可直接粘贴）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CSS Grid 示例</title>
  <style>
    :root {
      --bg: #0f1419;
      --panel: #1a2332;
      --text: #e7ecf3;
      --accent: #3d9cf0;
      --muted: #8b9bb4;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Segoe UI", system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
    }
    .app {
      min-height: 100vh;
      display: grid;
      grid-template:
        "header header" 56px
        "side   main"   1fr
        "footer footer" 48px
        / 220px 1fr;
      gap: 1px;
      background: #0a0e14;
    }
    .app > * { background: var(--panel); padding: 16px; }
    .header { grid-area: header; display: flex; align-items: center; gap: 12px; }
    .side   { grid-area: side; color: var(--muted); }
    .main   { grid-area: main; }
    .footer { grid-area: footer; color: var(--muted); font-size: 14px; }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
      gap: 12px;
      margin-top: 16px;
    }
    .card {
      background: #243044;
      border-radius: 8px;
      padding: 16px;
      min-height: 100px;
      display: grid;
      place-items: center;
    }
    .card.featured {
      grid-column: span 2;
      background: linear-gradient(135deg, #1e3a5f, #243044);
      border: 1px solid var(--accent);
    }
    @media (max-width: 720px) {
      .app {
        grid-template:
          "header" 56px
          "main"   1fr
          "side"   auto
          "footer" 48px
          / 1fr;
      }
      .card.featured { grid-column: span 1; }
    }
  </style>
</head>
<body>
  <div class="app">
    <header class="header">
      <strong style="color: var(--accent)">GridApp</strong>
      <span style="color: var(--muted)">学习示例</span>
    </header>
    <aside class="side">侧栏导航</aside>
    <main class="main">
      <h1 style="margin: 0 0 8px; font-size: 20px;">主内容区</h1>
      <p style="margin: 0; color: var(--muted);">外层 Grid 骨架 + 内层自适应卡片。</p>
      <div class="cards">
        <div class="card featured">跨两列特色卡</div>
        <div class="card">卡片 A</div>
        <div class="card">卡片 B</div>
        <div class="card">卡片 C</div>
        <div class="card">卡片 D</div>
      </div>
    </main>
    <footer class="footer">Footer</footer>
  </div>
</body>
</html>
```

---

## 附录 B：一句话心智模型

> **先画轨道，再把盒子钉到格子上；能用 `fr` / `minmax` / `areas` 表达的，就别用魔法数字硬算。**

掌握以下 8 个就足以应对绝大多数业务布局：

1. `display: grid`  
2. `grid-template-columns`  
3. `fr`  
4. `gap`  
5. `minmax` + `repeat(auto-fit, …)`  
6. `grid-template-areas` / `grid-area`  
7. `grid-column: span n`  
8. `place-items`  

祝学习顺利。写布局时多开 DevTools 的 Grid 叠加层，进步会非常快。

---

*文档版本：v1.0 · 面向系统学习与日常查阅*
