---
title: mac brew切换源
tags: 加油站
abbrlink: a2ff30f1
date: 2024-02-23 17:14:34
---

Homebrew官方的源一般下载包之类的会很慢，所以通常我们都是用国内的镜像源来代替，这样会提高我们的效率。Homebrew主要有四个部分组成: brew、homebrew-core 、homebrew-bottles、homebrew-cask。

> 名称 说明
>
> brew Homebrew 源代码仓库
>
> homebrew-core Homebrew 核心软件仓库
>
> homebrew-bottles Homebrew 预编译二进制软件包
>
> homebrew-cask MacOS 客户端应用
>
> Homebrew国内镜像源目前主要有中科大镜像、阿里镜像、清华镜像。



# 前言

mac的终端是bash还是zsh？

在macOS中，终端默认使用的shell是bash。但是，一些用户可能已经将默认shell更改为zsh。你可以通过以下命令检查你的终端使用的是哪个shell：

```sh
echo $SHELL
```

如果输出是`/bin/bash`，那么你的终端使用的是bash。如果输出是`/bin/zsh`，那么你的终端使用的是zsh。



# 1、替换为中科大源

```sh
# 查看 brew.git 当前源
$ cd "$(brew --repo)" && git remote -v
origin    https://github.com/Homebrew/brew.git (fetch)
origin    https://github.com/Homebrew/brew.git (push)
 
# 查看 homebrew-core.git 当前源
$ cd "$(brew --repo homebrew/core)" && git remote -v
origin    https://github.com/Homebrew/homebrew-core.git (fetch)
origin    https://github.com/Homebrew/homebrew-core.git (push)
 
# 替换为中科大源
$ git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git
$ git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
$ git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git
 
# zsh 替换 brew bintray 镜像，Mac OS在10.15系统开始，默认的shell都换成了zsh
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zshrc
$ source ~/.zshrc
 
# bash 替换 brew bintray 镜像
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile
 
# 刷新源
$ brew update
```

# 2、重置为默认源

```sh
# 重置 brew.git 为官方源
$ git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git
 
# 重置 homebrew-core.git 为官方源
$ git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git
 
# 重置 homebrew-cask.git 为官方源
$ git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask
 
# zsh 注释掉 HOMEBREW_BOTTLE_DOMAIN 配置
$ vi ~/.zshrc
# export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
 
# bash 注释掉 HOMEBREW_BOTTLE_DOMAIN 配置
$ vi ~/.bash_profile
# export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
 
# 刷新源
$ brew update
```

# 查看brew版本

```shell
brew -v
```



# 安装软件

```sh
brew install 软件名
```



# 卸载软件

```sh
brew uninstall 软件名
```



# 查看安装的软件列表

```sh
brew list
```



# 更新 brew

```sh
brew update
```

