---
title: 前端导出Excel
tags: web前端
abbrlink: e6cdea91
date: 2023-04-04 22:32:38
---

# 前端导出 Excel

## 前言

​	  导出功能其实在开发过程中是很常见的,平时我们做导出功能的时候基本都是后台生成，我们直接只需要调一支接口后台把生成的文件放到服务器或者数据库mongodb中,如果是放到mongodb中的话,我们需要从mongodb中通过唯一生成的id去拿到文件,最后window.location.href就完事了。如果是放到服务器上,直接从服务器上下载就好了。下面我们使用另一种 H5 的新特性blob对象来实现一下导出功能。

## 什么是 Blob

[Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/Blob)

Blob() 构造函数返回一个新的 Blob 对象。blob 的内容由参数数组中给出的值的串联组成。

`const blob = new Blob( array, options );`

## 常见的MIME type（媒体类型）

在 Blob 的构造函数中options参数的接受一个参数type,这个参数代表的是媒体类型,告诉浏览器是什么类型的文件,常见的有

```js
{".3gp",    "video/3gpp"},
{".apk",    "application/vnd.android.package-archive"},
{".asf",    "video/x-ms-asf"},
{".avi",    "video/x-msvideo"},
{".bin",    "application/octet-stream"},
{".bmp",    "image/bmp"},
{".c",  "text/plain"},
{".class",  "application/octet-stream"},
{".conf",   "text/plain"},
{".cpp",    "text/plain"},
{".doc",    "application/msword"},
{".docx",   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
{".xls",    "application/vnd.ms-excel"},
{".xlsx",   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
{".exe",    "application/octet-stream"},
{".gif",    "image/gif"},
{".gtar",   "application/x-gtar"},
{".gz", "application/x-gzip"},
{".h",  "text/plain"},
{".htm",    "text/html"},
{".html",   "text/html"},
{".jar",    "application/java-archive"},
{".java",   "text/plain"},
{".jpeg",   "image/jpeg"},
{".jpg",    "image/jpeg"},
{".js", "application/x-javascript"},
{".log",    "text/plain"},
{".m3u",    "audio/x-mpegurl"},
{".m4a",    "audio/mp4a-latm"},
{".m4b",    "audio/mp4a-latm"},
{".m4p",    "audio/mp4a-latm"},
{".m4u",    "video/vnd.mpegurl"},
{".m4v",    "video/x-m4v"},
{".mov",    "video/quicktime"},
{".mp2",    "audio/x-mpeg"},
{".mp3",    "audio/x-mpeg"},
{".mp4",    "video/mp4"},
{".mpc",    "application/vnd.mpohun.certificate"},
{".mpe",    "video/mpeg"},
{".mpeg",   "video/mpeg"},
{".mpg",    "video/mpeg"},
{".mpg4",   "video/mp4"},
{".mpga",   "audio/mpeg"},
{".msg",    "application/vnd.ms-outlook"},
{".ogg",    "audio/ogg"},
{".pdf",    "application/pdf"},
{".png",    "image/png"},
{".pps",    "application/vnd.ms-powerpoint"},
{".ppt",    "application/vnd.ms-powerpoint"},
{".pptx",   "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
{".prop",   "text/plain"},
{".rc", "text/plain"},
{".rmvb",   "audio/x-pn-realaudio"},
{".rtf",    "application/rtf"},
{".sh", "text/plain"},
{".tar",    "application/x-tar"},
{".tgz",    "application/x-compressed"},
{".txt",    "text/plain"},
{".wav",    "audio/x-wav"},
{".wma",    "audio/x-ms-wma"},
{".wmv",    "audio/x-ms-wmv"},
{".wps",    "application/vnd.ms-works"},
{".xml",    "text/plain"},
{".z",  "application/x-compress"},
{".zip",    "application/x-zip-compressed"},
{"",        "*/*"}

```

## 导出

我们需要调取接口来获取导出文件的内容,如果我们先后端分离的话，我们需要接口给我们返回Buffer, Blob, DOMString类型的数据,DOMStrings会被编码为UTF-8。

### 1、步骤

创建blob实例对象，使用a标签,模拟点击a标签完成导出功能,通过[URL.createObjectURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL)方法创建一个下载的链接地址,最后在不需要的时候[URL.revokeObjectURL](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL)释放掉

### 2、封装下载文件的函数

```js
/**
 * 下载文件
 * @param res 接口响应 response
 * @param fileName 文件名称
 * @param suffix 文件后缀名
 */
const downloadFile = (res: { data: BlobPart }, fileName = '', suffix = 'xls') => {
  const link = document.createElement('a');
  const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
  const herf = window.URL.createObjectURL(blob); // 创建下载的链接
  link.setAttribute('href', herf);
  link.setAttribute('download', `${fileName}.${suffix}`); // 下载后文件名
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); //下载完成移除元素
  window.URL.revokeObjectURL(herf); //释放掉blob对象
};
```

### 3、完整代码

```vue
<template>
  <el-button type="primary" :loading="downloadLoading" @click="downloadTable">导出</el-button>
</template>
<script setup lang="ts">
  import { downloadFile } from "@/utils";
  const downloadLoading = ref(false);
  const downloadTable = async () => {
    // 如果没有数据，可以给个提示
    downloadLoading.value = true;
    try {
      let res = await http.post("url", params, { responseType: "blob" }); // 注意要添加responseType
      if (res.status === 200) {
        downloadFile(res, `导出后的名称`);
        setTimeout(() => (downloadLoading.value = false), 3000); // 防止用户重复点击
      }
    } catch (error) {
      downloadLoading.value = false;
    }
  };
</script>
```

## 写在最后

此方法适用于<font color='red'>**服务端返回文件流**</font>的形式，并在返回头中带上Content-Type:application/octet-stream
