---
title: 用shell脚本简化web项目发版链路
date: 2021/02/06
tags:
  - 发版
  - shell
---

## 前言

前端 web 项目部署分为几步？

<!-- more -->

对于不懂 linux 或者 jenkins 的前端来说，分为两步：

1. 准备部署文件
2. 压缩后发给后端

我稍微懂 linux 操作，但是 jenkins 还没研究透彻，所以在想有没有什么方案可以稍微降低发版的成本。

以前我一般采用两种方式，一种是上面的小白方式，另一种直接在服务器用 git 拉代码，然后编译打包。nginx 配置中把路径映射到 dist 目录。

第二种方式有以下缺点：

- `.git` 目录会暴露在静态资源路径里，如果不在 nginx 配置中做相关安全防护，不安全
- 在服务器端进行 `npm run build` 操作，占用了服务器资源，如果有 npm 依赖需要更新，安装比较麻烦。特别是 `node-sass` 的安装，有时候遇到了倔强的服务器环境，难度是地狱级的

有一天我灵机一动，参考部署在 github pages 上的博客的部署方式，想到了 `shell` 脚本应该可以简化发版链路。

理论可行，实践开始。

## 实践

### 准备工作

假设 gitlab 上有一个 SPA 的前端项目，叫做 `oa-admin-web` ，首先我需要再在该 gitlab 上建一个项目叫做 `oa-admin-web-dist`

> 注意：如果是不需要编译打包 dist 目录的传统 web 项目，该发版方式思路可以用，但是脚本就需要稍微调整了。相信如果你能理解我下面的思路，修改基本也很简单。

### 本地发版脚本

首先在 `oa-admin-web` 项目根目录下新建脚本文件。根据环境不同，脚本文件命名也不同。假设有 `dev`、`uat`、`生产` 三个环境，则新建以下三个脚本文件：

- `deploy.dev.sh`
- `deploy.uat.sh`
- `deploy.prod.sh`

现在从 `dev` 环境开始思考脚本该怎么写。

步骤设想如下

- 最顶部肯定是打包当前项目到 `dist` 目录
- 其次我需要写一个在服务器端用于拉取对应环境最新代码的的脚本放在 `dist` 目录
- 拉取完为了安全考虑，得把服务器上的 `.git` 给删掉
- 然后需要用 git 把 `dist` 目录给管理起来
- 最后关联远程 `oa-admin-web-dist` 仓库，把本地 `dist` 给提交远程

下面是 `deploy.dev.sh` 的内容

```shell
# deploy.dev.sh
# 分支名
branch="dev"
# 部署的仓库地址（http）
http_repository="http://xxx/oa-admin-web-dist.git"
# 部署的仓库地址（ssh）
ssh_repository="ssh://gitxxx/oa-admin-web-dist.git"
# 打包当前项目
npm run build
# 进入 dist 目录
cd dist
# 在 dist 目录创建 pull.sh，并写入一系列用于拉代码的脚本
echo "git init" > pull.sh
echo "git add ." >> pull.sh
echo "git commit -m \"初始化\"" >> pull.sh
# 这里需要用 oa-admin-web-dist.git 仓库的 http/https 路径，在服务器端拉代码不用 ssh 形式
echo "git remote add origin ${http_repository}" >> pull.sh
echo "git fetch" >> pull.sh
echo "git checkout ${branch}" >> pull.sh
echo "git reset --hard origin/${branch}" >> pull.sh
echo "rm -rf .git" >> pull.sh
# 初始化 git
git init
git add .
# 当前时间
time=$(date "+%Y-%m-%d %H:%M:%S")
# 提交人
username=$(git config user.name)
git commit -m "${username} 在 ${time} 发版"
git checkout -b ${branch}
git remote add origin ${ssh_repository}
# 强制覆盖远程分支代码
git push -u --force origin ${branch}
```

`uat` 环境的脚本与 `dev` 环境除了分支名其余没有差别。

`prod` 环境稍微有点差别，写入 `dist` 的 `pull.sh` 脚本中不需要 `git checkout master`，因为初始化仓库时，默认就在 `master` 分支

```shell
# deploy.prod.sh
# 分支名
branch="master"
# 部署的仓库地址（http）
http_repository="http://xxx/oa-admin-web-dist.git"
# 部署的仓库地址（ssh）
ssh_repository="ssh://gitxxx/oa-admin-web-dist.git"
# 打包当前项目
npm run build
# 进入 dist 目录
cd dist
# 在 dist 目录创建 pull.sh，并写入一系列用于拉代码的脚本
echo "git init" > pull.sh
echo "git add ." >> pull.sh
echo "git commit -m \"初始化\"" >> pull.sh
# 这里需要用 oa-admin-web-dist.git 仓库的 http/https 路径，在服务器端拉代码不用 ssh 形式
echo "git remote add origin ${http_repository}" >> pull.sh
echo "git fetch" >> pull.sh
echo "git checkout ${branch}" >> pull.sh
echo "git reset --hard origin/${branch}" >> pull.sh
echo "rm -rf .git" >> pull.sh
# 初始化 git
git init
git add .
# 当前时间
time=$(date "+%Y-%m-%d %H:%M:%S")
# 提交人
username=$(git config user.name)
git commit -m "${username} 在 ${time} 发版"
git remote add origin ${ssh_repository}
# 强制覆盖远程分支代码
git push -u --force origin ${branch}
```

### 本地发版

只需要终端 cd 到项目根目录，敲 `sh <发版脚本文件名>`。比如我要发个 `uat` 环境，则敲 `sh deploy.uat.sh` 。

> 注意：windows 电脑的 cmd 终端不能用 sh 命令，需要用 powershell 或 git bash

### 服务器端拉取最新代码

上面发版的脚本会在 `dist` 目录下创建一个 `pull.sh`。内容如下：

```shell
git init
git add .
git commit -m "初始化"
git remote add origin http://xxx/oa-admin-web-dist.git
git fetch
git checkout uat
git reset --hard origin/uat
rm -rf .git
```

以上一系列命令的作用是：

- 初始化仓库
- 关联远程 `dist` 仓库
- `fetch` 最新代码
- 当前代码指向最新的分支代码（不同分支是发版的脚本预设好的）

当然第一次在服务端是从 0 到 1 的过程，所需要初始化一下。

假设我的项目都部署在服务器的 `/data/www/` 下，那么我先在该路径创建 `oa-admin-web-dist` 文件夹，然后手动执行一下 `pull.sh`的所有命令。

### 发版链路

以上工作做完之后，以后的发版的链路就很简单了。假设需要发版生产环境：

- 前端 er 敲命令 `sh deploy.prod.sh`
- 后端 er 或者懂 linux 的前端 er 到对应的服务器项目路径，敲 `pull.sh`

## 总结

虽然比起继承了 jenkins 的自动化部署，显得很 low，但是应付一些小项目或者频繁发版的项目，还是很实用的。
