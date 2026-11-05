---
title: 深入了解前端可视化
tags: web前端
abbrlink: dbf79349
date: 2025-07-07 09:35:19
---

数据可视化（英语：Data visualization），主要旨在借助于图形化手段，清晰有效地传达与沟通信息。

- 为了清晰有效地传递信息，数据可视化通常使用柱状图、折线图、饼图、玫瑰图、散点图等图形来传递信息。
- 也可以使用点、线、面、地图来对数字数据进行编码展示，以便在视觉上快速传达关键信息。
- 可视化可以帮助用户分析和推理数据，让复杂的数据更容易理解和使用，有利于做出决策。

# 前端可视化-CSS3

## transform - 2d

- CSS3 transform属性允许你旋转，缩放，倾斜或平移给定元素。
- Transform是形变的意思（通常也叫变换），transformer就是变形金刚
- 常见的函数transform function有：
  - <font color='red'>平移</font>：translate(x, y)
  - <font color='red'>缩放</font>：scale(x, y)
  - <font color='red'>旋转</font>：rotate(deg)
  - <font color='red'>倾斜</font>：skew(deg, deg)

### 坐标系

- CSS3 transform属性允许你在二维或三维空间中直观地变换元素。
  - transform属性会转换元素的坐标系，使元素在空间中转换。
  - 用transform属性变换的元素会受`transform-origin`属性值的影响，该属性用于指定<font color='red'>形变的原点</font>。
- 元素的坐标系
  - CSS 中的每个元素都有一个坐标系，其原点位于元素的左上角，<font color='red'>左上角这被称为初始坐标系</font>。
  - <font color='red'>用transform时，坐标系的原点默认会移动到元素的中心</font>。
  - 因为transform-origin属性的默认值为50% 50%，即该原点将会作为变换元素的中心点。
  - 用transform属性旋转或倾斜元素，会变换或倾斜元素的坐标系。并且该元素<font color='red'>所有后续变换都将基于新坐标系的变换</font>。
  - 因此，transform属性中变换函数的顺序非常重要——<font color='red'>不同的顺序会导致不同的变换结果</font>。

### 变形原点

- transform-origin：变形的原点（即坐标系0 , 0点）
- **一个值**：
  - 设置 x轴 的原点， y轴为默认值 50%。
- **两个值**：
  - 设置 x轴 和 y轴 的原点
- **三个值**：
  - 设置 x轴、 y轴 和 z轴 的原点
- 必须是是&lt;length>，&lt;percentage>，或 left, center, right, top, bottom关键字中的一个
  - left, center, right, top, bottom关键字
  - length：从左上角开始计算
  - 百分比：参考元素本身大小

## 3D透视 - perspective

> 近大远小

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .box {
        width: 200px;
        height: 200px;
        background-color: skyblue;
        margin: 100px;

        /* 透视 */
        perspective: 200px;
      }

      .item {
        width: 100%;
        height: 100%;
        background-color: pink;

        /* 要产生效果，必须要有形变 */
        transform: rotateY(60deg);
      }

      .box1 {
        width: 200px;
        height: 200px;
        background-color: red;
        transform: perspective(200px) rotateY(60deg);
      }
    </style>
  </head>

  <body>
    <!-- 在父元素上使用透视 -->
    <div class="box">
      <div class="item">10</div>
    </div>

    <!-- 在自身使用透视 -->
    <div class="box1">box1</div>
  </body>
</html>
```

透视的两种使用方式：

1. 在父元素上定义 CSS 透视属性
2. 如果它是子元素或单元素子元素，可以使用函数 perspective()

## transform - 3d

- CSS3 transform属性不但允许你进行2D的旋转，缩放或平移指定的元素，还支持3D变换元素。
- 常见的函数transform function有：
  - <font color='red'>平移</font>：translate3d(tx, ty, tz)
    - translateX(tx) 、translateY(ty)、translateZ(tz)
  - <font color='red'>缩放</font>：scale3d(sx, sy, sz)
    - scaleX(sy)、scaleY(sy)、scaleZ(sz)、
  - <font color='red'>旋转</font>：rotate3d(x, y, z, a)
    - rotateX(x)、rotateY(y)、rotateZ(z)

> 3D形变函数会创建一个合成层来启用GPU硬件加速，比如： translate3d、 translateZ、 scale3d 、 rotate3d……

### 3D旋转

#### rotateZ 、rotateX、rotateY

- 旋转：rotateX(deg)、rotateY(deg)、rotateZ(deg)
  - 该CSS函数定义一个变换，它将元素围绕固定轴旋转。旋转量由指定的角度确定; <font color='red'>为正，旋转将为顺时针，为负，则为逆时针</font>。
- 值个数
  - 只有一个值，表示旋转的角度（单位deg）
- 值类型：
  - deg： 类型，表示旋转角度（不是弧度）。
  - 正数为顺时针，负数为逆时针
- 简写：rotate3d(x, y, z, deg)
- 注意：旋转的原点受 transform-origin 影响

#### route3d

- 旋转：rotate3d(x, y, z, a)  该CSS 函数定义一个变换，它将元素围绕固定轴旋转。旋转量由指定的角度定义; 为正，运动将为顺时针，为负，则为逆时针。
- 值个数
  - 一个值时，表示 z轴 旋转的角度
  - 四个值时，表示在 3D 空间之中，旋转有 x,y,z 个旋转轴和一个旋转角度。
- 值类型：
  - x： 类型，可以是 0 到 1 之间的数值，表示旋转轴 X 坐标方向的矢量( 用来计算形变矩阵中的值 )。
  - y： 类型，可以是 0 到 1 之间的数值，表示旋转轴 Y 坐标方向的矢量。
  - z： 类型，可以是 0 到 1 之间的数值，表示旋转轴 Z 坐标方向的矢量。
  - a： 类型，表示旋转角度。正的角度值表示顺时针旋转，负值表示逆时针旋转

### 3D位移

- 平移：translateX(x)、translateY(y)、translateZ(z)
  - 该函数表示在二、三维平面上移动元素。
- 值个数
  - 只有一个值，设置对应轴上的位移
- 值类型：
  - 数字：100px
  - 百分比：<font color='red'>参照元素本身</font>（ refer to the size of bounding box ）

### 3D缩放

- 缩放：scaleX、scaleY、scaleZ
  - 函数指定了一个沿 x、y 、z轴调整元素缩放比例因子。
- 值个数
  - 一个值时，设置对应轴上的缩放（无单位）
- 值类型：
  - 数字：
    - 1：保持不变
    - 2：放大一倍
    - 0.5：缩小一半
  - 百分比：<font color='red'>不支持百分比</font>

```css
.box {
  width: 200px;
  height: 200px;
  background-color: skyblue;
  margin: 100px;
  /* transform: scale(2); */
  /* transform: scaleX(2) scaleY(2); */
  /* 简写 */
  transform: scale3d(2, 2, 1);
}
```

## 3D空间

- 变换式：transform-style
  - 该CSS属性用于设置元素的子元素是定位在 3D 空间中还是平展在元素的2D平面中。
  - 在3D空间中同样是可以使用透视效果。
- 值类型：
  - flat：指示元素的子元素位于元素本身的平面内。
  - preserve-3d：指示元素的子元素应位于 3D 空间中。

> <font color='red'>在父元素使用</font>

会出现3d效果，即前面的物体会遮挡住后面的物体

旋转正方体案例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      .box {
        width: 200px;
        height: 200px;
        position: relative;
        margin: 100px;
        transform: perspective(300px);
        transform-style: preserve-3d;
        animation: loop 6s linear infinite;
      }

      .box div {
        background-color: rgba(255, 0, 0, 0.05);
        position: absolute;
        width: 100%;
        height: 100%;
      }

      /* 上 */
      .item1 {
        transform: rotateX(-90deg) translateZ(-100px);
      }

      /* 下 */
      .item2 {
        transform: rotateX(90deg) translateZ(100px);
      }

      /* 右 */
      .item3 {
        transform: rotateY(90deg) translateZ(100px);
      }

      /* 左 */
      .item4 {
        transform: rotateY(-90deg) translateZ(100px);
      }

      /* 前 */
      .item5 {
        transform: translateZ(100px);
      }

      /* 后 */
      .item6 {
        transform: translateZ(-100px);
      }

      @keyframes loop {
        0% {
          transform: rotateY(0) rotateX(0);
        }

        100% {
          transform: rotateY(360deg) rotateX(360deg);
        }
      }
    </style>
  </head>

  <body>
    <div class="box">
      <div class="item1">1</div>
      <div class="item2">2</div>
      <div class="item3">3</div>
      <div class="item4">4</div>
      <div class="item5">5</div>
      <div class="item6">6</div>
    </div>
  </body>
</html>
```

## 3D背面可见性

背面可见性：`backface-visibility`

- 该CSS 属性 backface-visibility 指定某个元素当背面朝向观察者时是否可见。

- 值类型：
  - visible：背面朝向用户时可见。
  - hidden：背面朝向用户时不可见。

## 浏览器渲染流程

1. 解析HTML，<font color='red'>构建DOM Tree</font>
2. 对CSS文件进行解析，<font color='red'>解析出对应的规则树</font>
3. DOM Tree + CSSOM 生成 <font color='red'>Render Tree</font>
4. 布局（Layout）：计算出每个节点的宽度、高度和位置信息。
   - 页面元素位置、大小发生变化，往往会导致其他节点联动， 需要重新计算布局，这个过程称为<font color='red'>回流（Reflow）</font>
5. 绘制（Paint）：将可见的元素绘制在屏幕中。
   - 默认标准流是在同一层上绘制，一些特殊属性会<font color='red'>创建新的层</font>绘制，这些层称为<font color='red'>渲染层</font>。
   - 一些不影响布局的 CSS 修改也会导致该渲染层<font color='red'>重绘</font>（Repaint），<font color='red'>回流必然会导致重绘</font>
6. Composite合成层：一些特殊属性会创建一个新的合成层（ CompositingLayer ），并可以利用GPU来加速绘制，这是浏览器的一种优化手段。合成层确实可以提高性能，但是它以消耗内存为代价，<font color='red'>因此不能滥用作为 web 性能优化策略和过度使用</font>。

## CSS3动画性能优化

- 创建一个新的渲染层（减少回流）
  - 有明确的定位属性（relative、fixed、sticky、absolute）
  - 透明度（opacity 小于 1）
  - 有 CSS transform 属性（不为 none）
  - 当前有对于 opacity、transform、fliter、backdrop-filter 应用动画
  - backface-visibility 属性为 hidden
  - ....
- 创建合成层。合成层会开始GPU加速页面渲染，但不能滥用
  - 对 opacity、transform、fliter、backdropfilter应用了animation或transition（需要是active的animation或者 transition）
  - 有 3D transform 函数：比如： translate3d、 translateZ、 scale3d 、 rotate3d ...
  - will-change 设置为 opacity、transform、top、left、bottom、right，比如：will-change: opacity , transform;
    - 其中 top、left等需要设置明确的定位属性，如 relative 等

# 前端可视化-canvas

## 什么是Canvas

**HTML5新增元素**

## Canvas优缺点

- **Canvas 优点**：
  - Canvas提供的功能更原始，<font color='red'>适合像素处理，动态渲染和数据量大的绘制</font>，如：图片编辑、热力图、炫光尾迹特效等。
  - Canvas非常适合图像密集型的游戏开发，适合频繁重绘许多的对象<font color='red'>适合像素处理，动态渲染和数据量大的绘制</font>。
  - Canvas能够以 .png 或 .jpg 格式保存结果图像，<font color='red'>适合对图片进行像素级的处理</font>。
- **Canvas 缺点**：
  - 在移动端可以能会因为Canvas数量多，而导致内存占用超出了手机的承受能力，导致浏览器崩溃。
  - Canvas 绘图<font color='red'>只能通过JavaScript脚本操作</font>（all in js）。
  - Canvas 是由一个个像素点构成的图形，<font color='red'>放大会使图形变得颗粒状和像素化，导致模糊</font>。

## 初体验Canvas

使用Canvas的注意事项：

- `<canvas>`和`<img>` 元素很相像，唯一的不同就是它并没有 src 和 alt 属性。
- `<canvas>`标签只有两个属性——width和height( 单位默认为px )。当没有设置宽度和高度时，canvas 会初始化宽为 300px 和高为 150px。
- `<canvas>`与`<img>`元素不同， 元素必须需要结束标签`</canvas>`。如结束标签不存在，则文档其余部分会被认为是替 代内容，将不会显示出来。

## 绘制矩形

- Canvas支持两种方式来绘制矩形：矩形方法 和 路径方法。
  - 路径是通过不同颜色和宽度的<font color='red'>线段或曲线相连形成的不同形状的点的集合</font>。
  - 除了矩形，其他的图形都是通过一条或者多条路径组合而成的。
  - 通常我们会通过众多的路径来绘制复杂的图形。
- Canvas 绘图的矩形方法：
  - fillRect(x, y, width, height)： 绘制一个填充的矩形
  - strokeRect(x, y, width, height)： 绘制一个矩形的边框
  - clearRect(x, y, width, height)： 清除指定矩形区域，让清除部分完全透明。
- 方法参数：
  - 上面的方法都包含了相同的参数。
  - x 与 y 指定了在canvas画布上所绘制矩形的左上角（相对于原点）的坐标（不支持 undefined ）。
  - width 和 height 设置矩形的尺寸。

## 认识路径

- **什么是路径**？
  - 图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。
  - 路径是可由很多子路径构成，这些子路径都是在一个列表中，列表中所有子路径（线、弧形等）将构成图形。
  - 一个路径，甚至一个子路径，通常都是闭合的。

- **使用路径绘制图形的步骤**：
  1. 首先需要创建路径起始点（`beginPath`）。
  2. 然后使用画图命令去画出路径( arc 、lineTo )。
  3. 之后把路径闭合( closePath , 不是必须)。
  4. 一旦路径生成，就能通过描边(stroke)或填充路径区域(fill)来渲染图形。

- **以下是绘制路径时，所要用到的函数**
  - `beginPath()`：新建一条路径，生成之后，图形绘制命令被指向到新的路径上绘图，不会关联到旧的路径。

  - `closePath()`：闭合路径之后图形绘制命令又重新指向到 beginPath之前的上下文中。

  - `stroke()`：通过线条来绘制图形轮廓/描边（针对当前路径图形）。

  - `fill()`：通过填充路径的内容区域生成实心的图形（针对当前路径图形）。

  - `moveTo()`：移动画笔，能够绘制一些不连续的路径

  - `lineTo`：绘制一条直线

  - `arc(x,y,startAngle, endAngle, anticlockwise)`：绘制圆弧或圆
    - x、y：为绘制圆弧所在圆上的圆心坐标。
    - radius：为圆弧半径。
    - startAngle、endAngle：该参数用<font color='red'>弧度</font>定义了开始以及结束的弧度。这些都是以 x 轴为基准。
    - anticlockwise：为一个布尔值。为 true ，是逆时针方向，为false，是顺时针方向，默认为false。

    > 计算弧度
    >
    > arc() 函数中表示角的单位是弧度，不是角度。
    >
    > - 角度与弧度的 JS 表达式：弧度=( Math.PI / 180 ) \* 角度 ，即 1角度= Math.PI / 180 个弧度
    > - 比如：旋转90°：Math.PI / 2； 旋转180°：Math.PI ； 旋转360°：Math.PI \* 2； 旋转-90°：-Math.PI / 2；

## 色彩 Colors

- 如果我们想要给图形上色，有两个重要的属性可以做到：
  - `fillStyle = color`： 设置图形的填充颜色，<font color='red'>需在 fill() 函数前调用</font>。
  - `strokeStyle = color`： 设置图形轮廓的颜色，<font color='red'>需在 stroke() 函数前调用</font>。
- color颜色
  - color 可以是表示 CSS 颜色值的字符串，支持：关键字、十六进制、rgb、rgba格式。
  - 默认情况下，线条和填充颜色都是黑色（CSS 颜色值 #000000）。
- 注意
  - <font color='red'>一旦设置了 strokeStyle 或者 fillStyle 的值，那么这个新值就会成为新绘制的图形的默认值</font>。
  - 如果你要给图形上不同的颜色，你需要重新设置 fillStyle 或 strokeStyle 的值。
- 额外补充
  - fill() 函数是图形填充，fillStyle属性是设置填充色
  - stroke() 函数是图形描边，strokeStyle属性是设置描边色

## 透明度

除了可以绘制实色图形，我们还可以用 canvas 来绘制半透明的图形。

- 方式一：strokeStyle 和 fillStyle属性结合RGBA：
- 方式二：globalAlpha 属性
  - globalAlpha = 0 ~ 1
    - 这个属性影响到 canvas 里所有图形的透明度
    - 有效的值范围是 0.0（完全透明）到 1.0（完全不透明），默认是 1.0。

```js
ctx.globalAlpha = 0.2;
```

**案例**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      canvas {
        background-color: rgba(255, 0, 0, 0.1);
      }
    </style>
  </head>

  <body>
    <canvas id="canvasEl" width="300" height="300"></canvas>

    <script>
      window.onload = function () {
        const canvasEl = document.getElementById("canvasEl");

        // 拿到上下文
        const ctx = canvasEl.getContext("2d");

        // 绘制直线
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(100, 10);
        ctx.closePath();
        ctx.stroke();

        // 绘制三角形
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(10, 110);
        ctx.lineTo(60, 60);
        // ctx.closePath()
        ctx.fillStyle = "#0f0";
        ctx.fill(); // 会自动闭合图形

        // 绘制圆

        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, Math.PI * 2, false);
        ctx.strokeStyle = "red";
        ctx.stroke();

        // 圆2
        ctx.beginPath();
        ctx.arc(200, 100, 50, 0, Math.PI * 2, false);
        ctx.fill(); // 绿色的圆，用的上一个fill的颜色
      };
    </script>
  </body>
</html>
```

## 线型

调用lineTo()函数绘制的线条，是可以通过一系列属性来设置线的样式。

- lineWidth = value： 设置线条宽度。
- lineCap = type： 设置线条末端样式。
- lineJoin = type： 设定线条与线条间接合处的样式。

- **lineWidth**
  - 设置线条宽度的属性值必须为正数。默认值是 1.0px，不需单位。（ 零、负数、Infinity和NaN值将被忽略）
  - 线宽是指给定<font color='red'>路径的中心到两边的粗细</font>。换句话说就是在路径的两边各绘制线宽的一半。
  - 如果你想要绘制一条从 (3,1) 到 (3,5)，宽度是 1.0 的线条，你会得到不准确的结果。
    - 路径的两边个各延伸半个像素填充并渲染出1像素的线条
    - 两边剩下的半个像素又会以实际画笔颜色一半色调来填充
    - 实际画出线条填充色大于1像素了，这就是为何宽度为 1.0 的线经常并不准确的原因。
  - 要解决这个问题，必须对路径精确的控制。如，1px的线条会在路径两边各延伸半像素，那么绘制从 (3.5 ,1) 到 (3.5, 5) 的线条，其边缘正好落在像素边界，填充出来就是准确的宽为 1.0 的线条。

  > 使用canvas，线宽最要是偶数，看起来不会模糊

- lineCap： 属性的值决定了线段端点显示的样子。它可以为下面的三种的其中之一：
  - butt 截断，默认是 butt。
  - round 圆形
  - square 正方形
- lineJoin： 属性的值决定了图形中线段连接处所显示的样子。它可以是这三种之一：
  - round 圆形
  - bevel 斜角
  - miter 斜槽规，默认是 miter。

```html
<body>
  <canvas id="canvasEl" width="300" height="300"></canvas>

  <script>
    window.onload = () => {
      const canvasEl = document.getElementById("canvasEl");
      const ctx = canvasEl.getContext("2d");

      ctx.lineWidth = 10;
      ctx.strokeStyle = "red";
      ctx.lineCap = "round"; // butt square round
      ctx.lineJoin = "round"; // bevel round miter
      ctx.beginPath();
      ctx.moveTo(50, 50);
      ctx.lineTo(100, 100);
      ctx.lineTo(150, 50);
      ctx.stroke();
    };
  </script>
</body>
```

## 绘制文本

- canvas 提供了两种方法来渲染文本：
  - `fillText(text, x, y [, maxWidth])`
    - 在 (x,y) 位置，填充指定的文本
    - 绘制的最大宽度（可选）。
  - `strokeText(text, x, y [, maxWidth])`
    - 在 (x,y) 位置，绘制文本边框
    - 绘制的最大宽度（可选）。
- 文本的样式（需在绘制文本前调用）
  - font = value： 当前绘制文本的样式。这个字符串使用和 CSS font 属性相同的语法。默认的字体是：10px sans-serif。
  - textAlign = value：文本对齐选项。可选的值包括：<font color='red'>start, end, left, right or center</font>. 默认值是 start
  - textBaseline = value：基线对齐选项。可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。 默认值是 alphabetic。

```html
<body>
  <canvas id="canvasEl" width="300" height="300"></canvas>

  <script>
    window.onload = () => {
      const canvasEl = document.getElementById("canvasEl");
      const ctx = canvasEl.getContext("2d");
      ctx.beginPath();

      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Hello World", 150, 150);
    };
  </script>
</body>
```

## 绘制图片

绘制图片，可以使用 `drawImage` 方法将它渲染到 canvas 里。drawImage 方法有三种形态：

- `drawImage(image, x, y) `
  - 其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。
- `drawImage(image, x, y, width, height) `
  - 这个方法多了 2 个参数：width 和 height，这两个参数用来控制用canvas画的图片的大小
- drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  - 第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。其它 8 个参数最好是参照右边的图解，前 4 个 是定义图像源的切片位置和大小，后 4 个则是定义切片的目标显示位置和大小。

图片的来源，canvas 的 API 可以使用下面这些类型中的一种作为图片的源：

- <font color='red'>HTMLImageElement</font>：这些图片是由Image()函数构造出来的，或者任何的`<img>`元素。

- <font color='red'>HTMLVideoElement</font>：用一个 HTML 的 `<video>`元素作为你的图片源，可以从视频中抓取当前帧作为一个图像。

- <font color='red'>HTMLCanvasElement</font>：可以使用另一个 元素作为你的图片源。

> 后面绘制的图形，会覆盖在线绘制的上面

```html
<body>
  <canvas id="canvasEl" width="300" height="300"></canvas>

  <script>
    window.onload = () => {
      const canvasEl = document.getElementById("canvasEl");
      const ctx = canvasEl.getContext("2d");
      // 绘制图片
      const img = new Image();
      img.src = "./images/backdrop.png";
      img.onload = () => {
        // 绘制图片
        ctx.drawImage(img, 0, 0);
        // 绘制折线
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(60, 100);
        ctx.lineTo(100, 30);
        ctx.lineTo(150, 50);
        ctx.stroke();
      };
    };
  </script>
</body>
```

## canvas绘画状态

<font color='red'>Canvas 绘画状态</font>的可以调用 `save` 和 `restore` 方法是用来保存和恢复，这两个方法都没有参数，并且它们是成对存在的。

- 保存和恢复（Canvas）绘画状态
  - save()：保存画布 (canvas) 的所有绘画状态
  - restore()：恢复画布 (canvas) 的所有绘画状态

Canvas绘画状态包括：

- 当前应用的变形（即移动，旋转和缩放）
- 以及这些属性：strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, font, textAlign, textBaseline ......
- 当前的裁切路径（clipping path）

> 注意事项：
>
> - 在<font color='red'>做变形之前先调用 save 方法保存状态</font>是一个良好的习惯。
> - 大多数情况下，调用 restore 方法比手动恢复原先的状态要简单得多。
> - 如果在一个循环中做位移但没有保存和恢复canvas状态，很可能到最后会发现有些东西不见了，因为它很可能已超出canvas画布以外了。
> - <font color='red'>形变需要在绘制图形前调用</font>。

## 变形

- Canvas和CSS3一样也是支持变形，形变是一种更强大的方法，可以将坐标原点移动到另一点、形变可以对网格进行旋转和缩放。
- Canvas的形变有4种方法实现：
  - `translate(x, y)`：用来移动 canvas 和它的原点到一个不同的位置。
    - x 是左右偏移量，y 是上下偏移量（<font color='red'>无需要单位</font>）。
  - `rotate(angle)`：用于以原点为中心旋转 canvas，即沿着z轴旋转。
    - angle是旋转的弧度，是<font color='red'>顺时针方向，以弧度为单位</font>。
  - `scale(x, y)`：用来增减图形在 canvas 中像素数目，对图形进行缩小或放大。
    - x 为水平缩放因子，y 为垂直缩放因子。如果比 1 小，会缩小图形，如果比 1 大会放大图形。默认值为 1，也支持负数。
  - `transform(a, b, c, d, e, f)`： 允许对变形矩阵直接修改。这个方法是将当前的变形矩阵乘上一个基于自身参数的矩阵。

```html
<body>
  <canvas id="canvasEl" width="300" height="300"></canvas>

  <script>
    window.onload = () => {
      const canvasEl = document.getElementById("canvasEl");
      const ctx = canvasEl.getContext("2d");

      // 形变没有保存状态
      // ctx.translate(100, 100)
      // ctx.fillRect(0, 0, 100, 100)
      // ctx.translate(100, 100)
      // ctx.fillRect(0, 0, 100, 100)

      // 形变保存状态，坐标点还是0,0
      ctx.save();
      ctx.translate(100, 100);
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, 150, 150);
      ctx.restore();

      ctx.save();
      ctx.translate(100, 100);
      ctx.fillRect(0, 0, 100, 100);
      ctx.restore();

      ctx.save();
      ctx.translate(100, 100);
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, 50, 50);
      ctx.restore();
    };
  </script>
</body>
```

## Canvas动画

- Canvas绘图都是通过JavaScript 去操控的，如要实现一些交互性动画是相当容易的。那Canvas是如何做一些基本动画的？
  - canvas可能最大的限制就是图像一旦绘制出来，它就是一直保持那样了。
  - 如需要执行动画，不得不对画布上所有图形进行一帧一帧的重绘（比如在1秒绘60帧就可绘出流畅的动画了）。
  - 为了实现动画，我们需要一些可以定时执行重绘的方法。然而在Canvas中有三种方法可以实现：
    - 分别为 `setInterval` 、 `setTimeout` 和 `requestAnimationFrame` 三种方法来定期执行指定函数进行重绘。
- Canvas 画出一帧动画的基本步骤（如要画出流畅动画，1s 需绘60帧）：
  - 第一步：用 <font color='red'>clearRect 方法清空 canvas</font> ，除非接下来要画的内容会完全充满 canvas（例如背景图），否则你需要清空所有。
  - 第二步：<font color='red'>保存 canvas 状态</font>，如果加了 canvas 状态的设置（样式，变形之类的），又想在每画一帧之时都是原始状态的话， 你需要先保存一下，后面再恢复原始状态。
  - 第三步：<font color='red'>绘制动画图形</font>（animated shapes） ，即绘制动画中的一帧。
  - 第四步：<font color='red'>恢复 canvas 状态</font>，如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。

# svg

## 邂逅svg

### 什么是svg

- SVG 全称为（Scalable Vector Graphics），即可缩放矢量图形。（矢量定义：既有大小又有方向的量。在物理学中称作矢 量，如一个带箭头线段：长度表示大小，箭头表示方向；在数学中称作向量。在计算机中，矢量图可无限放大而不变形）
- SVG 是一种基于XML格式的矢量图，主要用于定义二维图形，支持交互和动画。
- SVG 规范是万维网联盟(W3C) 自 1998 年以来开发的标准。
- SVG 图像可在不损失质量的情况下按比例缩放，并支持压缩。
- 基于XML的SVG可轻松的用文本编辑器或矢量图形编辑器创建和编辑，并可以直接在浏览器显示。

### 优点

- 扩展好：矢量图像在浏览器中放大缩小不会失真，可被许多设备和浏览器中使用。而光栅图像（PNG 、JPG）放大缩小会失真。
  - 矢量图像是基于矢量的点、线、形状和数学公式来构建的图形，该图形是没有像素的，放大缩小是不会失真的。
  - 光栅图像是由像素点构建的图像——微小的彩色方块，大量像素点可以形成高清图像，比如照片。图像像素越多，质量越高。
- 灵活：SVG是W3C开发的标准，可结合其它的语言和技术一起使用，包括 CSS、JavaScript、 HTML 和 SMIL 。SVG图像可以<font color='red'> 直接使用JS和CSS进行操作</font>，使用时非常方便和灵活，因为SVG也是可集成到 DOM 中的。
- 可以动画：SVG 图像可以使用 JS 、 CSS 和 SMIL 进行动画处理。对于 Web 开发人员来说非常的友好。
- 轻量级：与其它格式相比，SVG 图像的尺寸非常小。根据图像的不同，PNG 图像质量可能是 SVG 图像的 50 倍。
- 可打印：SVG 图像可以以任何分辨率打印，而不会损失图像质量。
- 利于SEO：SVG 图像被搜索引擎索引。因此，SVG 图像非常适合 SEO（搜索引擎优化）目的。
- 可压缩：与其它图像格式一样，SVG 文件支持压缩。
- 易于编辑：只需一个文本编辑器就可以创建 SVG 图像。设计师通常会使用 Adobe Illustrator （AI）等矢量图形工具创建和编辑。

### 缺点

- 不适和高清图片制作
  - SVG 格式非常适合用于徽标和图标（ICON）等 2D 图形，但<font color='red'>不适用于高清图片，不适合进行像素级操作</font>。
  - SVG 的图像无法显示与标准图像格式一样多的细节，因为它们是使用点和路径而不是像素来渲染的。
- SVG 图像变得复杂时，<font color='red'>加载会比较慢</font>
- 不完全扩平台  尽管 SVG 自 1998 年以来就已经存在，并得到了大多数现代浏览器（桌面和移动设备）的支持，但它<font color='red'>不适用于 IE8 及更低版 本的旧版浏览器</font>。根据caniuse的数据，大约还有 5% 的用户在使用不支持 SVG 的浏览器。

### svg应用场景

- SVG 非常适合显示矢量徽标（Logo）、图标（ICON）和其他几何设计。
- SVG 适合应用在需适配多种尺寸的屏幕上展示，因为SVG的扩展性更好。
- 当需要创建简单的动画时，SVG 是一种理想的格式。
  - SVG 可以与 JS 交互来制作线条动画、过渡和其他复杂的动画。
  - SVG 可以与 CSS 动画交互，也可以使用自己内置的 SMIL 动画。
- SVG 也非常适合制作各种图表（条形图、折线图、饼图、散点图等等），以及大屏可视化页面开发。

### SVG 和 Canvas的区别

- 可扩展性：
  - SVG 是基于矢量的点、线、形状和数学公式来构建的图形，该图形是没有像素的，<font color='red'>放大缩小不会失真</font>。
  - Canvas 是由一个个像素点构成的图形，<font color='red'>放大会使图形变得颗粒状和像素化（模糊）</font>。
  - SVG可以在任何分辨率下以高质量的打印。Canvas 不适合在任意分辨率下打印。
- 渲染能力：
  - 当 SVG 很复杂时，它的渲染就会变得很慢，因为在很大程度上去使用 DOM 时，渲染会变得很慢。
  - Canvas <font color='red'>提供了高性能的渲染和更快的图形处理能力</font>，例如：适合制作H5小游戏。
  - 当图像中具有大量元素时，SVG 文件的大小会增长得更快（导致DOM变得复杂），而Canvas并不会增加太多。
- 灵活度：
  - SVG 可以通过JavaScript 和 CSS 进行修改，用SVG来创建动画和制作特效非常方便。
  - Canvas只能通过JavaScript进行修改，创建动画得一帧帧重绘。
- 使用场景：
  - Canvas 主要用于游戏开发、绘制图形、复杂照片的合成，以及对图片进行像素级别的操作，如：取色器、复古照片。
  - SVG 非常适合显示矢量徽标（Logo）、图标（ICON）和其他几何设计。

## 初体验svg

- SVG的XML声明格式：
  - version 指定版本（必填）
  - encoding 指定XML文档的编码（可选，默认是UTF-8）
  - standalone：指定当前 XML 文档是否依赖于外部标记声明（可选，使用该属性时，需和DTD声明一起用才有意义）。
    - 默认为no：代表依赖外部标记声明
    - yes：代表依赖内部默认的标记声明
- SVG的文档类型声明（DTD），让解析器验证XML文件是否符合该规范，与HTML5文件的DTD声明类似。
  - XML中内部 DTD 声明（可选）
  - XML中外部 DTD 声明（可选）

### SVG文档结构

- SVG1.1文档结构：https://www.w3.org/TR/SVG11/struct.html
  - 第一行：包含一个 XML 声明。由于 SVG 文件是一个 XML 格式的，它应包含一个 XML 声明。
  - 第二行：定义文档类型声明 (DTD)，这里依赖外部的 SVG1.1 文档类型，让解析器验证XML文件是否符合该规范。

  ```html
  <!DOCTYPE svg PUBLIC “-//W3C//DTD SVG 1.1//EN” "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  ```

- SVG2.0文档结构：https://www.w3.org/TR/SVG2/struct.html#Namespace
  - SVG2 version和baseProfile属性已删除，也不推荐写文档类型声明（DTD）。其中&lt;desc>元素是用来描述该文件的。

### 直接生成svg

1.1版本

```html
<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!--
 version="1.0"
 baseProfile="full" 正确渲染svg内容时所需要最小SVG语言概述(版本); full:正常的svg语言概述  basic:基本SVG语言概述  tiny: 轻量级SVG语言概述

 xmlns: 指定svg元素  和 svg内的子元素都是属于 http://www.w3.org/2000/svg 这个命名空间下

 -->
<svg
  version="1.0"
  baseProfile="full"
  width="100"
  height="100"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect x="0" y="0" width="100" height="100"></rect>
  <title>我是svg title</title>
</svg>
```

2.0版本

```html
<?xml version="1.0" standalone="no" ?>
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="100" height="100"></rect>
</svg>
```

### js创建svg

- 使用JS脚本来创建SVG时，<font color='red'>创建的元素都是需要添加命名空间的</font>。
- 比如：创建&lt;svg>或者&lt;rect>元素都需要添加命名空间（http://www.w3.org/2000/svg）
- <font color='red'>对于元素上的属性如果不带前缀的，命名空间赋值为null。</font>
- 因为在XML1.1命名空间规范中建议，<font color='red'>不带前缀的属性</font>（带前缀xlink:href）命名空间的名称是没有值的，这时命名空间的值必须 使用null值。
- 创建 SVG 常用的 DOM2 API：
  - createElementNS（ns，elname）：创建SVG元素
  - setAttributeNS（ns，attrname，value）：给SVG元素添加属性
  - getAttributeNS（ns，attrname）：获取SVG元素上的属性
  - hasAttributeNS（ns, attrname）： 判断SVG元素上是否存在某个属性
  - removeAttributeNS（ns，attname）：删除SVG元素上的某个属性
  - 更多的API：https://developer.mozilla.org/zh-CN/docs/Web/SVG/Namespaces_Crash_Course

```javascript
window.onload = function () {
  // 1.创建svg 和 rect 元素
  let xmlns = "http://www.w3.org/2000/svg";
  let svgEl = document.createElementNS(xmlns, "svg");
  let rectEl = document.createElementNS(xmlns, "rect");
  // 2.给svg 和 rect 元素对象添加属性
  svgEl.setAttributeNS(null, "version", "1.0");
  svgEl.setAttributeNS(null, "width", 100);
  svgEl.setAttributeNS(null, "height", 100);
  rectEl.setAttributeNS(null, "width", 50);
  rectEl.setAttributeNS(null, "height", 50);
  // 3.将svg添加到 body上
  svgEl.appendChild(rectEl);
  document.body.appendChild(svgEl);
};
```

### html中引入svg

可以省略命名空间，浏览器的解析器会自动加上

## svg的使用

- <font color='red'>方式一：img元素</font>
  - 作为一张图片使用，不支持交互，只兼容ie9以上
- <font color='red'>方式二：CSS背景 </font>
  - 作为一张背景图片使用，不支持交互
- <font color='red'>方式三：直接在HTML文件引用源文件</font>
  - 作为HTML 的DOM元素，支持交互，只兼容ie9以上
- 方式四：object元素（了解）。
  - 支持交互式 svg，能拿到object的引用，为 SVG 设置动画、更改其样式表等
- 方式五：iframe元素（了解） 。
  - 支持交互式 svg，能拿到iframe的引用，为 SVG 设置动画、更改其样式表等
- 方式六：embed元素（了解） 。
  - 支持交互式 svg，能拿到embed的引用，为 SVG 设置动画、更改其样式表等，对旧版浏览器有更好的支持。

## SVG Grid 和 坐标系

- SVG 使用的坐标系统（网格系统）和 Canvas的差不多。坐标系是<font color='red'> 以左上角为 (0,0) 坐标原点，坐标以像素为单位，x 轴正方向 是向右，y 轴正方向是向下。 </font>
- SVG Grid（坐标系）
  - &lt;svg>元素默认宽为 300px, 高为 150px。
  - 通常来说网格中的一个单元相当于 svg 元素中的一像素。
  - 基本上在 SVG 文档中的 1 个像素对应输出设备（比如显示屏）上的 1 个像素（除非缩放）。
  - 元素和其它元素一样也是有一个坐标空间的，其原点位于元素的左上角，被称为初始视口坐标系
  - &lt;svg>的 transform 属性可以用来移动、旋转、缩放SVG中的某个元素，<font color='red'>如`<svg>`中某个元素用了变形，该元素内部会建立 一个新的坐标系统，该元素默认后续所有变化都是基于新创建的坐标系统</font>。

### 视口

- 视口（viewport）
  - 视口是 SVG 可见的区域（也可以说是SVG画布大小）。可以将视口视为可看到特定场景的窗口。
  - 可以使用元素的width和height属性指定视口的大小。
  - 一旦设置了最外层 SVG 元素的宽度和高度，浏览器就会建立初始视口坐标系和初始用户坐标系。
- 视口坐标系
  - 视口坐标系是在视口上建立的坐标系，原点在视口左上角的点(0, 0)，x轴正向向右，y轴正向下。
  - 初始视口坐标系中的一个单位等于视口中的一个像素，该坐标系类似于 HTML 元素的坐标系。
- 用户坐标系（ 也称为当前坐标系或正在使用的用户空间，后面绘图都是参照该坐标系 ）
  - 用户坐标系是建立在 SVG 视口上的坐标系。该坐标系最初与视口坐标系相同——它的原点位于视口的左上角。
  - 使用viewBox属性，可以修改初始用户坐标系，使其不再与视口坐标系相同。
- 为什么要有两个坐标系？
  - 因为SVG是矢量图，支持任意缩放。在用户坐标系统绘制的图形，最终会参照视口坐标系来进行等比例缩放。

### 视图框

- 视图框（viewBox）
  - <font color='red'>viewport是 SVG 画布的大小，而 viewBox 是用来定义用户坐标系中的位置和尺寸 （该区域通常会被缩放填充视口）。</font>
  - viewBox 也可理解为是用来指定用户坐标系大小。因为SVG的图形都是绘制到该区域中。用户坐标系可以比视口坐标系更小或更大，也可以在 视口内完全或部分可见。
  - 一旦创建了视口坐标系（`<svg>`使用width和height），浏览器就会创建一个与其相同的默认用户坐标系。
  - 我们可以使用 viewBox 属性指定用户坐标系的大小。
    - 如果用户坐标系与视口坐标系具有相同的高宽比，它将viewBox区域拉伸以填充视口区域。
    - 如果用户坐标系和视口坐标系没有相同的宽高比，可用 preserveAspectRatio 属性来指定整个用户坐标系统是否在视口内可见。
- viewBox语法
  - viewBox =` <main-x> <main-y> <width> <height>` ，比如：viewBox =' 50 50 100 100' ，即确定可见范围(可见范围是50到100)；
  - &lt;main-x>和&lt;main-y> 确定视图框的左上角坐标（不是修改用户坐标系的原点，绘图还是从原来的 0, 0 开始）
  - &lt;width> &lt;height>确定该视图框的宽度和高度。
    - 宽度和高度不必与父元素上设置的宽度和高度相同。
    - 宽度和高度负值无效，为 0 是禁用元素的显示。

### 视口和视图框具有相同宽高比

```html
<svg width="400" height="400" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50"></circle>
</svg>
```

展示效果：圆会等比例撑满整个视口

### 视口和视图框具有不同宽高比

```html
<svg width="400" height="400" viewBox="0 0 200 100">
  <circle cx="50" cy="50" r="50"></circle>
</svg>
```

展示效果：圆会在视口内按比例缩放，<font color='red'>并且会垂直和水平居中</font>

给添加`preserveAspectRatio`属性，该属性允许强制统一缩放视图框viewBox

- preserveAspectRatio= "none", 强制拉伸图形以填充整个视口。

- preserveAspectRatio= “xMinYMin”, 图形在视口的最小x和y轴上显示

## 绘制

SVG所支持的基本形状有：矩形、圆形、椭圆、线条、折线、多边形、路径。

### 矩形rect

&lt;rect>元素6 个基本属性

- x ：矩形左上角的 x 轴位置
- y ：矩形左上角的 y轴位置
- width ：矩形的宽度
- height ：矩形的高度
- rx ：圆角的 x 轴方位的半径
- ry ：圆角的 y 轴方位的半径 。

### 圆形circle

&lt;circle>元素3 个基本属性

- r ：圆的半径
- cx ：圆心的 x轴位置
- cy ：圆心的 y轴位置

### 椭圆 ellipse

&lt;ellipse>元素4 个基本属性

- rx :椭圆的 x轴半径
- ry :椭圆的 y轴半径
- cx :椭圆中心的 x轴位置
- cy :椭圆中心的 y轴位置

### 线条line

&lt;line>元素4 个基本属性

- x1 :起点的 x 轴位置

- y1 :起点的 y轴位置

- x2 :终点的 x轴位置

- y2 :终点的 y轴位置

### 折线polyline

&lt;polyline>元素1 个基本属性

- points : <font color='red'>点集数列</font>。每个数字用空白、逗号、终止命令符或者换行符分隔开。
- 每个点必须包含 2 个数字，一个是 x 坐标，一个是 y 坐标。
- 所以点列表 (0,0), (1,1) 和 (2,2) 可以写成这样：“0 0, 1 1, 2 2”。
  - 支持格式： “0 0, 1 1, 2 2”或 “0 ，0 , 1， 1, 2， 2”或 “0 0 1 1 2 2”

### 多边形polygon

&lt;polygon>元素1 个基本属性

- points :点集数列。每个数字用空白符、逗号、终止命令或者换行符分隔开。
- 每个点必须包含 2 个数字，一个是 x 坐标，一个是 y 坐标。
- 所以点列表 (0,0), (1,1) 和 (2,2) 推荐写成这样：“0 0, 1 1, 2 2”。
- 路径绘制完后闭合图形，所以最终的直线将从位置 (2,2) 连接到位置 (0,0)。

### 路径path

&lt;path>元素可能是 SVG 中最常见的形状。你可以用 &lt; path >元素绘制矩形（直角矩形或圆角矩形）、圆形、椭圆、折线形、 多边形，以及一些其他的形状，例如贝塞尔曲线、2 次曲线等曲线。

默认会填充黑色，默认路径不会闭合

&lt; path >元素有 1 个基本属性用来设置路径点的位置

- d :一个点集数列，以及其它关于如何绘制路径的信息，<font color='red'>必须M命令开头</font>。
  - <font color='red'>所以点列表 (0,0), (1,1) 和 (2,2) 推荐写成这样：“M 0 0, 1 1, 2 2”</font>。
  - 支持格式： “M 0 0, 1 1, 2 2”或 “M0 0, 1 1, 2 2” 或 “M 0 ，0 , 1， 1, 2， 2”或 “M 0 0 1 1 2 2”

#### 路径和命令

- &lt;path>元素是 SVG基本形状中最强大的一个。 你可以用它创建线条，曲线，弧形等等。 
- <font color='red'>元素的形状是通过属性d定义的，属性d的值是一个 “命令 + 参数 ”的序列。 </font>
- 每一个命令都用一个关键字母来表示，比如，字母“M”表示的是“Move to”命令，当解析器读到这个命令时，它就知道你是打算 移动到某个点。跟在命令字母后面的，是你需要移动到的那个点的 x 和 y 轴坐标。比如移动到 (10,10) 这个点的命令，应该写成“M 10 10”命令。这一段字符结束后，解析器就会去读下一段命令。<font color='red'>每一个命令都有两种表示方式，一种是用大写字母，表示采用绝对 定位。另一种是用小写字母，表示采用相对定位</font>（例如：从上一个点开始，向上移动 10px，向左移动 7px）。  属性 d采用的是用户坐标系统，不需标明单位

#### d属性支持的命令

直线命令

- <font color='red'>M / m：Move To</font>
- <font color='red'>L / l ：Line To </font>
- <font color='red'>Z / z：Close Path</font>
- H / h：horizontal
- V / v：vertical

```html
<svg width="400" height="400">
  <path d="M 20 0,L 80 50,L 20 100 Z" fill="transparent" stroke="red"></path>
</svg>

// 简写可以省略L
<svg width="400" height="400">
  <path d="M 20 0,80 50,20 100 Z" fill="transparent" stroke="red"></path>
</svg>
```

### 图片image

在&lt;image>元素的 href 属性引入图片URL

注意事项

- image 元素没设置 x , y 值，它们自动被设置为 0。
- image 元素没设置 height 、width 时，默认为图片大小。
- width 、height 等于 0，将不会呈现这个图像。
- <font color='red'>需在 href 属性上引用外部的图像，不是src属性</font>。

### 文字text

元素的基本属性

- x 和 y 属性决定了文本在用户坐标系中显示的位置。
- <font color='red'>text-anchor 文本流方向属性，可以有 start、middle、end 或 inherit 值，默认值 start </font>
- <font color='red'>dominant-baseline 基线对齐属性 : 有 auto 、middle 或 hanging 值, 默认值：auto</font>

&lt;text>元素的字体属性

- 文本的一个至关重要的部分是它显示的字体。SVG 提供了一些属性，类似于CSS 。下列的属性可以被设置为一个 SVG 属性或一个 CSS 属性：
  - font-family、font-style、font-weight、font-variant、font-stretch、font-size、font-size-adjust、kerning、letter-spacing、word-spacing和textdecoration。
- 其它文本相关的元素：
  - &lt;tspan><font color='red'>元素用来标记大块文本的子部分，它必须是一个text元素或别的tspan元素的子元素</font>。
  - x 和 y 属性决定了文本在视口坐标系中显示的位置。
  - alignment-baseline 基线对齐属性：auto 、baseline、middle、hanging、top、bottom ... ,默认是 auto

```html
<svg width="400" height="400">
  <text x="200" y="200" fill="red" font-size="50">
    Ay
    <tspan>￥1000</tspan>
  </text>
</svg>
```

## 元素的组合g

元素的组合

- <font color='red'>&lt;g&gt;元素是用来组合元素的容器</font>。
  - 添加到g元素上的变换会应用到其所有的子元素上。
  - 添加到g元素的属性大部分会被其所有的子元素继承。
  - g元素也可以用来定义复杂的对象，之后可以通过`<use>`元素来引用它们
- &lt;g>元素的属性（该元素只包含全局属性）
  - 核心属性：id
  - 样式属性：class 、style
  - Presentation Attributes（也可说是 CSS 属性，这些属性可写在CSS中，也可作为元素的属性用）：
    - cursor, display, fill, fill-opacity, opacity,…
    - stroke, stroke-dasharray, stroke-dashoffset, stroke-linecap, stroke-linejoin
    - 更多表示属性：https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation
- 事件属性：onchange, onclick, ondblclick, ondrag…
- 动画属性：transform

可以将组内相同的属性放到&lt;g>元素上

## 图形元素的复用defs

把可复用的元素定义在&lt; defs >元素里面，然后通过&lt;use>元素来引用和显示。

&lt; defs >元素，定义可复用元素。

- 例如：定义基本图形、组合图形、渐变、滤镜、样式等等。

- 在&lt; defs >元素中定义的图形元素是不会直接显示的。

- 可在视口任意地方用来呈现在defs中定义的元素。

- 元素没有专有属性，使用时通常也不需添加任何属性。

## 引入元素use

&lt;use>元素从 SVG 文档中获取节点，并将获取到的节点复制到指定的地方。

- 等同于深度克隆DOM节点，克隆到use元素所在的位置。
- 克隆的节点是不可见的，当给元素应用CSS样式时须小心。因为克隆的 DOM 不能保证都会继承 元素上的CSS 属性，但是CSS可继承的属性是会继承的。

元素的属性

- `href`： 需要复制元素/片段的 URL 或 ID（<font color='red'>支持跨SVG引用</font>）。默认值：无
- `x / y` ：元素的 x / y 坐标（<font color='red'>相对复制元素的位置</font>）。 默认值：0
- `width / height` ：元素的宽和高（在引入svg或symbol元素才起作用）。 默认值：0

```html
<svg width="300" height="300">
  <defs>
    <!-- 0.样式 -->
    <style>
      rect {
        fill: green;
      }
    </style>
    <!-- 1.定义了一个矩形 -->
    <rect id="rectangle" x="0" y="0" width="100" height="50"></rect>

    <!-- 2.定义了一个组合图形 -->
    <g id="circles" fill="transparent" stroke="red">
      <circle cx="50" cy="50" r="25"></circle>
      <circle cx="80" cy="50" r="25"></circle>
      <circle cx="110" cy="50" r="25"></circle>
      <circle cx="140" cy="50" r="25"></circle>
    </g>
    <!-- 定义渐变 -->
    <!-- 滤镜 -->
  </defs>

  <!-- 在这里进行图形的复用 -->
  <use href="#rectangle"></use>
  <use href="#circles"></use>
</svg>

<!-- 跨svg复用 -->
<svg width="300" height="300">
  <use href="#rectangle"></use>
  <use href="#circles"></use>
</svg>
```

## 图形元素复用symbols

&lt;symbols>元素和&lt;defs>元素类似，也是用于定义可复用元素，然后通过&lt;use>元素来引用显示。

- 在&lt;symbols>元素中定义的图形元素默认也是不会显示在界面上。
- &lt;symbols>元素常见的应用场景是用来定义各种小图标，比如：icon、logo、徽章等

&lt;symbols>元素的属性

- viewBox：定义当前 的视图框。
- x / y ：symbol元素的 x / y坐标。 ；默认值：0
- width / height：symbol元素的宽度。 默认值：0

&lt;symbols>元素和&lt;defs>元素的区别

- &lt;defs>元素没有专有属性，而元素提供了更多的属性
  - 比如： viewBox、 preserveAspectRatio 、x、y、width、height等。
- &lt;symbols>元素有自己用户坐标系，<font color='red'>可以用于制作SVG精灵图</font>。
- &lt;symbols>元素定义的图形增加了结构和语义性，提高文档的可访问性。

## 填充和描边

如果想要给SVG中的元素上色，一般有两种方案可以实现：

- 第一种：直接使用元素的属性，比如：<font color='red'>填充（fill）属性、描边（stroke）属性</font>等。
- 第二种：直接<font color='red'>编写CSS样式</font>，因为SVG也是HTML中的元素，也支持用CSS的方式来编写样式。

### 填充属性（fill）

fill 填充属性，专门用来给SVG中的元素填充颜色。

- `fill =“color”`。支持：颜色名、十六进制值、rgb、 rgba 、 <font color='red'>currentColor </font>（继承自身或父亲字体color）。
- `fill-opacity = ”number ”`， 该属性专门用来控制填充色的不透明，值为 0 到 1。

### 描边属性（stroke）

stroke 描边属性

- stroke = “color”： 指定元素边框填充颜色。
- stroke-opacity = “number”：控制元素边框填充颜色的透明度。
- stroke-width = “number”：指定边框的宽度。注意，边框是以路径为中心线绘制的。
- stroke-linecap =“butt | square | round”：控制边框端点的样式。
- stroke-linejoin = “miter | round | bevel”:控制两条线段连接处样式

### css样式

直接编写CSS样式实现填充和描边

- 除了定义元素的属性外，你也可以通过CSS来实现填充和描边（CSS样式可写在defs中，也可写在HTML头部或外部等）。
- 语法和 HTML 里使用 CSS 一样，<font color='red'>需要注意的是：需要把 background-color、border 改成 fill 和 stroke</font>
- <font color='red'>不是所有的属性都能用 CSS 来设置，上色和填充的部分是可以用 CSS 来设置</font>。
  - 比如，fill，stroke，stroke-dasharray 等可以用CSS设置；比如，路径的命令则不能用 CSS 设置。

# GSAP动画库

什么是GSAP

- GSAP全称是（ GreenSock Animation Platform）GreenSock 动画平台。
- GSAP 是一个强大的 JavaScript 动画库，可让开发人员轻松的制作各种复杂的动画。

GSAP动画库的特点

- <font color='red'>GSAP无论是HTML 元素、还是SVG、或是Vue、React组件的动画</font>，都可以满足你的需求。
- GSAP的还提供了一些插件，可以用最少的代码创建令人震惊的动画，比如：ScrollTrigger插件和MorphSVG插件。
- GSAP 的核心是一个高速的属性操纵器，随着时间的推移，它可以极高的准确性更新值。它比 jQuery 快 20 倍！
- GSAP 使用起来非常灵活，在你想要动画的地方基本都可以使用，并且是<font color='red'>零依赖</font>。

## GSAP 补间动画（Tween）

GSAP的Tween动画有4中类型：

- `gsap.from(targets | selector, vars)` ：元素从from定义的状态过度到元素当前的状态。
  - <font color='red'>targets | selector</font> ： 需动画的元素对象，支持字符串的选择器
  - <font color='red'>vars</font>: 需过度动画的属性和GSAP扩展的duration、ease、transformOrigin、repeat、delay、yoyo、stagger、onComplete 等
  - 官网gsap.form文档：https://greensock.com/docs/v3/GSAP/gsap.from()
- `gsap.to(targets | selector, vars)` - 元素从当前的状态过度到to状态。
- `gsap.fromTo(targets | selector, fromVars， toVars)` -元素从from定义状态过度到to定义的状态
- gsap.set(targets | selector, vars) - 立即设置属性（无过度效果）。
  - 本质上是一个 duration = 0 的 to 补间动画。

哪些属性可以设置动画？

- GSAP几乎可以为任何属性制作动画
  - 包括 CSS 属性、元素属性、自定义对象属性。
  - 甚至 CSS 变量和复杂的字符串。
  - 最常见的动画属性、变换和不透明度等。

- GSAP还专门给CSS形变（transform）相关属性提供了简写，官网形变文档：https://greensock.com/get-started/#transformShorthand

## GSAP 动画时间线（TimeLine）

什么是动画时间线（TimeLine）：

- 时间线（TimeLine）是用来创建易于调整、有弹性的<font color='red'>动画序列</font>。
- 当我们将补间添加到时间线（Timeline）时，默认情况下，它们会<font color='red'>按照添加到时间轴的顺序一个接一个地播放</font>。

TimeLine的使用步骤：

- 第一步：通过gsap.timeline( vars ) 拿到时间线对象
  - timeline文档： https://greensock.com/docs/v3/GSAP/Timeline
- 第二步：调用时间线上的 Tween 动画方法，比如：form、to 等

案例：

```html
<body>
  <!-- 滑板车 -->
  <svg
    id="scooter"
    height="512"
    width="512"
    viewBox="0 0 512.004 512.004"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="footer-block"
      d="m175.669 463.803c-8.283 0-15-6.716-15-15 0-53.743-43.723-97.467-97.467-97.467-14.622 0-28.673 3.153-41.762 9.371-7.483 3.555-16.432.371-19.986-7.112-3.555-7.482-.37-16.431 7.113-19.985 17.143-8.143 35.525-12.273 54.635-12.273 70.286 0 127.467 57.182 127.467 127.467 0 8.283-6.714 14.999-15 14.999z"
      fill="#c5e1e6"
    />
    <path
      id="footboard2"
      d="m442.768 321.476c-63.027 2.945-113.414 51.086-120.563 112.327h-210.801c-8.285 0-15 6.716-15 15s6.715 15 15 15h224.932c8.285 0 15-6.716 15-15 0-52.162 40.777-94.928 92.832-97.36 8.275-.387 14.67-7.408 14.283-15.684-.387-8.275-7.402-14.684-15.683-14.283z"
      fill="#008adf"
    />
    <path
      id="footboard1"
      d="m442.768 321.476c-63.027 2.945-113.414 51.086-120.563 112.327h-66.204v30h80.335c8.285 0 15-6.716 15-15 0-52.162 40.777-94.928 92.832-97.36 8.275-.387 14.67-7.408 14.283-15.684-.387-8.275-7.402-14.684-15.683-14.283z"
      fill="#0065a3"
    />
    <path
      id="scooter-head"
      d="m448.787 415.604c-7.721 0-14.279-5.923-14.932-13.755l-28.796-345.572c-1.291-15.484-11.852-26.275-20.521-26.275-8.283 0-15-6.716-15-15s6.717-15 15-15c12.9 0 25.295 5.971 34.9 16.811 8.852 9.99 14.361 23.12 15.518 36.972l28.797 345.573c.688 8.256-5.447 15.506-13.703 16.194-.425.035-.847.052-1.263.052z"
      fill="#8db9c4"
    />
    <circle id="wheel4" cx="63.203" cy="448.803" fill="#c5e1e6" r="48.2" />
    <path
      id="wheel3"
      d="m63.203 512.002c-34.848 0-63.199-28.351-63.199-63.199 0-34.849 28.352-63.199 63.199-63.199 34.85 0 63.201 28.35 63.201 63.199 0 34.848-28.352 63.199-63.201 63.199zm0-96.398c-18.306 0-33.199 14.893-33.199 33.199 0 18.307 14.894 33.199 33.199 33.199 18.307 0 33.201-14.893 33.201-33.199s-14.895-33.199-33.201-33.199z"
      fill="#1d4659"
    />
    <circle id="wheel2" cx="448.803" cy="448.803" fill="#8db9c4" r="48.2" />
    <g fill="#0e232c">
      <path
        id="wheel1"
        d="m448.803 512.002c-34.848 0-63.199-28.351-63.199-63.199 0-34.849 28.352-63.199 63.199-63.199 34.85 0 63.201 28.35 63.201 63.199 0 34.848-28.352 63.199-63.201 63.199zm0-96.398c-18.307 0-33.199 14.893-33.199 33.199 0 18.307 14.893 33.199 33.199 33.199 18.307 0 33.201-14.893 33.201-33.199s-14.895-33.199-33.201-33.199z"
      />
      <path
        id="head-block"
        d="m352.402.002c-8.283 0-15 6.716-15 15s6.717 15 15 15h32.135v-30h-32.135z"
      />
    </g>
  </svg>
  <script src="./libs/gsap.min.js"></script>
  <script>
    window.onload = function () {
      let tl = gsap.timeline({
        repeat: -1, // 重复的次数
        // yoyo: true // 反向执行动画
      });

      // 1.给车轮做动画
      tl.from(
        [
          "#wheel1", // begin= 0s
          "#wheel2", // 0.2
          "#wheel3", // 0.4
          "#wheel4", // 0.6
        ],
        {
          scaleX: 0,
          scaleY: 0,
          duration: 1,
          transformOrigin: "center",
          ease: "bounce.out",
          stagger: 0.2,
        },
      )

        .from(["#footboard1", "#footboard2"], {
          scaleX: 0,
          duration: 1,
          transformOrigin: "left",
          ease: "bounce.out",
        })

        .from(["#scooter-head"], {
          scaleY: 0,
          duration: 1,
          transformOrigin: "bottom",
          ease: "bounce.out",
        })

        .from(["#head-block", "#footer-block"], {
          scaleX: 0,
          duration: 1,
          transformOrigin: "right",
          ease: "bounce.out",
        });
    };
  </script>
</body>
```

# ECharts5

## 1.ECharts 初体验

> div容器必须要有高度，宽度可选

```html
<div id="main" style="height: 400px"></div>
<script src="../libs/echarts-5.3.3.js"></script>
<script>
  // 1.基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById("main"));

  // 2.指定图表的配置项和数据
  var option = {
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    legend: {
      data: ["销量"],
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };

  // 3.使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
</script>
```

最精简 配置版

```js
var option = {
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },

  yAxis: {},

  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};
```

## 2.切换渲染引擎 和 主题色

```js
echarts.init(document.getElementById("main"), null, { renderer: "svg" });

echarts.init(document.getElementById("main"), "dark", { renderer: "svg" });
```

## 3.配置项（组件）

### 1.Grid 组件

```json
       backgroundColor: "rgba(255, 0, 0, 0.1)",

       grid: {
          show: true,
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          left: 0,
          right: 0,
          top:0,
          bottom:0,
          containLabel: true, // grid 区域是否包含坐标轴的刻度标签
        }
```

### 2.x，y坐标系 组件

```json
        xAxis: {

          show: true,
          name: "类目坐标",
          type: "category", // 类目坐标才有data选项
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],

          axisLine: { // 坐标轴轴线相关设置。
            show: true,
            lineStyle: {
              color: "red",
              width: 3,
            },
          },

          axisLabel: { // 坐标轴刻度标签的相关设置。
            show: true,
            color: "green",
            fontSize: 16,
          },

          axisTick: {  // 坐标轴刻度相关设置。
            show: true,
            length: 10,
            lineStyle: {
              color: "blue",
              width: 3,
            },
          },

          splitLine: { // 坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: "orange",
              width: 1,
            },
          },


        },
```

### 3.series 系列

#### 1.data 支持的编写方式

```json
        series: [
          {
            name: "产品销量柱形图",
            type: "bar",
            label: {
              show: true,
            },

            // 方式一
            // data: [5, 20, 36, 10, 10, 20],


            // 方式二
            // data: [
            //   [0, 5],
            //   [1, 20],
            //   [2, 36],
            //   [3, 10],
            //   [4, 10],
            //   [5, 20],
            // ],


            // 方式三(推荐)
            data: [
              {
                value: 5,
                name: "衬衫", // 数据项名称, 比如pie系列 tooltip 需要用到
              },
              {
                value: 20,
                name: "羊毛衫",
              },
              {
                value: 36,
                name: "雪纺衫",
              },
              {
                value: 10,
                name: "裤子",
              },
              {
                value: 10,
                name: "高跟鞋",
              },
              {
                value: 20,
                name: "袜子",
              },
            ],


            // 方式四
            // data: [
            //   {
            //     value: [0, 5], // 数组第一项为x轴值，第二项为y轴值
            //     name: "衬衫", // 数据项名称, 比如pie系列 tooltip 需要用到
            //   },
            //   {
            //     value: [1, 20],
            //     name: "羊毛衫",
            //   },
            //   {
            //     value: [2, 36],
            //     name: "雪纺衫",
            //   },
            //   {
            //     value: [3, 10],
            //     name: "裤子",
            //   },
            //   {
            //     value: [4, 10],
            //     name: "高跟鞋",
            //   },
            //   {
            //     value: [5, 20],
            //     name: "袜子",
            //   },
            // ],


            // 方式五(地理坐标系推荐)
   			// data: [
            //   {
            //     value: [0, 5, 500], // 第一项为x轴或纬度值，第二项为y或维度轴值，第三项以后为扩展值
            //     name: "衬衫", // 数据项名称, 比如pie系列 tooltip 需要用到
            //   },
            //   {
            //     value: [1, 20, 400],
            //     name: "羊毛衫",
            //   },
            //   {
            //     value: [2, 36, 200],
            //     name: "雪纺衫",
            //   },
            //   {
            //     value: [3, 10, 100],
            //     name: "裤子",
            //   },
            //   {
            //     value: [4, 10, 600],
            //     name: "高跟鞋",
            //   },
            //   {
            //     value: [5, 20, 300],
            //     name: "袜子",
            //   },
            // ],



          },
        ],
```

#### 2.type 图表类型(bar、pie)

折线图 和 条型图

```json
series: [
          {
            name: "产品销量柱形图",
            type: "line", // line  bar scatter   pie
            data: [5, 20, 36, 10, 10, 20],
          },
],
```

饼图

```json
series: [
          {
            name: "产品销量柱形图",
            type: "pie",

			// 设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
            center: ["50%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。

            // 百分比是参照容器高宽中较小一项( 感觉是直径 )
            radius: ["20%", "85%"], // 饼图的半径。数组的第一项是内半径，第二项是外半径。
            roseType: "area", //area玫瑰图(南丁格尔图)。 圆心角一样，通过半径展现数据大小(默认false)

            data: [
              {
                value: 5,
                name: "衬衫", // 数据项名称, 比如pie系列 tooltip 需要用到
              },
              {
                value: 20,
                name: "羊毛衫",
              },
              {
                value: 36,
                name: "雪纺衫",
              },
              {
                value: 10,
                name: "裤子",
              },
              {
                value: 10,
                name: "高跟鞋",
              },
              {
                value: 20,
                name: "袜子",
              },
            ],



          },
        ],
```

#### 3.label( 优先级 )

```json
        series: [
          {
            name: "产品销量柱形图",
            type: "bar",

            label: { // 系列图形上的文本标签
              show: true,
              position: [10, 10], // 支持的类型可以查文档，不同type的position的值会有些差异
              color: "white",
              fontSize: "20px",
            },

            data: [
              {
                value: 5,
                // 优先级别更高
                 label: {
                   show: false,
                 },
              },

              ....
            ],
          },
        ],
```

#### 4.itemStyle 图形默认色

```json
        series: [
          {
            name: "产品销量柱形图",
            type: "bar",

            itemStyle: { // 系列图形的样式
              color: "red",
              // borderColor: "orange",
              // borderWidth: 4,
              // opacity: 0.4,
            },

            data: [
              {
                value: 5,
                // 优先级别更高
                itemStyle: {
                  color: "green",
                },
              },
              ....
            ],

          },
        ],
```

#### 5.emphasis 高亮色

鼠标悬浮到图形元素上时，高亮的样式。

```json
        series: [
          {
            name: "产品销量柱形图",
            type: "bar",

            emphasis: { // 图形高亮( label、labelLine、itemStyle、lineStyle、areaStyle... )
              label: {
                // show: false,
                color: "gold",
              },
            },

            data: [
              {
                value: 5,
                // 优先级别更高
                emphasis: {
                  label: {
                    // show: false,
                    color: "green",
                  },
                },
              },
              ....
            ],
          },
        ],
```

### 4.title 组件

```json
   title: {
      text: "Echart 5.x 条形图",
      left: 20,
      top: 10,
   },
```

### 5.legend 图例组件

pie

```json
        legend: {
          show: true,
          // width: 50, // 图例组件的宽度。默认自适应
          itemWidth: 20, // 图例标记的图形宽度。
          // icon: "circle",
          // top: 10,
          // bottom: 0,


          // formatter: "liu-{name}",  // 用来格式化图例标记文本，支持字符串模板和回调函数两种形式。
          formatter: function (name) {
            return name + "  {countSty|40%}"; // 富文本语法：{style_name|value} 不能有空格
          },

          textStyle: {


            color: "red",
            rich: { // 在 rich 里面，可以自定义富文本样式。
              countSty: {
                color: "red",
              },
            },
          },


        },
```

### 6.tooltip 组件

```json
        tooltip: {
          show: true,

          // 使用了 trigger ，一般也结合 axisPointer
          trigger: "axis",  // 默认是 item

          axisPointer: {
            type: "line", //  (默认是竖线 line)  (横线 + 竖线 cross)  (横线 + 竖线 shadow)
          },

        },
```

### 7.Color的渐变色

对象配置方式（ 推荐 ）

```json
              color: {
                // 渐变
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "red",
                  },
                  {
                    offset: 1,
                    color: "blue",
                  },
                ],
              },
```

调用 API 生成

```json
 			color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#20FF89",
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 255, 255, 0)",
                  },
                ],
                false
              ),
```

## 4.图表实战

### 1.柱形图

```json
var option = {
        backgroundColor: "rbg(40,46,72)",
        grid: {
          left: "5%",
          right: "6%",
          top: "30%",
          bottom: "5%",
          containLabel: true, // grid 区域是否包含坐标轴的刻度标签
        },
        tooltip: {},
        xAxis: {
          name: "月份",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#42A4FF",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "white",
          },

          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
        },
        yAxis: {
          name: "个",
          nameTextStyle: {
            color: "white",
            fontSize: 13,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#42A4FF",
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#42A4FF",
            },
          },
          axisLabel: {
            color: "white",
          },
        },
        series: [
          {
            name: "销量",
            type: "bar",
            barWidth: 17,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#01B1FF", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#033BFF", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            data: [500, 2000, 3600, 1000, 1000, 2000, 4000],
          },
        ],
      };

```

### 2.折线图

```json
 var option = {
        backgroundColor: "rbg(40,46,72)",
        grid: {
          left: "5%",
          right: "1%",
          top: "20%",
          bottom: "15%",
          containLabel: true, // grid 区域是否包含坐标轴的刻度标签
        },
        legend: {
          bottom: "5%",
          itemGap: 20,
          itemWidth: 13,
          itemHeigth: 12,
          textStyle: {
            color: "#64BCFF",
          },
          icon: "rect",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#20FF89",
            },
          },
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: "#64BCFF",
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              color: "#64BCFF",
            },
          },
        ],
        series: [
          {
            name: "正常",
            type: "line",
            smooth: true,  // 是否平滑曲线显示。
            symbolSize: 5, // 标记的大小
            showSymbol: false,
            itemStyle: {
              color: "#20FF89",
            },
            // 区域填充样式。设置后显示成区域面积图。
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#20FF89",
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 255, 255, 0)",
                  },
                ],
                false
              ),
            },
            data: [200, 200, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410],
          },
          {
            name: "异常",
            type: "line",
            smooth: true, // 是否平滑曲线显示。
            symbolSize: 5, // 标记的大小，可以设置成诸如 10 这样单一的数字
            showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
            itemStyle: {
              // 折线的颜色
              color: "#EA9502",
            },
            // 折线区域的颜色
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#EA9502",
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 255, 255, 0)",
                  },
                ],
              },
            },
            data: [500, 300, 202, 258, 280, 660, 320, 202, 308, 280, 660, 420],
          },
        ],
      };

```

### 3.饼图

```json
     // =====准备数据=====
      let pieDatas = [
        {
          value: 100,
          name: "广州占比",
          percentage: "5%",
          color: "#34D160",
        },
        {
          value: 200,
          name: "深圳占比",
          percentage: "4%",
          color: "#027FF2",
        },
        {
          value: 300,
          name: "东莞占比",
          percentage: "8%",
          color: "#8A00E1",
        },
        {
          value: 400,
          name: "佛山占比",
          percentage: "10%",
          color: "#F19610",
        },
        {
          value: 500,
          name: "中山占比",
          percentage: "20%",
          color: "#6054FF",
        },
        {
          value: 600,
          name: "珠海占比",
          percentage: "40%",
          color: "#00C6FF",
        },
      ];

      // 将 pieDatas 格式的 数据映射为 系列图所需要的数据格式
      var data = pieDatas.map((item) => {
        return {
          value: item.value,
          name: item.name,
          itemStyle: {
            color: item.color,
          },
        };
      });

      // 求出总数
      let total = pieDatas.reduce((a, b) => {
        return a + b.value * 1;
      }, 0);
      // =====准备数据=====

      // 2.指定图表的配置项和数据
      var option = {
        backgroundColor: "rbg(40,46,72)",
        title: {
          text: `充电桩总数`,
          top: "50%",
          left: "50%",
          padding: [-20, 0, 0, -45],
          textStyle: {
            fontSize: 19,
            color: "white",
          },

          // 副标题使用-富文本语法：{style_name|value}， 注意不能有空格
          subtext: `{totalSty|${total}}`,
          subtextStyle: {
            rich: {
              totalSty: {
                fontSize: 19,
                color: "white",
                width: 90,
                align: "center",
              },
            },
          },
        },
        legend: {
          orient: "vertical",
          right: "10%",
          top: "18%",
          itemGap: 20,
          itemWidth: 16,
          itemHeigth: 16,
          icon: "rect",
          // 自定义图例的名称
          formatter: function (name) {
            // 图例文本格式化 + 富文本定制样式
            var currentItem = pieDatas.find((item) => item.name === name);
            return (
              "{nameSty|" +
              currentItem.name +
              "}\n" +
              "{numberSty|" +
              currentItem.value +
              "个 }" +
              "{preSty|" +
              currentItem.percentage +
              "}"
            );
          },
          textStyle: {
            rich: {
              nameSty: {
                fontSize: 12,
                color: "#FFFFFF",
                padding: [10, 14],
              },
              numberSty: {
                fontSize: 12,
                color: "#40E6ff",
                padding: [0, 0, 0, 14],
              },
              preSty: {
                fontSize: 12,
                color: "#40E6ff",
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            center: ["50%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            radius: ["30%", "75%"], // 饼图的半径。数组的第一项是内半径，第二项是外半径。
            label: {
              show: false,
            },
            // data: [  { name: '',   value: '',   itemStyle }  ],
            data: data,
            roseType: "area", //  area 玫瑰图, 圆心角一样，通过半径展现数据大小( 默认为false )
          },
        ],
      };

```

### 4.地图

#### 1.geo 地理坐标系组件

1.引入 geo_json

2.注册需要的地图 GeoJSON （在调 setOption 之前注册即可）

3.配置显示地图

```js
    <!-- 1.引入geo_json -->
    <script src="../libs/echarts-5.3.3.js"></script>
    <script src="./geojson/china_json.js"></script>
    <script src="./geojson/gd_geojson.js"></script>

    <!-- 南昌这个不需要注册了，因为该文件已经自动注册了 -->
    <script src="./geojson/南昌.js"></script>

    <script>
      // 2.注册地图
      echarts.registerMap("中国", { geoJSON: china_json });
      echarts.registerMap("gd", { geoJSON: gd_geojson });

      var myChart = echarts.init(document.getElementById("main"), null, {
        renderer: "svg",
      });

      var option = {
        backgroundColor: "rgba(40,46,72, 0.2)",
        grid: {
          show: true,
          backgroundColor: "rgba(0, 0, 255, 0.2)",
        },
        // 4.配置地图
        // 全局的地理坐标系组件。地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。
        // geo 支持数组和对象，数组可创建多个地理坐标系
          geo: [
            {
              map: "南昌", // 中国 、gd、南昌
            },
          ]
        // series: [],
      };
      myChart.setOption(option);
    </script>
```

#### 2.map series

1.引入 geo_json

2.注册需要的地图 GeoJSON （支持注册多个，也需要引入多个）

3.配置显示地图

```js

    <script src="../libs/echarts-5.3.3.js"></script>
    <script src="./geojson/china_json.js"></script>
    <script>
      echarts.registerMap("中国", { geoJSON: china_json });
      var myChart = echarts.init(document.getElementById("main"), null, {
        renderer: "svg",
      });
      var option = {
        // 系列地图
        series: [
          {
            type: "map",
            map: "中国",
          },
        ],
      };
      myChart.setOption(option);
    </script>
```

#### 3.itemStyle着色

areaColor

borderColor

```json
      var option = {
        geo: {
          map: "中国", // 中国 、gd、南昌
          roam: false, // 是否开启鼠标缩放和平移漫游。默认不开启。
          label: {
            // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
            show: false,
          },
          aspectScale: 0.75, // 这个参数用于 scale 地图的长宽比，如果设置了projection则无效。

          // =======地图着色=========
          itemStyle: {
            areaColor: "#023677", // 地图区域的颜色。
            borderColor: "#1180c7", // 图形的描边颜色。
          },

          emphasis: {
            itemStyle: {
              areaColor: "#4499d0",
            },
            label: {
              color: "white",
            },
          },
          // =======地图着色=========
        },
        series: [],
      };
```

#### 4.map data

```json
    var data = [
        { name: "北京", value: 199 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 123 },
        { name: "上海", value: 24 },
        { name: "江苏", value: 92 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 91 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 180 },
        { name: "广东", value: 123 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 },
      ];


        series: [
          {
            name: "中国地图",
            type: "map",
            map: "中国",

            // =====地图着色======
            itemStyle: {
              areaColor: "#023677",
              borderColor: "#1180c7",
            },
            emphasis: {
              itemStyle: { areaColor: "#4499d0" },
              label: { color: "white" },
            },
            select: {
              label: { color: "white" },
              itemStyle: { areaColor: "#4499d0" },
            },
            // =====地图着色======


            // ===== 添加数据(不需要地理坐标点，直接使用name) =====
            // name: 数据所对应的地图区域的名称，例如 '广东'，'浙江'。
            // value: 该区域的数据值。。
            // data: [ {name:'' ,  value: '' }, .... ]
            data
          },
        ],

```

#### 5.visualmap

seriesIndex: [0]

inRange 指定选中范围的视觉元素样式

```json
      var option = {

        // 1.视觉数据映射
        visualMap: [
          {
            // type: "continuous", // 连续型视觉映射组件 (默认)
            // type: "piecewise", // 分段型视觉映射组件
            left: "20%",
            seriesIndex: [0], // 指定取哪个系列的数据
            // 定义 在选中范围中 的视觉元素, 对象类型。
            inRange: {
              color: ["#04387b", "#467bc0"], // 映射组件和地图的颜色(一般和地图色相近)
            },
          },
        ],


       }
```

### 5.散点图

#### 1.地图上散点图的基本用法

1.配置地理坐标系组件（ 在 geo 配置）

2.散点图系列

3.散点图复用地图坐标系组件 ( geoIndex )

```json
var option = {
        backgroundColor: "rgba(40,46,72, 0.2)",
        grid: {
          show: true,
          backgroundColor: "rgba(0, 0, 255, 0.2)",
        },
        // 4.配置地图
        geo: {
          map: "中国",
        },

        series: [
          {
            name: "散点图",

            type: "effectScatter",
            geoIndex: 0, // geo 支持数组，默认是 0
            coordinateSystem: "geo", // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。


            data: [
              {
                name: "广东",
                value: [113.280637, 23.125178, 193],
              },
              {
                name: "北京",
                value: [116.405285, 39.904989, 199],
              },
            ],

           // ====== 散点大小和着色========
            symbolSize: function (val) {
              return val[2] / 10;
            },
            itemStyle: {
              color: "yellow",
              shadowBlur: 10,
              shadowColor: "yellow",
            },
           // ====== 散点大小和着色========

          },
        ],
      };
```

#### 2.地图散点图+地图的数据

```json

      var data = [
        { name: "北京", value: 199 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 123 },
        { name: "上海", value: 154 },
        { name: "江苏", value: 102 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 101 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 120 },
        { name: "广东", value: 193 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 },
      ];



      var option = {
        tooltip: {}, // 提示框组件

        // 1.地理坐标系
        geo: {
          map: "中国",
        },

        series: [

          // 3.地图上的数据
          {
            name: "中国地图",
            type: "map",
            map: "中国",
            data,
            itemStyle: {
              areaColor: "#023677",
              borderColor: "#1180c7",
            },
            emphasis: {
              itemStyle: { areaColor: "#4499d0" },
              label: { color: "white" },
            },
            select: {
              label: { color: "white" },
              itemStyle: { areaColor: "#4499d0" },
            },
          },

          // 2.散点图，复用地理坐标系
          {
            name: "散点图充电桩",
            type: "effectScatter",
            geoIndex: 0, // geo 支持数组
            coordinateSystem: "geo", // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
            data: [
              {
                name: "广东",
                value: [113.280637, 23.125178, 193],
              },
              {
                name: "北京",
                value: [116.405285, 39.904989, 199],
              },
            ],
            symbolSize: function (val) {
              return val[2] / 10;
            },
            itemStyle: {
              color: "yellow",
              shadowBlur: 10,
              shadowColor: "yellow",
            },
          },
        ],
      };

```

#### 3.地图+散点图最终的案例

```json
      var mapName = "中国"
      var data = [
        { name: "北京", value: 199 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 123 },
        { name: "上海", value: 154 },
        { name: "江苏", value: 102 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 101 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 120 },
        { name: "广东", value: 193 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 },
      ];

      var geoCoordMap = {};
      /*获取地图数据*/
      myChart.showLoading();
      // console.log(echarts.getMap(mapName));
      var mapFeatures = echarts.getMap(mapName).geoJson.features;
      mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
      myChart.hideLoading();
      console.log("data=>", data);
      console.log("geoCoordMap=>", geoCoordMap);

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: [...geoCoord, data[i].value],
            });
          }
        }
        console.log("res=>", res);
        return res;
      };

      // 2.指定图表的配置项和数据
      var option = {
        tooltip: {},
        visualMap: {
          left: "20%",
          seriesIndex: [0],
          inRange: {
            color: ["#04387b", "#467bc0"], // 蓝绿
          },
        },
        geo: {
          map: "中国",
          roam: false,
          label: { show: false },
          aspectScale: 0.75,
          itemStyle: {
            areaColor: "#023677",
            borderColor: "#1180c7",
          },
          emphasis: {
            itemStyle: { areaColor: "#4499d0" },
            label: { color: "white" },
          },
        },
        series: [
          {
            name: "中国地图",
            type: "map",
            map: "中国",
            data,
            // 地图样式
            itemStyle: {
              areaColor: "#023677",
              borderColor: "#1180c7",
            },
            emphasis: {
              itemStyle: { areaColor: "#4499d0" },
              label: { color: "white" },
            },
            select: {
              label: { color: "white" },
              itemStyle: { areaColor: "#4499d0" },
            },
          },

          {
            name: "散点图充电桩",
            type: "effectScatter",
            geoIndex: 0,
            coordinateSystem: "geo", // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
            data: convertData(data),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            itemStyle: {
              color: "yellow",
              shadowBlur: 10,
              shadowColor: "yellow",
            },
            tooltip: {
              show: true,
              trigger: "item",
              formatter: function (params) {
                console.log(params);
                var data = params.data;
                return `${params.seriesName} <div style="margin:5px 0px;"/> ${data.name} ${data.value[2]}`;
              },
            },
          },
        ],
      };

```

## 5.ECharts API

### 1.响应式图表

```js
// 1.响应式图表
window.addEventListener("resize", function () {
  console.log("resize");
  myChart.resize(); // 可以接收一个对象，传递修改后的宽 和 高
  // myChart.resize({ height: "600px" });
});
```

### 2.自动轮播提示框

```json
     // 自动轮播图 bar
      setInterval(function () {
        autoToolTip();
      }, 1000);

      let index = 0; // 0-5
      function autoToolTip() {
        index++;
        if (index > 5) {
          index = 0;
        }
        // 1.显示提示框
        myChart.dispatchAction({
          type: "showTip", // 触发的action type
          seriesIndex: 0, // 系列的 索引
          dataIndex: index,// 数据项的 索引
          position: "top", // top
        });
      }
```

### 3.图表点击事件(地图下钻)

```js
// 1..监听鼠标点击事件
myChart.on("click", function (event) {
  console.log(event);
  if (event.name === "广东") {
    option.geo.map = "gd";
    myChart.setOption(option);
  }
});
```
