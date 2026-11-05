---
title: css小技巧
abbrlink: 1ca3000e
date: 2022-06-01 11:15:52
tags: web前端
---

# CSS 小技巧

## 1、添加高亮导致位置变化

问题：hover时候添加加边框效果，会出现原来内容移动情况 

> 可以在原来的内容上在一个 <font color="red">透明的边框</font> 占位子

## 2、圆环的做法

![圆环](https://chu-image-host.oss-cn-beijing.aliyuncs.com/img/%E5%9C%86%E7%8E%AF.png)

圆环：使用<font color="red">渐变</font> 

```css
li {
     width: 20px;
     height: 20px;
     border-radius: 50%;
     position: relative;
     background-image: radial-gradient(#f00 0px 6px, #fff 6px 9px, #f00 9px 12px);
   }
```

## 3、多行文本显示省略号

- 单行文本显示省略号

```css
	display: block;
	white-space: nowrap;    /*规定文本不换行**/
	overflow: hidden;
    text-overflow: ellipsis;  /**显示省略符号来代表被修剪的文本。*/
```

- 多行文本显示省略号

```css
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;   /** 多行文本溢出...，写2就代表第二行会显示省略号*/
	overflow: hidden; 
```
