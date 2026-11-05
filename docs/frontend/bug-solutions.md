---
title: bug的解决
tags: 工作中遇到的bug
abbrlink: 68eafc88
date: 2023-01-28 17:12:03
---

# bug 的解决

### 对话框清空表单信息和表单校验：

bug的描述：新增和修改公用同一个dialog，先点击修改，再点击新增，此时所有的表单检验项都会飘红

解决方法：
  打开对话框时清空表单的信息，使用nextTick清空表单的校验信息(调用表单实例的resetFields方法)
  注意：<font color="red">修改时使用nextTick给表单赋值</font>，否则会影响resetFields方法的调用！！！



### 表单校验失败，跳转到第一个错误的地方

bug的描述：ui组件库的表单校验失败，跳转到第一个错误的地方的功能不符合开发需求，需要自己手动写一个方法；

代码：(适用于element-ui/plus)

```js
  const scrollView = () => {
    // 校验失败的数据会有一个'is-error'的类
    let dom = document.getElementsByClassName('is-error')[0];
    dom.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
    return;
  };
```



### UI组件库固定表头

背景描述：表格内容太长，表头的内容不方便查看

> 在el-table上 添加 `height`属性即可

注：使用`table-layout="auto"` 会导致固定表头的效果失效

解决方案：(在<font color='red'>**公用的样式**</font>里添加，所有的表格都会生效)

```css
.el-table {
  overflow: hidden;
  width: 100%;
}
.el-table thead {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  table-layout: fixed;
  z-index: 10;
}
```



### 控制台报错

![image-20230118134158527](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/image-20230118134158527.png)

bug描述：代码没问题，控制台报错

解决方案：更新一下浏览器试试:joy:
