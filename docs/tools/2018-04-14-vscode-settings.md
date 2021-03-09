---
title: VSCode 插件和配置文件
date: 2018/04/14
tags:
  - 前端
  - 代码编辑器
---

## 常用插件

| 插件名称 | 功能描述 |
| :--- | :--- |
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

## 配置文件 settings.json

```js
// vscode 版本：1.54.1
{
  "workbench.colorTheme": "Atom One Dark",
  "workbench.iconTheme": "vscode-icons", // 文件图标主题设置
  "editor.fontLigatures": true, // 启用字体连字
  "editor.formatOnSave": false, // 保存时格式化
  "editor.minimap.enabled": true, // 显示缩略图
  "editor.renderIndentGuides": false, // 显示缩进参考线
  "editor.fontSize": 14, // 编辑区域字体大小
  "terminal.integrated.fontSize": 14, // 终端字体大小
  "debug.console.fontSize": 14, // 控制调试控制台中的字体大小
  "editor.lineHeight": 28, // 行高
  "editor.tabSize": 2, // 一个制表符（缩进）为两个空格
  "editor.lineNumbers": "on", // 显示绝对行数
  "editor.rulers": [
    // 在120个字符的位置显示标尺
    80
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
  // 字符串使用单引号
  "prettier.singleQuote": true,
  // 句尾不添加分号
  "prettier.semi": false,
  // 缩进字节数
  "prettier.tabWidth": 2,
  // 缩进不使用 tab
  "prettier.useTabs": false,
  // 对象中打印空格 默认 true
  // true: { foo: bar }
  // false: {foo: bar}
  "prettier.bracketSpacing": true,
  // 箭头函数参数括号 默认 avoid，可选 avoid| always
  // avoid 能省略括号的时候就省略 例如 x => x
  // always 总是有括号
  "prettier.arrowParens": "avoid",
  // 换行长度，默认80
  "prettier.printWidth": 80,
  // 多行 JSX 元素时，将 `>` 放在最后一行的末尾，而不是单独放在下一行
  // <button
  //   className="prettier-class"
  //   id="prettier-id"
  //   onClick={this.handleClick}>
  //   Click Here
  // </button>
  // 设置为 false 时
  // <button
  //   className="prettier-class"
  //   id="prettier-id"
  //   onClick={this.handleClick}
  // >
  //   Click Here
  // </button>
  "prettier.jsxBracketSameLine": true,
  // jsx 中使用单引号代替双引号
  "prettier.jsxSingleQuote": true,
  // 在对象或数组最后一个元素后面不加逗号
  "prettier.trailingComma": "none",
  // 每行结尾换行符号设置为 lf
  "prettier.endOfLine": "lf",

  /* ==================== cssrem 配置 ==================== */
  "cssrem.rootFontSize": 75,

  /* ==================== 格式化规则 配置 ==================== */
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsx]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // 文件换行符为 LF
  "files.eol": "\n",
  // 因为安装了 Color Highlight，禁用掉自带的颜色修饰器
  "editor.colorDecorators": false,
  "window.zoomLevel": 1,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "go.useLanguageServer": true,
  "todo-tree.tree.showScanModeButton": false
}
```
