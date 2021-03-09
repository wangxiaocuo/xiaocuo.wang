---
title: MacBook 前端向配置和工具安装
date: 2020/03/03
tags:
  - mac
---

## 修改计算机名和主机名

- 计算机名：相当于这台电脑的昵称，随便起，比如 `某某人的MBP`
- 主机名：是这台电脑在局域网中的名字，可以简单理解为对外的一个名字，最好是英文。如 `wxc_mac`。

### 修改计算机名

```bash
sudo scutil --set ComputerName <名字>

# 例如
sudo scutil --set ComputerName 某某人的MBP
```

### 修改主机名

```bash
sudo scutil --set HostName <名字>

# 例如
sudo scutil --set HostName wxc_mac
```

## 安装最新的 Git 替代自带的 Git

mac 自带 git。但是自带的 git 版本不高，所以我选择手动安装最新的 git。

[官网下载](https://git-scm.com/)并安装

<!-- sudo ln -sf /usr/bin/git /usr/local/bin/git -->

## 安装最新的 Python 替代自带的 Python2

跟 git 一样，mac 有自带的旧版本 python。如果不安装 python3，开发过程中可能会遇到问题，特别是安装一些依赖的时候。

[官网下载](https://www.python.org/downloads/mac-osx/)并安装

## Oh My Zsh

[Oh My Zsh](https://ohmyz.sh/)：Mac 上最好用的终端环境。Mac 上默认的终端环境是 `bash`。

### 安装

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 更换主题

Oh My Zsh 可以内置了很多主题，你可以在 `~/.oh-my-zsh/themes` 路径下查看。如果想更换为内置主题，比如想把主题更换为 `tonotdo.zsh-theme` 这个主题，只需要修改 `~/.zshrc` 文件，找到 `ZSH_THEME="xxx"` 这一行（默认一般在第9行），然后把 `xxx` 改为 `tonotdo`。

> 注意：每次修改了 `~/.zshrc` 文件，都需要重新 `source` 一下以应用更新。

```bash
source ~/.zshrc
```

#### 第三方主题 —— Dracula 主题

[Dracula](https://draculatheme.com/zsh/) 是我最喜欢的 zsh 主题，优雅简洁好看。当然 Dracula 不光有 zsh 的主题，它能依托的平台非常多，感兴趣的可以去官网查看。

![dracula](./2020-03-03-my-macbook-init/dracula.jpg)

安装第三方主题的方式有两种：

- 方法一是直接把主题文件下载并拷贝到 `~/.oh-my-zsh/themes` 下，然后改 `~/.zshrc` 文件的主题配置。
- 方法二是把第三方主题文件下载到自定义的一个目录，然后通过软连接的方式去映射主题文件。


这里我选择第二种，官网的安装方法也是第二种。

首先在 `~` 目录下新建专门存储 Oh My Zsh 相关第三方内容的自定义文件夹，比如我的叫 `.wxc-zsh`

```bash
mkdir .wxc-zsh
```

这是一个隐藏文件夹，如果想在访达中查看，需要敲 `command + shift + .` 来显示所有文件。再按一次隐藏。

随后 `cd` 到 `.wxc-zsh`，在里面新建 `themes` 文件夹专门用于存放主题。然后把 Dracula 主题克隆到该文件夹

```bash
cd .wxc-zsh

mkdir themes

cd themes

git clone https://github.com/dracula/zsh.git dracula
```

随后通过软连接把 `~/.wxc-zsh/themes/dracula/dracula.zsh-theme` 映射到  `~/.oh-my-zsh/themes/dracula.zsh-theme` 下。

**注意：** 软连接命令连接的两个路径，不能是相对路径，必须是全路径。

比如我的 Mac 上命令这么敲：

```bash
 ln -s /Users/wxc/.wxc-zsh/themes/dracula/dracula.zsh-theme /Users/wxc/.oh-my-zsh/themes/dracula.zsh-theme
```

路径请自行修改

最后别忘了修改 `~/.zshrc` 文件的主题配置和 `source` 一哈

## iTerm2

[iterm2](https://iterm2.com/) 是 Mac 上非常好用的第三方终端工具之一

[官方下载](https://iterm2.com/)并安装

## NodeJs

[官网下载](https://nodejs.org/zh-cn/)并安装

## mirror-config-china

为中国内地的 Node.js 开发者准备的镜像配置，大大提高 node 模块安装速度。

```bash
# 安装
npm i -g mirror-config-china --registry=https://registry.npm.taobao.org
# 查看npm配置
npm config list
# 查看环境变量
source ~/.zshrc && env
```
