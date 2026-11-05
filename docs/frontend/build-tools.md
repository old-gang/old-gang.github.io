---
title: 学习构建工具
tags: web前端
abbrlink: d9bdeb2b
date: 2025-06-30 10:24:01
---

# 快速开发工具vite

## 认识vite

什么是vite呢？

官方的定位：

- 官方的定位：下一代前端开发与构建工具；

如何定义下一代开发和构建工具呢？ 

- 我们知道在实际开发中，我们编写的代码往往是不能被浏览器直接识别的，比如ES6、TypeScript、Vue文件等等； 
- 所以我们必须通过构建工具来对代码进行转换、编译，类似的工具有webpack、rollup、parcel； 
- 但是随着项目越来越大，需要处理的JavaScript呈指数级增长，模块越来越多； 
- 构建工具需要很长的时间才能开启服务器，HMR也需要几秒钟才能在浏览器反应出来； 
- 所以也有这样的说法：天下苦webpack久矣；

## vite的构造

- **它主要由两部分组成**： 
  - <font color='red'>一个开发服务器</font>，它基于原生ES模块提供了丰富的内建功能，HMR的速度非常快速； 
  - <font color='red'>一套构建指令</font>，它使用rollup打开我们的代码，并且它是预配置的，可以输出生成环境的优化过的静态资源； 
- **在浏览器支持 ES 模块之前，JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发。** 
  - 这也正是我们对 “打包” 这个概念熟悉的原因：使用工具抓取、处理并将我们的源码模块串联成可以在浏览器中运行的文件。 
  - 时过境迁，我们见证了诸如 webpack、Rollup 和 Parcel 等工具的变迁，它们极大地改善了前端开发者的开发体验。 
  - 然而，当我们开始构建越来越大型的应用时，需要处理的 JavaScript 代码量也呈指数级增长。包含数千个模块的大型项目相 当普遍。 
  - 基于 JavaScript 开发的工具就会开始遇到性能瓶颈：通常需要很长时间（甚至是几分钟！）才能启动开发服务器，即使使用 模块热替换（HMR），文件修改后的效果也需要几秒钟才能在浏览器中反映出来。
- **Vite 旨在利用生态系统中的新进展解决上述问题**
  - 浏览器开始原生支持 ES 模块，且越来越多 JavaScript 工具使用编译型语言编写。

## 浏览器模块化支持

现在浏览器已经支持ES Module，模块化代码可以直接运行在浏览器上

> 1、script要添加type="module"
>
> 2、引入模块要是用完整路径，不能省略.js之类

```js
import { sum, mul } from "./utils/index.js";

const message = "Hello World!";
console.log(message);

const foo = () => {
  console.log("foo");
};
foo();

console.log(sum(1, 2));
console.log(mul(1, 2));
```



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="./main.js" type="module"></script>
</body>
</html>
```

**存在的问题：**

- 必须明确写上后缀名
- 如果某一个模块，加载很多其他的js文件，那么这些js文件都需要被依次加载
  - 浏览器需要将所有的js文件请求下来，发送很多http请求，效率很低
- 如果代码中有typescript/jsx/vue代码，那么浏览器是不识别的

## vite基础打包能力

**vite的安装**

```sh
npm i vite -D
```

**通过vite来启动项目**

```sh
npm vite
```

**vite对css的支持**

-  直接导入css即可

**vite可以直接支持css预处理器，比如less**

- 直接导入less
- 安装less编译器

**vite直接支持postcss的转换**

- 只需要安装postcss，并且配置 postcss.config.js 的配置文件即可

```sh
npm i postcss postcss-preset-env -D
```

**Vite对TypeScript的支持**

vite对TypeScript是原生支持的，它会直接使用ESBuild来完成编译，只需要直接导入即可

如果我们查看浏览器中的请求，会发现请求的依然是ts的代码： 

- 这是因为vite中的服务器Connect会对我们的请求进行转发； 
- 获取ts编译后的代码，给浏览器返回，浏览器可以直接进行解析； 

注意：在vite2中，已经不再使用Koa了，而是使用Connect来搭建的服务器



## vite打包vue、react

### 对vue的支持

vite对vue提供第一优先级支持：

- Vue 3 单文件组件支持：`@vitejs/plugin-vue` 
- Vue 3 JSX 支持：`@vitejs/plugin-vue-jsx `

安装支持vue的插件

```sh
npm i @vitejs/plugin-vue -D
```

在vite.config.js中配置插件：

```js
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
});
```

### 对react的支持

.jsx 和 .tsx 文件同样开箱即用，它们也是通过 ESBuild来完成的编译： 

- 所以我们只需要直接编写react的代码即可； 
- 注意：在index.html加载main.js时，我们需要将main.js的后缀，修改为 main.jsx 作为后缀名；

```jsx
import React, { useState } from "react";

function ReactApp() {
  const [count, setCount] = useState(10);

  return (
    <div>
      <h2>React app计数器：{count}</h2>

      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}

export default ReactApp;
```

```jsx
// 引入react组件
import ReactApp from "./components/ReactApp.jsx";
import React from "react";
import ReactDOM from "react-dom/client";

// 创建react元素
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<ReactApp />);
```



## vue脚手架工具使用

### vite打包项目

我们可以直接通过vite build来完成对当前项目的打包工具

```sh
npx vite build
```

我们可以通过preview的方式，开启一个本地服务来预览打包后的效果：

```sh
npx vite preview
```



### vite脚手架

创建项目

```sh
npm create vite@latest
```



## ESBuild工具的解析

ESBuild的特点： 

- 超快的构建速度，并且不需要缓存； 
- 支持ES6和CommonJS的模块化； 
- 支持ES6的Tree Shaking； 
- 支持Go、JavaScript的API； 
- 支持TypeScript、JSX等语法编译； 
- 支持SourceMap； 
- 支持代码压缩； 
- 支持扩展其他插件；

ESBuild为什么这么快呢？ 

- 使用Go语言编写的，可以直接转换成机器代码，而无需经过字节码； 
- ESBuild可以充分利用CPU的多内核，尽可能让它们饱和运行； 
- ESBuild的所有内容都是从零开始编写的，而不是使用第三方，所以从一开始就可以考虑各种性能问题； 
- 等等....



# 邂逅webpack


## webpack是什么

先看一下官方解释：

> webpack is a static module bundler for modern JavaScript applications

webpack是一个静态的模块化打包工具，为现代的JavaScript应用程序； 

我们来对上面的解释进行拆解： 

- <font color='red'>打包bundler</font>：webpack可以将帮助我们进行打包，所以它是一个打包工具 
- <font color='red'>静态的static</font>：这样表述的原因是我们最终可以将代码打包成最终的静态资源（部署到静态服务器）； 
- <font color='red'>模块化module</font>：webpack默认支持各种模块化开发，ES Module、CommonJS、AMD等； 
- <font color='red'>现代的modern</font>：我们前端说过，正是因为现代前端开发面临各种各样的问题，才催生了webpack的出现和发展；

Webpack的运行是<font color='red'>依赖Node环境</font>的，所以我们电脑上必须有Node环境



## 创建局部的webpack

```sh
# 第一步：创建package.json文件，用于管理项目的信息、库依赖等
npm init
# 第二步：安装局部的webpack
npm install webpack webpack-cli -D
# 第三步：使用局部的webpack
npx webpack
```



## webpack的默认打包

我们可以通过webpack进行打包，之后运行打包之后的代码，在目录下直接执行 webpack 命令

```sh
webpack	
```

生成一个dist文件夹，里面存放一个main.js的文件，就是我们打包之后的文件： 

- 这个文件中的代码被压缩和丑化了； 
- 另外我们发现代码中依然存在ES6的语法，比如箭头函数、const等，这是因为默认情况下webpack并不清楚我们打包后的文 件是否需要转成ES5之前的语法，后续我们需要通过babel来进行转换和设置； 

我们发现是可以正常进行打包的，但是有一个问题，webpack是如何确定我们的入口的呢？ 

- 事实上，当我们运行`webpack`时，webpack会查找当前目录下的 src/index.js作为入口； 
- 所以，如果当前项目中没有存在src/index.js文件，那么会报错；

## webpack配置文件

我们可以在根目录下创建一个`webpack.config.js`文件，来作为webpack的配置文件：

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
};
```

> 因为webpack是以来node环境的，所以导出使用的是commonjs规范



## Loader的使用

loader 可以用于<font color='red'>对模块的源代码进行转换</font>； 


### loader配置方式

配置方式表示的意思是在我们的webpack.config.js文件中写明配置信息：

module.rules的配置如下：

rules属性对应的值是一个数组：[Rule]

数组中存放的是一个个的Rule，Rule是一个对象，对象中可以设置多个属性：

- <font color='red'>test属性</font>：用于对 resource（资源）进行匹配的，通常会设置成正则表达式； 
- <font color='red'>use属性</font>：对应的值时一个数组：[UseEntry] 
  - UseEntry是一个对象，可以通过对象的属性来设置一些其他属性 
    - loader：必须有一个 loader属性，对应的值是一个字符串； 
    - options：可选的属性，值是一个字符串或者对象，值会被传入到loader中； 
    - query：目前已经使用options来替代； 
  - 传递字符串（如：use: [ 'style-loader' ]）是 loader 属性的简写方式（如：use: [ { loader: 'style-loader'} ]）； 
- <font color='red'>loader属性</font>： Rule.use: [ { loader } ] 的简写。

### css-loader的使用

- 我们可以将css文件也看成是一个模块，我们是通过import来加载这个模块的； 
- 在加载这个模块时，webpack其实并不知道如何对其进行加载，我们必须制定对应的loader来完成这个功能；

对于加载css文件来说，我们需要一个可以读取css文件的loader； 这个loader最常用的是`css-loader`；

◼ css-loader的安装：

```sh
npm i css-loader -D
```



### 认识style-loader

- 我们已经可以通过css-loader来加载css文件了 
  - 但是你会发现这个css在我们的代码中并<font color='red'>没有生效（页面没有效果）</font>。 
- 这是为什么呢？ 
  - 因为css-loader<font color='red'>只是负责将.css文件进行解析</font>，并不会将解析之后的css插入到页面中； 
  - 如果我们希望再完成插入style的操作，那么我们还需要另外一个loader，就是<font color='red'>style-loader</font>； 
- 安装style-loader：

```sh
npm i style-loader -D
```



案例：

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
  module: {
    rules: [
      {
        // 告诉webpack匹配什么文件
        test: /\.css$/,
        // loader的使用顺序是从后往前的，所以要先style-loader，然后css-loader
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
};
```

**简写**：

- 如果use中只有<font color='red'>一个loader</font>，可以不写use，直接写loader

```js
{
   rules:[
       {
           test:/\.css$/,
           loader:'css-loader'
       }
   ]
}

```

- 如果多个loader都<font color='red'>没有别的属性</font>，则可以直接写一个字符串数组

```js
{
   rules:[
       {
           test:/\.css$/,
           use:['style-loader','css-loader']
       }
   ]
}
```

> 注意：<font color='red'>loader的执行顺序是从右向左</font>

### 认识PostCSS工具

#### autoprefixer插件

- 什么是PostCSS呢？ 
  - PostCSS是一个通过JavaScript来转换样式的工具； 
  - 这个工具可以帮助我们进行一些CSS的转换和适配，比如**自动添加浏览器前缀**、**css样式的重置；** 
  - 但是实现这些功能，我们需要借助于PostCSS对应的插件； 
- 如何使用PostCSS呢？主要就是两个步骤： 
  - 第一步：查找PostCSS在构建工具中的扩展，比如webpack中的postcss-loader； 
  - 第二步：选择可以添加你需要的PostCSS相关的插件；

案例：

```sh
# 来安装postcss-loader
npm install postcss-loader -D
# 我们需要添加前缀，所以要安装autoprefixer
npm install autoprefixer -D
```



```js
{
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: ["autoprefixer"],
    },
  },
},
```

我们可以将这些配置信息放到一个单独的文件中进行管理：

在根目录下创建`postcss.config.js`

```js
module.exports = {
  plugins: ["autoprefixer"],
};
```

#### postcss-preset-env插件

- 它可以帮助我们将一些现代的CSS特性，转成大多数浏览器认识的CSS，并且会根据目标浏览器或者运行时环境添加所需的 polyfill； 
- 也包括会自动帮助我们添加autoprefixer（所以相当于已经内置了autoprefixer）；

```sh
npm install postcss-preset-env -D
```

```js
module.exports = {
  plugins: ["postcss-preset-env"],
};
```

### 认识asset module type

- 我们当前使用的webpack版本是webpack5： 
  - 在webpack5之前，加载这些资源我们需要使用一些loader，比如raw-loader 、url-loader、file-loader； 
  - 在webpack5开始，我们可以直接使用资源模块类型（asset module type），来替代上面的这些loader； 
- 资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：
  - **asset/resource** 发送一个单独的文件并导出 URL。 
    - 之前通过使用 file-loader 实现；
  - **asset/inline** 导出一个资源的 data URI。 
    - 之前通过使用 url-loader 实现； 
  - **asset/source** 导出资源的源代码 
    - 之前通过使用 raw-loader 实现； 
  - **asset** 在导出一个 data URI 和发送一个单独的文件之间自动选择。 
    - 之前通过使用 url-loader，并且配置资源体积限制实现；



```js
{
  // 处理图片文件
  test: /\.(png|svg|jpe?g|gif)$/i,
  type: "asset/resource",
},
```

### 为什么需要babel

事实上，在开发中我们很少直接去接触babel，但是babel对于前端开发来说，目前是不可缺少的一部分： 

- 开发中，我们想要使用ES6+的语法，想要使用TypeScript，开发React项目，它们都是离不开Babel的； 

- 所以，学习Babel对于我们理解代码从编写到线上的转变过程至关重要； 


那么，Babel到底是什么呢？ 

- Babel是一个工具链，主要用于旧浏览器或者环境中将ECMAScript 2015+代码转换为向后兼容版本的JavaScript； 
- 包括：语法转换、源代码转换等；

和postcss一样，转换需要各种插件，一个个设置是比较麻烦的，我们可以使用预设（preset-env）

```sh
npm install @babel/preset-env babel-loader -D
```



### webpack对路径的解析

#### resolve模块解析

- resolve用于设置模块如何被解析： 
  - 在开发中我们会有各种各样的模块依赖，这些模块可能来自于自己编写的代码，也可能来自第三方库； 
  - resolve可以帮助webpack从每个 require/import 语句中，找到需要引入到合适的模块代码； 
  - webpack 使用 `enhanced-resolve` 来解析文件路径； 
- webpack能解析三种文件路径： 
  - 绝对路径 
    - 由于已经获得文件的绝对路径，因此不需要再做进一步解析。 
  - 相对路径 
    - 在这种情况下，使用 import 或 require 的资源文件所处的目录，被认为是上下文目录； 
    - 在 import/require 中给定的相对路径，会拼接此上下文路径，来生成模块的绝对路径； 
  - 模块路径 
    - 在 resolve.modules中指定的所有目录检索模块； 
      - 默认值是 ['node_modules']，所以默认会从node_modules中查找文件； 
    - 我们可以通过设置别名的方式来替换初识模块路径，具体后面讲解alias的配置；

#### 确认文件还是文件夹

- 如果是一个文件： 
  - 如果文件具有扩展名，则直接打包文件； 
  - 否则，将使用 resolve.extensions选项作为文件扩展名解析； 
- 如果是一个文件夹： 
  - 会在文件夹中根据 resolve.mainFiles配置选项中指定的文件顺序查；
  - resolve.mainFiles的默认值是 ['index']； 
  - 再根据 resolve.extensions来解析扩展名；

### extensions和alias配置

- extensions是解析到文件时自动添加扩展名： 
  - 默认值是 ['.wasm', '.js', '.json']； 
  - 所以如果我们代码中想要添加加载 .vue 或者 jsx 或者 ts 等文件时，我们必须自己写上扩展名； 
- 另一个非常好用的功能是配置别名alias： 
  - 特别是当我们项目的目录结构比较深的时候，或者一个文件的路径可能需要 ../../../这种路径片段； 

```js
resolve: {
  extensions: [".js", ".vue", ".json",'.ts','.tsx'],
},
```

## 插件的使用

Webpack的另一个核心是Plugin：

- Loader是用于<font color='red'>特定的模块类型</font>进行转换； 
- Plugin可以用于<font color='red'>执行更加广泛的任务</font>，比如打包优化、资源管理、环境变量注入等；

### CleanWebpackPlugin

每次修改了一些配置，重新打包时，都需要手动删除dist文件夹，我们可以借助于一个插件来帮助我们完成，这个插件就是`CleanWebpackPlugin`；

### HtmlWebpackPlugin

打包需要将html文件打包仅dist文件夹中，可以使用`HtmlWebpackPlugin`

> 最新版webpack已集成到output的配置中 

安装：

```sh
npm i  clean-webpack-plugin html-webpack-plugin -D
```

使用：

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
```



#### 生成index.html分析

我们会发现，现在自动在dist文件夹中，生成了一个index.html的文件，该文件中也自动添加了我们打包的bundle.js文件；这个文件是如何生成的呢？

- 默认情况下是根据ejs的一个模板来生成的；
- 在html-webpack-plugin的源码中，有一个default_index.ejs模块；

#### 自定义HTML模板

如果我们想在自己的模块中加入一些比较特别的内容： 

- 比如添加一个noscript标签，在用户的JavaScript被关闭时，给予响应的提示； 
- 比如在开发vue或者react项目时，我们需要一个可以挂载后续组件的根标签 

这个我们需要一个属于自己的index.html模块：

```ejs
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>
```

#### 自定义模板数据填充

上面的代码中，会有一些类似这样的语法<font color='red'><% 变量 %></font>，这个是EJS模块填充数据的方式。 

在配置HtmlWebpackPlugin时，我们可以添加如下配置： 

- template：指定我们要使用的模块所在的路径，不写的话会出现模板引用错误的问题； 
- title：在进行htmlWebpackPlugin.options.title读取时，就会读到该信息；

```js
plugins: [
  new HtmlWebpackPlugin({
    title: "webpack-demo",
    template:'./index.html'
  }),
],
```

### DefinePlugin的使用

DefinePlugin允许在编译时创建配置的全局常量，是一个webpack内置的插件（不需要单独安装）：

> 注意：
>
> <font color='red'>注入的变量可以全局使用</font>
>
> 变量的值，会被当做js代码执行，所以字符串需要加一个引号包裹

```js
plugins: [
  new DefinePlugin({
    CODER_NAME: "'hello world'",
  }),
],
```

## webpack搭建本地服务器

`webpack-dev-server`

安装

```sh
npm i webpack-dev-server -D
```

修改配置文件

```json
"scripts": {
  "build": "webpack",
  "serve":"webpack serve --config webpack.config.js"
},
```

## 认识模块热替换

什么是HMR呢？ 

- HMR的全称是<font color='red'>Hot Module Replacement</font>，翻译为模块热替换； 
- 模块热替换是指在 <font color='red'>应用程序运行过程中</font>，替换、添加、删除模块，而<font color='red'>无需重新刷新整个页面</font>；

如何使用HMR呢？ 

- 默认情况下，webpack-dev-server已经支持HMR，我们只需要开启即可（默认已经开启）； 
- 在不开启HMR的情况下，当我们修改了源代码之后，整个页面会自动刷新，使用的是live reloading；

修改webpack的配置

```js
  devServer: {
    hot: true,
  },
```

但是你会发现，当我们修改了某一个模块的代码时，依然是刷新的整个页面： 

- 这是因为我们需要去指定哪些模块发生更新时，进行HMR

在入口文件中配置：

```js
// 测试HMS
if (module.hot) {
  module.hot.accept("./utils/index.js", () => {
    console.log("utils updated");
  });
}
```

## host配置

- host设置主机地址： 
  - 默认值是localhost； 
  - 如果希望其他地方也可以访问，可以设置为 0.0.0.0； 
- **localhost 和 0.0.0.0 的区别**： 
  - <font color='red'>localhost</font>：本质上是一个域名，通常情况下会被解析成127.0.0.1; 
  - <font color='red'>127.0.0.1</font>：回环地址(Loop Back Address)，表达的意思其实是我们主机自己发出去的包，直接被自己接收; 
    - 正常的数据库包经常 应用层 - 传输层 - 网络层 - 数据链路层 - 物理层 ; 
    - 而回环地址，是在网络层直接就被获取到了，是不会经常数据链路层和物理层的; 
    - 比如我们监听 127.0.0.1时，在同一个网段下的主机中，通过ip地址是不能访问的; 
  - <font color='red'>0.0.0.0</font>：监听IPV4上所有的地址，再根据端口找到不同的应用程序; 
    - **比如我们监听 0.0.0.0时，在同一个网段下的主机中，通过ip地址是可以访问的**;



- port设置监听的端口，默认情况下是8080 
- open是否打开浏览器： 
  - 默认值是false，设置为true会打开浏览器； 
  - 也可以设置为类似于 Google Chrome等值； 
- compress是否为静态文件开启gzip compression： 
  - 默认值是false，可以设置为true；



## webpack配置合并

可以将公共配置抽取

```sh
npm i webpack-merge -D
```

使用是：

```js
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.comm.config')

module.exports = merge(commonConfig,{
	mode:'production',
    output:{
        xxx
    }
    // 自己读有的配置
})
```







# 开发脚手架

新建package.json

```sh
npm init -y
```

脚手架原理：

> 在控制台输入特定指令的时候，执行特定的文件

如何实现：

在package.json里加入`bin`字段，开发时，需要执行`npm link`建立一个软链接。上传之后，当用户执行了`npm i `则会自动关联上

在根目录创建lib文件夹

```json
// package.json
{
  "name": "crCli",
  "version": "1.0.0",
  "main": "index.js",
  "bin": {
    "crCli": "./lib/index.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```
