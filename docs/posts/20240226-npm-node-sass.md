---
title: NPM 安装 node-sass 报错 gyp ERR!
date: 2024-02-27
outline: deep
tags:
  - 前端
  - NPM
---

# NPM 安装 node-sass 报错 gyp ERR!

最近启动一个老项目时，又双叒叕遇到了 `node-sass` 安装出错的问题，解决起来虽然很快，但是这个问题对于初次遇到的小伙伴来讲，却是个难题，借此正好整理下以前的笔记。

<!-- more -->

为什么每次安装 `node-sass` 时，撞大运似的，有时候报错，有时候不报错？这里面原因有那么点复杂，涉及到网络、Node 版本、Python 版本等，需要一一排查。

## 报错原因

安装 `node-sass` 报错时，报错信息一般会时一大串的 `gyp ERR!`，如下：

```bash
gyp ERR! build error
gyp ERR! stack Error: `make` failed with exit code: 2
gyp ERR! stack     ...
gyp ERR! stack     ...
gyp ERR! stack     ...
gyp ERR! stack     ...
gyp ERR! ...
```

原因是 `node-sass` 依赖于 `node-gyp` 来构建本机模块，而在安装 `node-gyp` 时可能会遇到各种错误。比如：

- 缺少构建工具
- Python 版本问题
- Node 版本问题
- 网络问题
- 等

在不确定具体是什么原因导致时，只能选择一一排查。下面讲讲解决方案。

## 一劳永逸的方案：弃用 `node-sass`，使用 `dart-sass`

::: tip 提示
`node-sass` 已经停止维护了，推荐迁移到 `dart-sass` 以确保获得最新的功能和安全更新。如果你的项目可以弃用掉 `node-sass`，使用 `dart-sass` 的话。那后面的解决方案就全都不用看了。珍爱生命，远离 `node-sass`。如果你的项目不能升级，请跳过此步骤。
:::

`node-sass` 和 `dart-sass` 是 Sass 预处理器的两个不同的实现，它们在实现方式和使用方式上有一些区别：

1. **底层实现语言：**

   - **node-sass:** 使用 C++ 和 Node.js Addon API 编写的，底层依赖于 LibSass。
   - **dart-sass:** 使用 Dart 编写，是 Sass 的官方实现。

2. **性能和速度：**

   - **node-sass:** 由于使用 C++ 编写，通常被认为比 `dart-sass` 更快。
   - **dart-sass:** 使用 Dart 语言编写，可能在某些情况下稍慢于 `node-sass`，但它有其优势，例如更好的跨平台性能和维护性。

3. **版本更新：**

   - **node-sass:** 目前已经停止维护，官方建议迁移到 `dart-sass`。
   - **dart-sass:** 是 Sass 的官方实现，因此更有可能获得长期支持和更新。

4. **语法支持：**

   - **node-sass:** 支持较旧的 Sass 语法，以及 SCSS（Sassy CSS）语法。
   - **dart-sass:** 更严格地按照最新的 Sass 和 SCSS 规范进行实现，支持最新的语法和功能。

5. **NPM 包名称：**

   - **node-sass:** 安装时使用 `npm install node-sass`。
   - **dart-sass:** 安装时使用 `npm install sass`。

### 语法和功能调整

在 `node-sass` 迁移到 `dart-sass` 时，需要调整部分语法和功能。因为两者在语法和功能上存在一些差异。建议查看 `dart-sass` 的[官方文档](https://sass-lang.com/dart-sass/)，以获取详细的语法和功能信息。需要考虑调整以下内容：

1. **函数调用：**

   - **node-sass:** 使用 `unquote()` 函数来移除引号，如 `unquote("some-string")`。
   - **dart-sass:** 使用 `str-slice()` 函数来进行类似的操作，如 `str-slice("some-string", 1, -1)`。

2. **变量默认值：**

   - **node-sass:** 使用 `$variable: value !default;` 来定义具有默认值的变量。
   - **dart-sass:** 使用 `$variable: value` 来定义具有默认值的变量，不再需要 `!default` 关键字。

3. **颜色操作：**

   - **node-sass:** 颜色操作可以使用 `lighten()`、`darken()`、`saturate()`、`desaturate()` 等函数。
   - **dart-sass:** 保持相似的颜色操作，不过一些函数可能有不同的名称，如 `saturation()` 替代 `saturate()`。

4. **继承和占位符选择器：**

   - **node-sass:** 使用 `@extend` 来进行选择器继承。
   - **dart-sass:** 仍然支持 `@extend`，但官方更推荐使用占位符选择器（placeholder selectors）来实现继承，如 `%placeholder { ... }`。

5. **模块导入功能：**

   - **node-sass:** 可以使用 `@import "file";` 来全局导入文件。
   - **dart-sass:** 仍然支持 `@import "file";`，但 `v2.x` 更推荐使用 `@use` 代替 `@import`，以更好地支持模块化。

   ```scss
   // @import 使用
   // _variables.scss
   $primary-color: #3498db;

   // main.scss
   @import 'variables';
   body {
     background-color: $primary-color;
   }
   ```

   ```scss
   // @use 使用
   // _variables.scss
   $primary-color: #3498db;

   // main.scss
   @use 'variables';
   body {
     background-color: variables.$primary-color;
   }
   ```

6. 除法符号

   - **node-sass:** 可以使用 `/` 实现除法。
   - **dart-sass:** `v1.x` 仍然支持 `/`，但 `v2.x` 需要修改成 `math.div();`

   ```scss
   // 除法符号 /
   $width: 1000px;
   $columns: 3;

   // 在 Dart Sass v2.x 中，以下操作将产生错误
   // 报错信息：WARNING: Using / for division outside of calc() is deprecated and will be removed in Dart Sass 2.0.0.
   .container {
     width: $width / $columns;
   }
   ```

   ```scss
   // math.div() 函数
   $width: 1000px;
   $columns: 3;

   .container {
     width: math.div($width, $columns);
   }
   ```

### NPM 脚本调整

如果 `package.json` 中，`npm scripts` 使用了 `node-sass` 命令，需要更改为 `sass`：

- 修改前

  ```json
  "scripts": {
  "build-css": "node-sass input.scss output.css"
  }
  ```

- 修改后

  ```json
  "scripts": {
  "build-css": "sass input.scss output.css"
  }
  ```

### Vue2.x 项目，深度作用选择器写法调整

Vue2 项目中，[深度作用选择器](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8)有三种写法：`>>>`、`/deep/` 和 `::v-deep`。

在升级到 `dart-sass` 后，`>>>` 和 `/deep/` 需要统一改为 `::v-deep`，否则可能不起作用。

## 其他方案

::: tip 提示
以下方案挨个尝试，直到解决问题。如果依旧不能解决，还是换 `dart-sass` 吧 😅。
:::

### 检查 Node.js 版本

Node.js 和 `node-sass` 有其严格的版本对应关系，因为本质上来讲，`node-sass` 是一个 Node.js 模块。

以下是 node-sass 支持的最低和最高版本的快速指南：

| NodeJS  | Supported node-sass version | Node Module |
| ------- | --------------------------- | ----------- |
| Node 20 | 9.0+                        | 115         |
| Node 19 | 8.0+                        | 111         |
| Node 18 | 8.0+                        | 108         |
| Node 17 | 7.0+, <8.0                  | 102         |
| Node 16 | 6.0+                        | 93          |
| Node 15 | 5.0+, <7.0                  | 88          |
| Node 14 | 4.14+, <9.0                 | 83          |
| Node 13 | 4.13+, <5.0                 | 79          |
| Node 12 | 4.12+, <8.0                 | 72          |
| Node 11 | 4.10+, <5.0                 | 67          |
| Node 10 | 4.9+, <6.0                  | 64          |
| Node 8  | 4.5.3+, <5.0                | 57          |
| Node <8 | <5.0                        | <57         |

如果你安装的 Node.js 的版本与项目中 `node-sass` 的版本不匹配，请选择重新安装 Node.js，或使用 [NVM](https://github.com/nvm-sh/nvm) 或 [`n` 模块](https://www.npmjs.com/package/n)管理 Node.js 版本。

### 检查 Python 环境

`node-gyp` 通常需要 Python 2.x 版本，而不是 Python 3.x。确保您的系统上安装了 Python 2.x，并且在 PATH 中设置了正确的 Python 环境变量。

```bash
# 检查 Python 版本
python --version
```

如果没有安装或者版本不是 2.x，可以选择从 Python 官网下载并安装，也可以选择安装 [Anaconda](https://www.anaconda.com/) 去管理 Python 环境。

### 检查 C++ 环境

`node-gyp` 需要一些构建工具来编译本机模块，这可能包括 C++ 编译器和其他构建依赖项。如果以前从来没有安装过相关环境，可以安装后重试。

- Windows 系统
  需要下载 [Microsoft C++ 生成工具](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)，也叫 Windows 构建工具。

- Linux 系统
  需要安装 `build-essential` 包。

  ```bash
  sudo apt-get install build-essential
  ```

- MacOS 系统
  需要安装 Xcode 命令行工具。
  ```bash
  xcode-select --install
  ```

### 检查网络环境

- 如果能科学上网，科学上网后重试。
- 如果不能，在安装 [mirror-config-china](https://www.npmjs.com/package/mirror-config-china) 后重试。
  ```bash
  npm install -g mirror-config-china
  ```

### 万金油办法：淘宝镜像、yarn、cnpm

- 使用淘宝镜像

  ```bash
    # 直接更改源
    npm config set registry https://registry.npm.taobao.org/

    # 更推荐用这种方式
    npm install node-sass --registry=https://registry.npm.taobao.org
  ```

- 使用 yarn 安装依赖

  ```bash
  # 安装 yarn
  npm i yarn -g

  # 在项目目录
  yarn
  ```

- 使用 cnpm 安装依赖

  ```bash
  # 安装 cnpm
  npm i cnpm -g

  # 在项目目录
  cnpm i
  ```
