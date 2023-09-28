---
title: 从头搭一个Vite+Vue3+ts的基础模板
date: 2023-03-06
outline: deep
tags:
  - 前端
  - Vue3
  - Typescript
prev:
  text: 使用ECharts地图时你应该了解的知识
  link: ./20230223-echarts-map
next:
  text: 聊聊前端场景中的Emoji
  link: ./20230626-front-end-emoji
---

# 从头搭一个Vite+Vue3+ts的基础模板

前端Vue3TypeScript

## 00. 前言

[Vue3](https://cn.vuejs.org)自2020年09月18日发布至今已经两年多了，相关生态日渐丰满，且随我一起从头搭建一个基础模板，一起踩踩坑。



本篇文章所讲述的基础模板，参考了以下开源项目：

- [GitHub - sxzz/element-plus-best-practices: Element Plus Best Practices 最佳实践](https://github.com/sxzz/element-plus-best-practices)
- [GitHub - vbenjs/vue-vben-admin: A modern vue admin. It is based on Vue3, vite and TypeScript. It’s fast！](https://github.com/vbenjs/vue-vben-admin)

## 01. 新建项目

参照官网所述，先[创建一个Vue应用](https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application)。注意`npm init <initializer>`命令需要安装较新版本的[Node.js](https://nodejs.org/en/)，注意查看自己的npm版本（`npm -v`），如果小于`5.2.0`，就需要升级了。

```shell
npm init vue@latest
```

![img](./20230306-vue3-template.assets/1674873934210-83a9f99e-169d-4339-b590-855fe39b3fc5.png)



创建好初始项目后，第一步除了安装依赖外，建议此时初始化git，从头开始分步骤记录修改的过程。后续每个步骤做完，都要记得commit一下代码，精细化记录修改过程。

```shell
git init && git add . && git commit -m "build: 工程初始化"
```



初始项目的结构如下：

```shell
# /@temp/vue3-ts-tmpl
├── public
└── src
   ├── assets
   ├── components
   |  └── icons
   ├── router
   ├── stores
   └── views
```



VSCode中，Vue3的项目推荐安装 `TypeScript Vue Plugin (Volar)`、`Vue Language Features`这两个插件。



要注意，Vue2项目所需要的`Vetur`和`Volar`是会打架的，不同的项目只能启用一种。



如果同一时间在维护多个项目，既有Vue2的项目，又有Vue3的项目，切换启用插件就变得非常繁琐。那怎么做才能优雅地使用这两组互斥的插件呢？



这时候可以选择先全部禁用掉这三个插件，在不同的项目中，只针对于工作区启用不同的插件，即`启用(工作区)`选项。这时VSCode会把当前项目的目录作为一个工作区，启用的插件只作用于当前目录，这样每个项目只需要启用一次。

![img](./20230306-vue3-template.assets/1674896246819-3c289ad1-18d8-45d6-8df1-6531a3f215af.png)



不推荐【另存为工作区】的做法，操作起来真的很反人类。

## 02 Prettier配置

每次新建一个项目，我的习惯是先配置[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)，保证后续代码修改时风格的统一。



在根目录下创建文件：`.prettierrc.json`和`.prettierignore`。我常用的配置如下：

```json
// .prettierrc.json

{
  "singleQuote": true, // 字符串使用单引号
  "semi": false, // 句尾不添加分号
  "tabWidth": 2, // 缩进字节数，默认为2
  "useTabs": false, // 缩进不使用 tab
  "bracketSpacing": true, // 左括号后和右括号前打印空格
  "arrowParens": "avoid", // 箭头函数参数括号能省略括号的时候就省略 例如 x => x
  "printWidth": 80, // 换行长度，默认80
  "jsxBracketSameLine": true, // 多行 JSX 元素时，将 `>` 放在最后一行的末尾，而不是单独放在下一行
  "jsxSingleQuote": true, // jsx 中使用单引号代替双引号
  "trailingComma": "none", // 在对象或数组最后一个元素后面不加逗号
  "endOfLine": "auto" // 每行结尾换行符号设置为 auto
}
#.prettierignore

# dist
dist
dist-ssr

# node_modules
node_modules

# package
yarn-lock.json
package-lock.json
package.json

# tsconfig
tsconfig.json
tsconfig.node.json

# eslintrc
.eslintrc.js
.eslintrc.cjs

# html
*.html

# README
README.md
```

## 03. 删除demo代码

初始的项目中，有一些demo代码，需要删除掉，以便于后续的改造。

1. `src/App.vue`修改

```vue
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
```

1. `src/views/HomeView.vue`修改

```vue
<script setup lang="ts"></script>

<template>
  <main></main>
</template>
```

1. `src/router/index.ts`修改

```ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
```

1. 全局样式文件修改

1. 删除`src/assets/base.css`中的所有代码
2. `src/assets/main.css`中只保留代码`@import './base.css';`
3. `src/assets/base.css`、`src/assets/main.css`，移动到`src/styles`下

1. 删除以下文件

```
public/favicon.ico
src/assets/logo.svg
src/components/icons
src/components/HelloWorld.vue
src/components/TheWelcome.vue
src/components/WelcomItem.vue
src/views/AboutView.vue
```



这样我们就得到一个最基础的、空白的架子。

## 04. Husky 安装和配置

为了约束Git提交信息，方便团队协作、问题追溯，需要安装配置husky等工具。



具体安装配置方式，请参考我的另一篇文章：

此处为语雀内容卡片，点击链接查看：https://www.yuque.com/wangxiaocuo/coding-blog/ovot1vvc1e6hqqwh

## 05. 解决 TS 版本兼容问题

如果你的VSCode安装了插件`JavaScript and TypeScript Nightly`，并且版本 >= `v5.0.202301270`，那么打开ts配置文件 `tsconfig.json`或`tsconfig.config.json`时，可能会报错（如果未报错，请忽略此步）。

![img](./20230306-vue3-template.assets/1674894072979-58b9818d-2963-4ac9-bda0-63171bad2afe.png)

报错信息如下：

```
Flag 'importsNotUsedAsValues' is deprecated and will stop functioning in TypeScript 5.5. Specify 'ignoreDeprecations: "5.0"' to silence this error.
  Use 'verbatimModuleSyntax' instead.
```

![img](./20230306-vue3-template.assets/1674893737781-12ee1d48-d93c-4eeb-b8bd-e1ca1e742b22.png)

有两个方案解决这个问题：

1. 卸载插件`JavaScript and TypeScript Nightly`，卸载后会缺少一些最新ts语法的代码补全提示
2. 手动选择当前工作区的ts版本

1. 手动选择可通过VSCode底部面板选择，需先打开一个`.ts`的文件，比如`vite.config.ts`
2. 点击底部TypeScript选项左侧的`{}`

![img](./20230306-vue3-template.assets/1674894517755-9107cd04-fa6f-4e01-8952-262783c87cf9.png)

1. 选择小弹框中的`选择版本（Select Version）`
2. 在顶部弹框中选择`使用工作区版本x.x.x`

![img](./20230306-vue3-template.assets/1674894722785-8069ed63-22a2-43ff-828c-5a5f4f55c163.png)

## 06. 统一放置全局类型文件

在项目根目录下，有两个`tsconfig`配置相关的文件：`tsconfig.json`、`tsconfig.config.json`。

- `tsconfig.json`

![img](./20230306-vue3-template.assets/1674897771963-96eb5022-6be5-461f-bfc4-0092ffd8a4f2.png)

- `tsconfig.config.json`

![img](./20230306-vue3-template.assets/1674897829072-70bd963b-54ea-43fb-a80b-452ec7323cbc.png)

可以看到`tsconfig.json`通过`references`配置引用了`tsconfig.config.json`，这是一种类似于模块拆分的做法，是ts 3.0的新功能。



通过两个文件的`include`配置，其实可以很明显得看出来，`tsconfig.config.json`作用于根目录下的一些配置文件，`tsconfig.json`本身作用于`src`目录。



默认全局的类型文件是放在根目录下的，比如新建项目时生成的`env.d.ts`。后续全局的类型文件多了，放在根目录下会很丑，我们可以选择在根目录下新建`types`目录，把`env.d.ts`移进去。

```shell
├── src
└── types
   └── env.d.ts
```

同时需要修改两个配置文件：

- `tsconfig.json`

```json
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": [
    "src/**/*",
    "src/**/*.vue",
    "types/**/*"
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "typeRoots": [
      "./node_modules/@types/",
      "./types"
    ],
    "paths": {
      "@/*": ["./src/*"],
      "#/*": ["./types/*"]
    },
    "types": [
      "unplugin-icons/types/vue",
      "element-plus/global"
    ]
  },
  "references": [
    {
      "path": "./tsconfig.config.json"
    }
  ]
}
```

- `tsconfig.config.json`

```json
{
  "extends": "@vue/tsconfig/tsconfig.node.json",
  "include": [
    "vite.config.*",
    "vitest.config.*",
    "cypress.config.*",
    "playwright.config.*",
    "build/**/*",
    "types/**/*"
  ],
  "compilerOptions": {
    "composite": true,
    "types": ["node"],
    "typeRoots": [
      "./node_modules/@types/",
      "./types"
    ],
  }
}
```

## 07. Vite 插件拆分配置

随着后续Vite插件的增多，各插件的配置如果都写在`vite.config.ts`中，会显得杂乱臃肿，最好拆分出来，按模块配置。可以在根目录下新建`build`目录，放置Vite插件相关的配置。

```shell
├── build
|  ├── vite-plugin
|  |  ├── plugins
|  |  |  ├── auto-import.ts
|  |  |  └── xxx.ts
|  |  └── index.ts
|  └── vite-utils.ts
└── src
```

示例代码如下：

- `vite.config.ts`

```ts
// vite.config.ts

import { defineConfig, loadEnv } from 'vite'
import { processingEnv } from './build/vite-utils'
import { loadVitePlugins } from './build/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 如果设置第三个参数为 '' ，则是加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd())
  const viteEnv = processingEnv(env)

  return {
    plugins: loadVitePlugins(command, viteEnv),
    // 其他配置
    ...
  }
})
```

- `build/vite-utils.ts`

```ts
// build/vite-utils.ts

import type { ImportMetaEnv } from '../types/env'

/**
 * 处理环境变量
 * loadEnv读取的值都是字符串类型，该函数对于特殊类型的值进行转换处理
 * @param viteEnv VITE_ 开头的环境变量
 * @returns 处理后的环境变量
 */
export function processingEnv(viteEnv: Record<string, any>): ImportMetaEnv {
  const result = Object.keys(viteEnv).reduce((res: any, key) => {
    let value = viteEnv[key]

    // 处理布尔值
    value = value === 'true' ? true : value === 'false' ? false : value

    res[key] = value
    return res
  }, {})

  return result
}
```

- `build/vite-plugin/index.ts`

```ts
// build/vite-plugin/index.ts

import type { PluginOption } from 'vite'
import type { ImportMetaEnv } from '../../types/env'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { loadAutoImport } from './plugins/auto-import'
import { loadComponents } from './plugins/components'
// 其他插件

/**
 * 加载Vite插件
 */
export function loadVitePlugins(
  command: 'serve' | 'build',
  viteEnv: ImportMetaEnv
) {
  const plugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()]
  const isBuild = command === 'build'

  plugins.push(loadAutoImport())
  plugins.push(loadComponents())
  // 其他插件

  return plugins
}
```

- `build/vite-plugin/plugins/auto-import.ts` 示例

```ts
// build/vite-plugin/plugins/auto-import.ts

import AutoImport from 'unplugin-auto-import/vite'

/**
 * 自动导入 APIs
 * https://github.com/antfu/unplugin-auto-import
 */
export function loadAutoImport() {
  const plugin = AutoImport({
    // ...
  })

  return plugin
}
```

## 08. 常用Vite插件及配置

- `unplugin-auto-import`自动引入APIs

```ts
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/**
 * 自动导入APIs
 * https://github.com/antfu/unplugin-auto-import
 */
export function loadAutoImport() {
  const plugin = AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/ // .md
    ],

    imports: [
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      'vue',
      // 自动导入 vue-router 相关函数
      'vue-router'
    ],

    dts: './types/auto-imports.d.ts',
    vueTemplate: true,
    resolvers: [ElementPlusResolver()],

    // Generate corresponding .eslintrc-auto-import.json file.
    // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
    eslintrc: {
      enabled: false, // Default `false`
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    }
  })

  return plugin
}
```

- `unplugin-vue-components`自动注册组件

```ts
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

/**
 * 按需导入组件
 */
export function loadComponents() {
  const plugin = Components({
    dts: './types/components.d.ts',
    // https://github.com/antfu/unplugin-vue-components/issues/195#issuecomment-955011828
    // https://github.com/antfu/unplugin-vue-components/blob/3ecdeade011d0ad4dde853ac48c3a051ba880420/src/types.ts#L63-L68
    globs: ['src/components/V*/*.vue'],
    resolvers: [
      // 插件为流行的UI库提供了内置解析器，参考：https://github.com/antfu/unplugin-vue-components#importing-from-ui-libraries
      // 这里以 Element Plus 作示例
      ElementPlusResolver({ exclude: /ElIcon/ }),
      IconsResolver({
        prefix: 'icon',
        // 允许加载的图标集合：ElementPlus
        enabledCollections: ['ep', 'icon-park'],
        alias: {
          park: 'icon-park'
        }
      })
    ]
  })

  return plugin
}
```

注意我这里的两个配置：

- `globs: ['src/components/V*/*.vue']`，这个配置只会使`src/components/`目录下以字母`V`开头的组件注册为全局组件。主要是考虑到，一个复杂的组件可能包含一些私有的子组件，这些子组件不需要自动注册为全局组件。
- `ElementPlusResolver({ exclude: /ElIcon/ })`，我的项目中使用的是ElementPlus作为 UI 框架，这个配置会忽略`ElIcon`组件的自动引入。如果没有这个配置，`ElIcon`组件存在引入顺序问题，导致样式的错乱。详情请参考：https://github.com/element-plus/element-plus/issues/11761。在忽略`ElIcon`后，如果页面中其他 ElementPlus 组件中含有`ElIcon`组件，可以不手动引入，如果没有这样的组件，则需要手动引入`ElIcon`。



- `vite-plugin-compression`使用gzip或者brotli来压缩资源

```ts
import Compression from 'vite-plugin-compression'

/**
 * 使用 gzip 或者 brotli 来压缩资源
 * https://github.com/vbenjs/vite-plugin-compression
 */
export function loadCompression() {
  const plugin = Compression({
    ext: '.gz',
    // 大于1kb时启用压缩
    threshold: 1024000
  })

  return plugin
}
```

- `vite-plugin-html`HTML压缩能力、EJS模版能力等

```ts
// https://cn.vitejs.dev/guide/env-and-mode.html#intellisense
import type { ImportMetaEnv } from '../../../types/env'
import { createHtmlPlugin } from 'vite-plugin-html'

/**
 * HTML 压缩能力、EJS 模版能力等
 * https://github.com/vbenjs/vite-plugin-html
 */
export function loadHtml(isBuild: boolean, viteEnv: ImportMetaEnv) {
  const { VITE_APP_TITLE } = viteEnv
  const plugin = createHtmlPlugin({
    minify: isBuild,
    // 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
    entry: 'src/main.ts',
    // 需要注入 index.html ejs 模版的数据
    inject: {
      data: {
        title: VITE_APP_TITLE,
        releaseTime: new Date().toLocaleString()
      }
    }
  })

  return plugin
}
```

- `unplugin-icons`自动载入图标库

```ts
import Icons from 'unplugin-icons/vite'

/**
 * 自动载入图标库
 * https://github.com/antfu/unplugin-icons
 */
export function loadIcons() {
  const plugin = Icons({
    autoInstall: true
  })

  return plugin
}
```

- `vite-plugin-windicss`Windi CSS插件

```ts
import WindiCSS from 'vite-plugin-windicss'

/**
 * Windi CSS
 */
export function loadWindiCSS() {
  const plugin = WindiCSS()

  return plugin
}
```

## 09. Axios封装配置

我所使用的Axios版本是`1.3.4`。



不同版本Axios之间的ts配置略有差异，比如`1.2.3`往请求头中塞入自定义的头字段，需要扩展接口`RawAxiosRequestConfig`，`1.3.4`则是扩展`AxiosRequestConfig`。



对于Axios的封装配置，各家有各家言，有很多种不同的封装方式。我主张不要**过度封装**。比如Axios提供了`get`、`post`等快捷调用，就不需要再费劲扒拉的再封装一遍`get`、`post`。



以下是我的常用配置，各位做个参考。

```shell
# 涉及到的文件

└── src
   └── utils
  	 	└── axios
         ├── error.ts
         ├── index.ts
         ├── interceptor.ts
         └── response.ts
└── types
   └── axios.d.ts
```

```ts
// types/axios.d.ts
// 拓展 axios 类型

import 'axios'
import { TOKEN_KEY } from '../src/utils/token'

export {}

declare module 'axios' {
  interface AxiosRequestConfig {
    // 禁用一般性的提示，由调用方自行处理错误
    disableGeneralTip?: boolean
    // 是否转为表单类型的请求
    needTransformToForm?: boolean
    // 是否是非标接口，即响应体不是以下结构的： { data: { xxx: xxx }, message: 'xxx', status: '0 }
    nonStandard?: boolean
  }
  interface AxiosHeaders {
    [TOKEN_KEY]?: string
  }
}
```

```ts
// src/utils/axios/index.ts
// 我的项目涉及到多个业务方的服务，所以采用了多实例的模式

import axios from 'axios'
import { setInterceptor } from './interceptor'

axios.defaults.timeout = 300000

// 基础 接口实例
export const instance = axios.create({
  baseURL: '/'
})
setInterceptor(instance)

// 服务1 接口实例
export const s1Instance = axios.create({
  baseURL: '/s1'
})
setInterceptor(s1Instance)

// 服务2 接口实例
export const s2Instance = axios.create({
  baseURL: '/s2'
})
setInterceptor(s2Instance)
```

```ts
// src/utils/axios/interceptor.ts
// 设置拦截器

import type { AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { processingSpecialResponse } from './response'
import { checkAndProcessingBusinessError, processingHttpError } from './error'

const TOKEN_KEY = import.meta.env.VITE_APP_TOKEN_KEY

/**
 * 设置拦截器
 * @param instance axios实例
 */
export function setInterceptor(instance: AxiosInstance) {
  setRequestInterceptor(instance)
  setResponseInterceptor(instance)
}

/**
 * 设置请求拦截器
 * @param instance axios实例
 */
function setRequestInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    config => {
      config.headers = config.headers ?? {}
      const { token } = useAuthStore()
      if (token && TOKEN_KEY) {
        config.headers[TOKEN_KEY] = token
      }

      if (config.needTransformToForm && config.data && typeof config.data === 'object') {
        // 部分接口是老接口，根据 needTransformToForm 配置，按需转为表单类型
        try {
          const formData = new FormData()
          for (const key in config.data) {
            if (Object.prototype.hasOwnProperty.call(config.data, key)) {
              formData.append(key, config.data[key] ?? '')
            }
          }
          config.data = formData
        } catch (error) {
          console.warn(error)
        }
      }

      return config
    },
    error => {
      // 暂时没有找到主动触发的方法，可能只有浏览器不兼容时才会触发
      return Promise.reject(error)
    }
  )
}

/**
 * 设置响应拦截器
 * @param instance axios实例
 */
function setResponseInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    response => {
      // 2xx 范围内的状态码都会触发该函数
      // 有时，HTTP响应状态码虽然是200，但是前后端会约定务一些业务报错

      if (processingSpecialResponse(response)) {
        // 如果命中了特殊返回情况，直接返回
        return response
      }

      if (checkAndProcessingBusinessError(response)) {
        // 处理业务报错
        return Promise.reject(response.data)
      }

      return response.data
    },
    error => {
      // 超出 2xx 范围的状态码都会触发该函数
      if (
        error?.response?.data &&
        checkAndProcessingBusinessError(error.response)
      ) {
        // 兼容部分接口把业务报错放在非200的响应体中
        return Promise.reject(error?.response.data)
      }

      processingHttpError(error)

      return Promise.reject(error)
    }
  )
}
```

```ts
// src/utils/axios/error.ts
import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import { isCancel } from 'axios'
import { useAuthStore } from '@/stores/auth'

const { setUserInfo } = useAuthStore()

/**
 * 提示错误信息
 */
export function showErrorMessage(message: string, config?: AxiosRequestConfig) {
  if (config?.disableGeneralTip) {
    return false
  }
  // @ts-ignore
  ElNotification({
    title: '提示',
    message: message || '请求出错',
    type: 'error',
    duration: 6000
  })
}

/**
 * 检查并处理业务报错
 */
export function checkAndProcessingBusinessError(
  response: AxiosResponse
): boolean {
  const { data, config } = response

  if (Number(data.status) === 401) {
    // 未登录或登录凭证过期特殊处理
    processingNoAccess(config)
    return true
  }

  if (Number(data.status) !== 0) {
    showErrorMessage(data.message, config)
    return true
  }
  return false
}

/**
 * 处理HTTP报错
 */
export function processingHttpError(error: any) {
  if (
    error?.config?.disableGeneralTip ||
    isCancel(error) ||
    error.message === 'canceled'
  ) {
    // 禁用统一提示 或 取消请求
    return false
  }
  const { code, message } = error || {}
  if (code === 'ECONNABORTED' && (message || '').includes('timeout')) {
    // 请求超时
    showErrorMessage('接口请求超时，请刷新页面重试！')
  } else if ((message || '').includes('Network Error')) {
    // 网络异常
    showErrorMessage('网络异常，请检查您的网络连接是否正常！')
  } else {
    let message = ''
    console.log(error)

    // 其他错误
    switch (error?.response?.status) {
      case 400:
        message = '错误的请求语法或请求参数！'
        break
      case 401:
        // 未登录或登录凭证过期特殊处理
        processingNoAccess(error?.response?.config)
        break
      case 403:
        message = '客户端没有访问内容的权限！'
        break
      case 404:
        message = '请求的资源或接口 404！'
        break
      case 405:
        message = '服务器知道请求方法，但目标资源不支持该方法!'
        break
      case 408:
        message = '网络请求超时！'
        break
      case 409:
        message = '该请求与服务器的当前状态冲突！'
        break
      case 410:
        message = '请求的内容已从服务器中永久删除且没有转发地址！'
        break
      case 411:
        message =
          '服务端拒绝了该请求，因为 Content-Length 头字段未定义但是服务端需要它！'
        break
      case 413:
        message = '请求实体大于服务器定义的限制！'
        break
      case 414:
        message = '请求的 URI 比服务器愿意接收的长度长！'
        break
      case 500:
        message = '服务器内部错误，请联系管理员！'
        break
      case 501:
        message = '服务器不支持请求方法！'
        break
      case 502:
        message = '网关错误！'
        break
      case 503:
        message = '服务不可用，服务器暂时过载或维护！'
        break
      case 504:
        message = '网关超时，请重试！'
        break
      case 505:
        message = '服务器不支持请求中使用的 HTTP 版本！'
        break
      case 506:
        message = '服务器存在内部配置错误！'
        break
      default:
        message = '异常问题，请联系管理员！'
        break
    }

    if (message) {
      showErrorMessage(message)
    }
  }
}

/**
 * 处理下载报错
 * @description 文件流下载统一用的是 `responseType: blob`，错误信息也会被转成blob
 */
export function processingDownloadError(response: AxiosResponse) {
  const { data } = response
  const reader = new FileReader()
  reader.onload = () => {
    const { result } = reader
    if (typeof result === 'string') {
      const json = JSON.parse(result)
      showErrorMessage(json.message, response.config)
    }
  }
  reader.onerror = err => {
    console.warn(err)
  }
  reader.readAsText(data)
}

let isNoAccessProcessing = false
/**
 * 处理没有权限的情况
 */
export function processingNoAccess(config?: AxiosRequestConfig) {
  if (config?.disableGeneralTip) {
    return false
  }
  if (!isNoAccessProcessing) {
    isNoAccessProcessing = true
    // @ts-ignore
    ElMessageBox({
      title: '登录失效',
      message: '您未登录，或者登录已经超时，请先登录！',
      type: 'warning',
      showCancelButton: false,
      confirmButtonText: '确定'
    })
      .then(() => {
        // 清除用户数据
        setUserInfo({})
        location.reload()
      })
      .finally(() => {
        isNoAccessProcessing = false
      })
  }
}
```

```ts
// src/utils/axios/response.ts

import type { AxiosResponse } from 'axios'
import { processingDownloadError } from './error'

/**
 * 处理特殊的响应数据
 *  - 下载接口，返回的是文件流
 *  - 请求项目下或服务端的json文件
 *  - 某些请求静态资源的接口，直接返回的字符串
 *  - 某些接口由于历史原因，响应体不符合规范格式: { data: { xxx: xxx }, message: 'xxx', status: '0' }
 */
export function processingSpecialResponse(
  response: AxiosResponse
): AxiosResponse | boolean | Promise<never> {
  const { data, headers, config } = response

  // 响应体是否为字符串
  const isDataString = typeof data === 'string'
  // 是否请求的是JSON文件
  const isRequestJson = (config.url || '')
    .split('?')[0]
    .match(new RegExp('.json$'))

  if (isDataString || isRequestJson || response.config.nonStandard) {
    return true
  }

  // 如果是文件下载
  if (typeof data === 'object' && data instanceof Blob) {
    const contentType = headers['content-type'] || headers['Content-Type']
    if (contentType?.includes('json')) {
      // Content-Type是json，说明文件下载出错了
      processingDownloadError(response)
      return Promise.reject('下载出错')
    }
    response.data = {
      blob: data,
      filename: splitContentDispositionFilename(response)
    }
    return true
  }

  return false
}

/**
 * 拆解文件名
 */
function splitContentDispositionFilename(response: AxiosResponse) {
  const { headers, config } = response
  const contentDisposition =
    headers['content-disposition'] || headers['Content-Disposition'] || ''
  // 文件路径，假设文件下载接口，文件路径参数统一放在params中
  const fileUrl = config?.params?.url || ''
  let filename = ''
  try {
    if (contentDisposition) {
      // 解析Content-Disposition中的文件名
      const match = contentDisposition.match(/filename=(\S+)/)
      if (match?.length) {
        filename = decodeURIComponent(match[1])
      }
      // 防止斜杠影响 file-saver 的文件名识别
      filename = filename.replace('/', '-')
    } else {
      filename = decodeURIComponent(fileUrl.split('/').pop())
    }
  } catch (error) {
    console.warn(error)
  }

  return filename
}
```



使用示例：

```ts
// src/apis/xxx.ts
// 在同一的地方维护接口方法，以便于可能的复用场景

import { instance, s1Instance, s2Instance } from '@/utils/axios'
import { saveAs } from 'file-saver'

/**
 * 某分页接口
 */
export function getPageList(data: Record<string, any>) {
  return instance.post(
    '/xxx/pageList',
    data,
    {
      needTransformToForm: true
    }
  )
}

/**
 * 某获取信息的接口
 */
export function getXXXInfo(params: Record<string, any>) {
  return s1Instance.get('/xxx/info', { params })
}

/**
 * 某导出列表接口
 */
export async function exportList(data: Record<string, any>) {
  const res = await s2Instance.post(
    '/xxx/download',
    params,
    { responseType: 'blob' }
  )
  saveAs(res.data.blob, res.data.filename || `数据导出.xlsx`)
}
```

```vue
<!-- src/views/xxx/index.vue -->
<!-- 在实际业务页面中使用示例 -->

<script lang="ts">
// 指定组件名
export default {
  name: 'XXX'
}
</script>

<script lang="ts" setup>
import { getPageList, getXXXInfo, exportList } from '@/apis/xxx.ts'

onMounted(async () => {
  // 初始化加载数据
  const [res1, res2] = await Promise.all([
    getPageList({ a: 1 }),
    getXXXInfo({ b: 2 })
  ])
  // ...
})

/**
 * 导出列表
 */
async function handleExportList() {
  try {
    const res = await exportList({ a: 1 })
    // ...
  } catch (error) {
    console.warn(error)
  }
}
</script>

<template>
  <div></div>
</template>

<style></style>
```

## 10. Vue3可用的工具推荐

按需安装。

- [VueUse](https://vueuse.org/)
- [echarts](https://echarts.apache.org/zh/index.html)
- [currency.js](https://currency.js.org/)：货币转换工具、千分位格式化工具
- [decimal.js](https://mikemcl.github.io/decimal.js/)：计算工具，可以解决计算精度问题
- [dayjs](https://day.js.org/)：Moment.js 的无缝平替
- [file-saver](https://github.com/eligrey/FileSaver.js)：文件下载
- [lodash-es](https://www.npmjs.com/package/lodash-es)：Lodash 的 ES 版本
- [js-cookie](https://github.com/js-cookie/js-cookie)：Cookies 操作
- [nanoid](https://github.com/ai/nanoid)：小巧安全的字符串 ID 生成器
- [vue-clipboard3](https://github.com/JamieCurnow/vue-clipboard3)：使用简单的复制粘贴工具
- [vuedraggable](https://github.com/SortableJS/vue.draggable.next)：拖拽工具



------

以上就是一份比较详细的基础模板搭建过程。在此基础上，你可以继续拓展成后台管理系统或移动端应用的架子。



希望对你有用。
