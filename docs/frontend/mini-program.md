---
title: 小程序开发
tags: web前端
abbrlink: 8d10680e
date: 2024-02-11 10:26:01
---

# 开发小程序的技术选型

- 原生小程序开发：
  - 微信小程序：https://developers.weixin.qq.com/miniprogram/dev/framework/
  - 支付宝小程序：https://opendocs.alipay.com/mini/developer
- 选择框架开发小程序：
  - uni-app：uni-app 是一个<font color=red>使用 Vue 开发</font> 所有前端应用的框架，开发者编写一套代码，可发布到 iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/ 百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台。
  - taro：taro 是一个开放式 跨端 跨框架 解决方案，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ / 飞书 小程序 / H5 / RN 等应用；在 Taro3.x 之后，支持<font color=red>Vue3、React Hook</font>写法等；

# 前置知识

- 注册账号：
  - 申请 AppId：https://mp.weixin.qq.com/cgi-bin/wx
- 小程序的开发工具
  - [微信开发者工具(必须下载)](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
  - VSCode

# 项目的结构和目录

![目录结构](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/image-20240211105405829.png)

- `app.json`：整个小程序的配置都在这里
  - `pages`：所有的页面都需要在这里配置
    - 一般先新建一个文件夹，然后新建 page
    - 也可以直接在 pages 新建，然后保存，编辑器会帮我们创建好对应的文件

# 小程序的双线程模型

小程序的宿主环境：微信客户端

宿主环境为了执行小程序的各种文件：wxml 文件、wxss 文件、js 文件

当小程序基于 WebView 环境下时，WebView 的 JS 逻辑、DOM 树创建、CSS 解析、样式计算、Layout、Paint (Composite) 都发生 在同一线程，在 WebView 上执行过多的 JS

以此为前提，小程序同时考虑了性能与安全，采用了目前称为「双线程模型」的架构。逻辑可能阻塞渲染，导致界面卡顿

## 双线程模型

- <font color=red>WXML 模块和 WXSS</font>样式运行于 <font color=red>渲染层</font>，渲染层使用 WebView 线程渲染（一个程序有多个页面，会使用多个 WebView 的线程）。
- <font color=red>JS 脚本</font>（app.js/home.js 等）运行于<font color=red>逻辑层</font>，逻辑层使 用 JsCore 运行 JS 脚本。
- 这两个线程都会经由微信客户端（Native）进行中转交互。

# 小程序配置文件

常见配置文件

<font color=red>project.config.json</font>：项目配置文件, 比如项目名称、appid 等；

- https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html

<font color=red>sitemap.json</font>：小程序搜索相关的；

- https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html

<font color=red>app.json</font>：全局配置；

<font color=red>page.json</font>：页面配置；

> 修改本地配置文件，一般修改`project.private.config.json`，并且将其添加到.gitignore 中

## 全局 app 配置文件

[全局配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)，较多查看官网

`pages`: 页面路径列表

用于指定小程序由哪些页面组成，每一项都对应一个页面的 路径（含文件名） 信息。

小程序中所有的页面都是必须在 pages 中进行注册的。

`window`: 全局的默认窗口展示

用户指定窗口如何展示, 其中还包含了很多其他的属性

`tabBar`: 底部 tab 栏的展示

## 页面 page 配置文件

每一个小程序页面也可以使用 .json 文件来对本页面的窗口表现进行配置。

- 页面中配置项在当前页面会覆盖 app.json 的 window 中相同的配置项。
- https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html

> - 引用非自带的组件时，需要在.json 中配置
> - 顶部标题的特殊定制，等等

# 注册小程序

每个小程序都需要在 app.js 中调用 <font color=red>App 函数</font> 注册小程序示例

https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html

注册 App 时，我们一般会做什么呢？

- <font color=red>判断小程序的进入场景</font>
- <font color=red>监听生命周期函数</font>，在生命周期中执行对应的业务逻辑，比如在某个生命周期函数中进行登录操作或者请求网络数据
- 因为<font color=red>App()实例只有一个</font>，并且是全局共享的（单例对象），所以我们可以将一些共享数据放在这里；

## 判断打开场景

常见的打开场景：群聊会话中打开、小程序列表中打开、微信扫一扫打开、另一个小程序打开

https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html

在 onLaunch 和 onShow 生命周期回调函数中，会有 options 参数，其中有 scene 值；

## 定义全局 App 的数据

> 一般存放的是常量数据，或者基本上不会改变的数据

```js
// app.js
  globalData: {
    userInfo: null,
    token:'cr123456',
    nickName:'Mr.chu'
  }

// 小程序的某个页面
  onLoad(options) {
    const app = getApp()
    this.setData({
      token:app.globalData.token,
      nickName:app.globalData.nickName
    })
  },
```

> 一般在 app.js 中的 onLaunch 中写登录逻辑

# 注册页面

小程序中的每个页面, 都有一个对应的 js 文件, 其中调用 Page 函数注册页面示例

- 在注册时, 可以绑定初始化数据、生命周期回调、事件处理函数等。
- https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html

我们来思考：注册一个 Page 页面时，我们一般需要做什么呢？

1.在<font color=red>生命周期函数</font>中发送网络请求，从服务器获取数据；

2.<font color=red>初始化一些数据</font>，以方便被 wxml 引用展示；

3.<font color=red>监听 wxml 中的事件</font>，绑定对应的事件函数；

4.其他一些监听（比如页面滚动、上拉刷新、下拉加载更多等）；

# 列表渲染

在组件中，我们可以使用 wx:for 来遍历一个数组 （字符串 - 数字）

默认情况下，遍历后在 wxml 中可以使用一个变量 index，保存的是当前遍历数据的下标值。

数组中对应某项的数据，使用变量名 item 获取。

```html
<view class="book">
  <block wx:for="{{books}}" wx:key="id">
    // id：每一项中的id，使用唯一的字符串或数字 <view>{{item.name}}</view> //
    默认会有item 和 index
  </block>
</view>
```

> \<block />并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。

默认情况下，item – index 的名字是固定的

但是某些情况下，我们可能想使用其他名称，或者当出现多层遍历时，名字会重复

这个时候，我们可以指定 item 和 index 的名称：

```html
<view class="book">
  <block wx:for="{{ books }}" wx:for-item="book" wx:for-index="i" wx:key="id">
    <view>{{book.name}} - {{i + 1}}</view>
  </block>
</view>
```

## wx:key 的使用

我们看到，使用 wx:for 时，会报一个警告：

这个提示告诉我们，可以添加一个 key 来提供性能。

为什么需要这个 key 属性呢？

- 这个其实和小程序内部也使用了虚拟 DOM 有关系（和 Vue、React 很相似）。
- 当某一层有很多相同的节点时，也就是列表节点时，我们希望插入、删除一个新的节点，可以更好的复用节点；

**wx:key 的值以两种形式提供**

- <font color=red>字符串</font>，代表在 for 循环的 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能 动态改变。
- 保留关键字 `*this` 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字。

# WXS

<font color=red>WXS（WeiXin Script）</font>是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。

- 官方：WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致。（不过基本一致）

**为什么要设计 WXS 语言呢？**

- 在 WXML 中是不能直接调用 Page/Component 中定义的函数的.

- 但是某些情况, 我们可以希望使用函数来处理 WXML 中的数据(类似于 Vue 中的过滤器)，这个时候就使用 WXS 了

**WXS 使用的限制和特点：**

- WXS 不依赖于运行时的基础库版本，可以在所有版本的小程序中运行；

- WXS 的运行环境和其他 JavaScript 代码是隔离的，WXS 中不能调用其他 JavaScript 文件中定义的函数，也不能调用小程序 提供的 API；

- 由于运行环境的差异，在 iOS 设备上小程序内的 WXS 会比 JavaScript 代码快 2 ~ 20 倍。在 android 设备 上二者运行效率 无差异；

**WXS 有两种写法：**

- 写在\<wxs>标签中 , module：模块名必填字段
- 写在以`.wxs`结尾的文件中

```html
<!-- 方法一：使用wxs标签 -->
<wxs module="format">
  function formatPrice(price) { return '￥' + price } //
  必须导出后，才能被其他地方调用：必须使用commonJs导出 module.exports = {
  formatPrice: formatPrice }
</wxs>

<!-- 方法二：导入 -->
<wxs module="format" src="/utils/formatPrice.wxs"></wxs>

<view class="book">
  <block wx:for="{{ books }}" wx:for-item="book" wx:for-index="i" wx:key="id">
    <view
      >{{book.name}} - {{i + 1}} - {{ format.formatPrice(book.price) }}</view
    >
  </block>
  <view>总价：{{format.calcTotalPrice(books)}}</view>
</view>
```

```js
// utils/formatPrice.wxs
function formatPrice(price) {
  return "￥" + price;
}

function calcTotalPrice(book) {
  return book.reduce(function (preValue, item) {
    return preValue + item.price;
  }, 0);
}

// 必须导出后，才能被其他地方调用：必须使用commonJs导出
module.exports = {
  formatPrice: formatPrice,
  calcTotalPrice: calcTotalPrice,
};
```

> <font color=red>注：</font>
>
> - 不支持 ES6 写法，不可以使用 const 、箭头函数等
> - 必须要导出，且不可以使用解构写法
> - 必须添加模块名

```js
// 时间格式化
function padLeft(time) {
  time = time + "";
  return ("00" + time).slice(time.length);
}

function formatDuration(duration) {
  var minute = Math.floor(duration / 60);
  var second = Math.floor(duration) % 60;
  return padLeft(minute) + ":" + padLeft(second);
}
```

# currentTarget 和 target 的区别

`currentTarget`：处理事件的组件(不一定是被点的那个，可能是冒泡时触发的)

`target`：触发事件的组件(点了谁，谁就是)

# 事件参数的传递

当视图层发生事件时，某些情况需要事件携带一些参数到执行的函数中, 这个时候就可以通过`data-`属性来完成：

1. 格式：<font color=red>data-属性的名称=‘值’</font>

获取：<font color=red>e.currentTarget.dataset.属性的名称</font>

```html
<button bind:tap="onClick" data-name="churui" data-age="25">点我</button>
```

```js
  onClick(event) {
    const { age, name } = event.currentTarget.dataset
    console.log(age, name);
  },
```

**案例：**

```html
<view class="tab-control">
  <block wx:for="{{title}}" wx:key="index">
    <view
      class="item {{currentIndex === index ? 'active' : ''}}"
      bind:tap="onTap"
      data-index="{{index}}"
    >
      {{item}}
    </view>
  </block>
</view>
```

```js
  onTap(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      currentIndex: index
    })
  },
```

2. 格式：`mark:属性的名称=‘值’`

获取：`e.mark.属性的名称`

```html
<view class="mark" bind:tap="onMarkTap" mark:name="churui">
  <text>mark</text>
</view>
```

```js
  onMarkTap(event) {
    console.log(event.mark, 'mark');
  },
```

# 组件化开发

类似于页面，自定义组件由 json wxml wxss js 4 个文件组成。

按照我的个人习惯, 我们会先在根目录下创建一个 components 文件夹；

components, 里面存放我们之后自定义的公共组件；

常见一个自定义组件 my-cpn: 包含对应的四个文件；

## 自定义组件的步骤

1. 首先需要在 json 文件中进行自定义组件声明（将 component 字段设 为 true 可这一组文件设为自定义组件）

2. 在 wxml 中编写属于我们组件自己的模板
3. 在 wxss 中编写属于我们组件自己的相关样式

4. 在 js 文件中, 可以定义数据或组件内部的相关逻辑

> <font color=red>注：</font>
>
> - 自定义组件也是可以引用自定义组件的，引用方法类似于页面引用自定义组件的方式（使用 usingComponents 字段）。
>
> - 自定义组件和页面所在项目根目录名 <font color=red>不能以“wx-”为前缀</font>，否则会报错。
>
> - 如果在 app.json 的 usingComponents 声明某个组件，那么所有页面和组件可以直接使用该组件。

## 组件样式的细节

**课题一：组件内的样式 对 外部样式 的影响**

- 结论一：组件内的 class 样式，只对组件 wxml 内的节点生效, 对于引用组件的 Page 页面不生效。

- 结论二：组件内不能使用 id 选择器、属性选择器、标签选择器

**课题二：外部样式 对 组件内样式 的影响**

- 结论一：外部使用 class 的样式，只对外部 wxml 的 class 生效，对组件内是不生效的

- 结论二：外部使用了 id 选择器、属性选择器不会对组件内产生影响

- 结论三：外部使用了标签选择器，会对组件内产生影响

**课题三：如何让 class 可以相互影响**

在<font color=red>自定义组件的 Component</font>对象中，可以传入一个 options 属性，其中 options 属性中有一个 styleIsolation（隔离）属性。(一般取值都是默认的隔离，很少会让其相互影响)

styleIsolation 有三个取值：

- isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（默认取值）；

- apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；

- shared 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置 了

# 组件通信

## 向组件传递数据

使用<font color=red>properties 属性</font>；

**支持的类型：**

<font color=red>String、Number、Boolean </font>

<font color=red>Object、Array、null（不限制类型）</font>

**默认值**：

可以通过<font color=red>value</font>设置默认值；

## 想组建传递样式

以使用<font color=red>externalClasses 属性</font>

1. 在 Component 对象中，定义 externalClasses 属性

2. 在组件内的 wxml 中使用 externalClasses 属性中的 class

3. 在页面中传入对应的 class，并且给这个 class 设置样式

```html
<!-- 页面 -->
<hello-world info="info" title="我与地坛" content="我爱地坛" />
<hello-world info="abc" title="我与天坛" content="我爱天坛" />
```

```css
/* 定义在页面的样式 */
.info {
  background-color: yellow;
}

.abc {
  font-size: 50rpx;
}
```

在组件中使用

```html
<!-- 组件 -->
<view class="hello info">
  <view class="title">{{title}}</view>
  <view class="content"> {{content}} </view>
</view>
```

```js
Component({
  options: {
    styleIsolation: "",
  },
  externalClasses: ["info"],

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "我是标题",
    },
    content: {
      type: String,
      value: "我是内容",
    },
  },
});
```

## 组件向外传递事件

使用<font color=red>自定义事件 triggerEvent</font>

```js
// 组件中
methods: {
    onTap() {
      console.log('我被点击了');
      this.triggerEvent('helloClick', '点击我了') // 第一个参数：事件名，第二个参数：向外传递的参数
    }
  }
```

```html
<!-- 页面中 -->
<hello-world
  info="info"
  title="我与地坛"
  content="我爱地坛"
  bind:helloClick="onHelloClick"
/>
```

```js
  onHelloClick(e) {
    console.log('我出发了', e);
  },
```

> 注：事件名大小写敏感

# 页面直接调用组件

可在父组件里调用 `this.selectComponent `，获取子组件的实例对象。

```html
<!-- 子组件 -->
<hello-world info="abc" title="我与天坛" content="我爱天坛" class="tabs" />

<button bind:tap="handleTap">点我获取实例</button>
```

```js
  handleTap() {
    const helloControl = this.selectComponent('.tabs')
    helloControl.test()
  },
```

> 调用时需要传入一个匹配选择器

# 插槽的使用

<font color=red>注：小程序中的插槽不支持默认值</font>

## 单个插槽

**实现插槽的默认值功能**

```html
<!-- 插槽 -->
<view class="my-slot">
  <view class="header">Header</view>
  <view class="content">
    <slot></slot>
  </view>
  <view class="default">哈哈哈哈哈哈哈</view>
  <view class="footer">Footer</view>
</view>
```

样式

```css
.default {
  display: none;
}

.content:empty + .default {
  display: block;
}
```

## 多个插槽

```html
<!--components/mul-slot/mul-slot.wxml-->
<view class="content">
  <view class="left">
    <slot name="left"></slot>
  </view>
  <view class="center">
    <slot name="center"></slot>
  </view>
  <view class="right">
    <slot name="right"></slot>
  </view>
</view>
```

```js
// components/mul-slot/mul-slot.js
Component({
  options: {
    multipleSlots: true,
  },
});
```

```html
<!-- 页面中使用 -->
<view>多插槽</view>
<mul-slot>
  <view slot="left">左边</view>
  <view slot="center">center</view>
  <view slot="right">右边</view>
</mul-slot>
```

> <font color=red>注意</font>：需要在定义多插槽的组件中使用`multipleSlots: true`

# 小程序的混入

**behaviors 是用于组件间代码共享的特性，类似于一些编程语言中的 “mixins”。**

> 我的理解：将公用方法抽离出来，其他地方可以直接使用

每个 behavior 可以包含一组属性、数据、生命周期函数和方法；

组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用；

每个组件可以引用多个 behavior ，behavior 也可以引用其它 behavior ；

案例：

behavior 文件

```js
// behaviors/counter.js
export const counter = Behavior({
  data: {
    count: 0,
  },
  methods: {
    increament() {
      this.setData({ count: this.data.count + 1 });
    },
    decreament() {
      this.setData({ count: this.data.count - 1 });
    },
  },
});
```

自定义组件：

```html
<!--components/c-behavior/c-behavior.wxml-->
<view>当前数量：{{count}} </view>
<button bind:tap="increament">+1</button>
<button bind:tap="decreament">-1</button>
```

```js
// components/c-behavior/c-behavior.js

import { counter } from "../../behaviors/counter";

Component({
  options: {
    multipleSlots: true,
  },
  behaviors: [counter],
});
```

页面：

```html
<!-- 应用-->
<c-behavior></c-behavior>
```
