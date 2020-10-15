---
title: 前端工作者的 vscode 插件列表、设置清单和代码片段
date: 2018/04/14 21:23:56
tags:
  - 前端
  - 代码编辑器
---

整理记录了一些我在前端工作中所用到的插件，以及配置清单、和代码片段的配置方式。

<!-- more -->

## 插件

| 插件名称 | 功能描述 |
| :--- | :--- |
| Auto Close Tag | 自动添加 HTML / XML 闭合标签 |
| Auto Rename Tag | 自动重命名配对的 HTML / XML 标签 |
| Beautify | 格式化 html、js、json、css、scss 等文件 |
| Bracket Pair Colorizer | 每一对括号都是一种颜色 |
| Chinese (Simplified) Language Pack for Visual Studio Code | 中文（简体）语言包扩展 |
| Code Runner | 直接运行多种语言的代码片段或代码文件 |
| Code Spell Checker | 单词拼写检查工具 |
| Color Highlight | 颜色高亮显示 |
| Color Info | 弹出的提示框中显示各种 css 颜色信息 |
| cssrem | css 中像素值转换为 rem 值 |
| Dart | Dart 语言的扩展支持（针对 Flutter 开发） |
| EditorConfig for VS Code | 快速初始化 `.editorconfig` 文件 |
| EJS language support | EJS 模板语法扩展支持 |
| Emoji | 一个简单的插件，可以从命令面板中插入表情符号 |
| ESlint | 代码风格检查工具 |
| Flutter | flutter 开发支持 |
| Git History | 可以便捷地查看当前行的 git 提交信息 |
| Go | Go 编程语言的扩展支持 |
| indent-rainbow | 缩进可视化，使缩进更容易阅读 |
| Indenticator | 高亮显示当前的缩进深度 |
| IntelliSense for CSS class names in HTML | HTML 中 CSS 类名自动提示 |
| JavaScript (ES6) code snippets | ES6 代码片段提示 |
| JSON Tools | JSON 格式化和压缩 |
| Less IntelliSense | JSON 格式化和压缩 |
| Lodash | Lodash 代码片段提示 |
| Markdown Preview Enhanced | markdown 预览工具 |
| npm Intellisense | 引入依赖或者本地文件时，自动提示 |
| Path Intellisense | 输入文件路径时，自动提示 |
| Prettier - Code formatter | 优秀的代码格式化工具 |
| stylus | stylus 语法支持 |
| SVG | SVG 工具，支持对 SVG 代码的压缩、美化等，以及 SVG 的预览 |
| TODO Highlight | 在代码中高亮显示 TODO，FIXME 和其他注释 |
| Vetur | 目前最优秀的 Vue 支持工具 |
| vscode-icons | 文件图标 |

## vscode 配置文件

```js
{
  "workbench.iconTheme": "vscode-icons", // 文件图标主题设置
  "editor.fontLigatures": true, // 启用字体连字
  "editor.formatOnSave": false, // 保存时格式化
  "editor.minimap.enabled": true, // 显示缩略图
  "editor.renderIndentGuides": false, // 显示缩进参考线
  "editor.fontSize": 14, // 编辑区域字体大小
  "terminal.integrated.fontSize": 14, // 终端字体大小
  "editor.lineHeight": 28, // 行高
  "editor.tabSize": 2, // 一个制表符（缩进）为两个空格
  "editor.lineNumbers": "on", // 显示绝对行数
  "editor.rulers": [
    // 在120个字符的位置显示标尺
    120
  ],
  "editor.wordWrap": "on", // 控制本文在可视区域处换行
  "editor.codeActionsOnSave": {
    // 来自所有插件的所有可自动修复的ESLint错误都将在保存时修复
    "source.fixAll.eslint": true
  },
  "extensions.ignoreRecommendations": true, // 不显示扩展建议通知
  /* ==================== 搜索 配置 ==================== */
  "search.exclude": {
    // 全局搜索时不包含
    "**/.vscode": false,
    "**/node_modules": true,
    "**/dist": true,
    "**/bower_components": true,
    "**/build": true,
    "**/.git": true,
    "**/.gitignore": true,
    "**/.svn": true,
    "**/.DS_Store": true,
    "**/.idea": true,
    "**/yarn.lock": true
  },
  /* ==================== 文件相关 配置 ==================== */
  "files.trimTrailingWhitespace": true, // 文件保存时删除每一行末尾多余的空格
  "files.insertFinalNewline": true, // 文件保存时在文件末尾插入一个新行
  "files.trimFinalNewlines": true, // 保存时，删除最终新行后的所有空行
  "files.associations": {
    // 配置语言的文件关联
    "*.vue": "vue",
    "*.wxml": "html",
    "*.wxss": "css",
    "*.cjson": "jsonc",
    "*.wxs": "javascript"
  },
  /* ==================== emmet 配置 ==================== */
  "emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html"
  },
  "emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html",
    "javascript": "javascriptreact",
    "wxml": "html"
  },
  /* ==================== prettier 配置 ==================== */
  "prettier.semi": false,
  "prettier.singleQuote": true,
  /* ==================== cssrem 配置 ==================== */
  "cssrem.rootFontSize": 100,
  /* ==================== 格式化规则 配置 ==================== */
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 文件换行符为 LF
  "files.eol": "\n",
  // 因为安装了 Color Highlight，禁用掉自带的颜色修饰器
  "editor.colorDecorators": false,
  "window.zoomLevel": 0,
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "michelemelluso.code-beautifier"
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  // 去除修饰器警告
  "javascript.implicitProjectConfig.experimentalDecorators": true,
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "go.useLanguageServer": true
}
```

关于自动保存格式化，考虑到不同的项目，格式化的风格不一致，所以格式化的配置（主要是 prettier 的配置）并没有写死到配置文件中。建议在每个项目的根目录下新建 `.prettierrc` 文件，定义自己的格式化风格。

以下是我常用的配置，仅供参考：

```js
// .prettierrc
{
  "endOfLine": "auto",
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "jsxBracketSameLine": true,
  "arrowParens": "avoid",
  "overrides": [
    {
      "files": ".prettierrc",
      "options": { "parser": "json" }
    }
  ]
}
```

## 自定义代码片段

代码片段，是一段预设好的代码，只需要通过简短的命令，就可以生成一大段代码。通过代码片段，我们可以把一些大段的又老记不住的代码预设好。

比如 html 的初始化代码。那些 `meta` 的配置我一般都记不住，所以最好用代码片段预设好。

### 配置方式

按 `F1` 或者 `ctrl + shift + p` （windows）、`command + shift + p` （mac）打开命令面板。输入 `片段` 或 `Snippet` 即可找到配置入口。

![snippets-1](./images/2018-04-14-vscode-settings/snippets-1.png)

回车然后选择需要配置的语言进行配置。

![snippets-2](./images/2018-04-14-vscode-settings/snippets-2.png)

配置的语法请参考官方文档：[Creating your own snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

下面我贴出我的配置项，仅供参考。

### Html

```js
{
  "Init PC html": {
    // 初始化PC项目文件
    "prefix": "init-pc",
    "body": [
      "<!DOCTYPE html>",
      "<html lang=\"${1:zh-cmn-Hans}\">",
      "<head>",
        "\t<meta charset=\"UTF-8\">",
        "\t<meta name=\"viewport\" content=\"width=${2:device-width}, initial-scale=${3:1.0}\">",
        "\t<meta http-equiv=\"X-UA-Compatible\" content=\"${4:ie=edge}\">",
        "\t<title>${5:标题}</title>",
      "</head>",
      "<body>",
        "$6",
      "</body>",
      "</html>"
    ],
    "description": "Init PC html"
  },
  "Init mobile html": {
    // 初始化移动端项目文件
    "prefix": "init-mobile",
    "body": [
      "<!DOCTYPE html>",
      "<html lang=\"${1:zh-cmn-Hans}\">",
      "<head>",
        "\t<meta charset=\"UTF-8\">",
        "\t<meta name=\"viewport\" content=\"width=${2:device-width}, initial-scale=${3:1.0}, user-scalable=${4:no}, minimum-scale=${5:1.0}, maximum-scale=${6:1.0}\">",
        "\t<meta http-equiv=\"X-UA-Compatible\" content=\"${7:ie=edge}\">",
        "\t<title>${8:标题}</title>",
      "</head>",
      "<body>",
        "$9",
      "</body>",
      "</html>"
    ],
    "description": "Init mobile html"
  }
}
```

### Vue

```js
{
  "Init vue file": {
    // 文件初始化
    "prefix": "init-vue",
    "body": [
      "<template>",
        "\t<div class=\"${1:${TM_FILENAME_BASE}}\">$3",
        "\t</div>",
      "</template>\n",
      "<script>",
      "export default {",
        "\tname: '$1',",
        "\tprops: [],",
        "\tcomponents: {},",
        "\tdata () {",
          "\t\treturn {}",
        "\t},",
        "\tbeforeRouteEnter (to, from, next) {",
          "\t\tnext(vm => vm.init())",
        "\t},",
        "\tmounted () {",
          "\t\tthis.\\$nextTick(() => this.init())",
        "\t},",
        "\tcomputed: {},",
        "\tfilters: {},",
        "\twatch: {",
          "\t\texample (val, oldVal) {",
          "\t\t}",
        "\t},",
        "\tmethods: {",
          "\t\tinit () {}",
        "\t}",
      "}",
      "</script>\n",
      "<style scoped lang=\"${2:scss}\">",
      ".$1 {}",
      "</style>"
    ],
    "description": "Log output to console"
  },
  "Print to console": {
    "prefix": "log",
    "body": ["console.log('$1')$2"],
    "description": "Log output to console"
  }
}
```
