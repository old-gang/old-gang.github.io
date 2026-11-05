---
title: react实现插槽功能
tags: web前端
abbrlink: 931b2a12
date: 2023-05-02 17:11:21
---

# react实现插槽功能

## 前言

在开发中，我们抽取了一个组件，但是为了让这个组件具备更强的通用性，我们不能将组件中的内容限制为固定的div、span等等这些元素。我们应该让使用者可以决定某一块区域到底存放什么内容。

这种需求在Vue当中有一个固定的做法是通过slot来完成的，React呢？

React对于这种需要插槽的情况非常灵活，有两种方案可以实现：

- 组件的`children`子元素；
- `props`属性传递React元素；

## children实现插槽

每个组件都可以获取到 props.children：它包含组件的开始标签和结束标签之间的内容。

## 注意

- 如果组件组件的开始标签和结束标签之间的内容有多个，此时通过`this.props.children`获取到的是一个数组；
- 如果组件组件的开始标签和结束标签之间的内容只有一个，此时通过`this.props.children`获取到的就是内容本身；

## 示例

```tsx
import React, { Component } from "react";
import "./style.css"; // 注意，这种方式写的样式，是全局的样式，会造成冲突

export default class NavBar extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="nav-bar">
        <div className="left">{children[0]}</div>
        <div className="center">{children[1]}</div>
        <div className="right">{children[2]}</div>
      </div>
    );
  }
}
```

```tsx
import React, { Component } from "react";
import NavBar from "./NavBar";
export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar>
          <button>我是按钮</button>
          <h2>我是标题</h2>
          <span>span</span>
        </NavBar>
      </div>
    );
  }
}
```

最终效果：

![image-20230502173349472](https://chu-image-host.oss-cn-beijing.aliyuncs.com/img/image-20230502173349472.png)

## 拓展

> 问题描述：我只想让别人传入一个元素，该如何限制？

解决方法：

```tsx
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

class NavBar extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="nav-bar">
        <div className="left">{children[0]}</div>
        <div className="center">{children[1]}</div>
        <div className="right">{children[2]}</div>
      </div>
    );
  }
}

NavBar.propTypes = {
  children: PropTypes.element, // 限制一个
  children: PropTypes.array, // 限制多个
};

export default NavBar;
```

## 弊端

通过`children`这种方法，需要记住传入元素的索引值，否则会出现意料之外的错误

# 使用props实现插槽

## 实例

```tsx
import React, { Component } from "react";

class NavBar extends Component {
  render() {
    const { leftSlot, centerSlot, rightSlot } = this.props;
    return (
      <div className="nav-bar">
        <div className="left">{leftSlot}</div>
        <div className="center">{centerSlot}</div>
        <div className="right">{rightSlot}</div>
      </div>
    );
  }
}
export default NavBar;
```

```tsx
import React, { Component } from "react";
import NavBar2 from "./NavBar2";
export default class App extends Component {
  render() {
    const btn = <button>我是按钮2</button>;
    return (
      <div>
        {/* 通过props的方式实现插槽 */}
        <NavBar2
          leftSlot={btn}
          centerSlot={<h2>我是标题2</h2>}
          rightSlot={<span>span2</span>}
        />
      </div>
    );
  }
}
```
