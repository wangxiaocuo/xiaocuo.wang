---
title: vue高级用法之渲染函数&JXS
date: 2021/02/05 10:44:19
tags:
  - vue
---

最近用 taro3+react 开发小程序，对 react 语法和 JSX 的感官还是很丝滑的。有天下班路上，回忆起来，vue 官网也有介绍过渲染函数和 JSX 的使用，遂捣鼓捣鼓。

<!-- more -->

## 了解下 JSX

JSX 是一个 JavaScript 的语法扩展，最早见于 react 框架中。它本质上就是一种在 js 中扩展出来的一种对象，也可以理解为是一种语法糖。简单点理解就是，JSX 可以让我们在 js 中书写 html 代码。

[官网介绍](https://zh-hans.reactjs.org/docs/introducing-jsx.html)

```jsx
const element = <h1>Hello, world!</h1>
```

## 了解下 vue 的渲染函数

在一些场景，用 `<template>` 去编写组件的 `html`，代码会很冗长，显得不够精简，这时候就会需要用到`渲染函数` 。

渲染函数即 `render` 函数，在组件实例中，与 `data`、`methods` 同级。它接收一个参数 `createElement` ，`createElement`本身也是一个函数，它可以通过一系列参数的组织，生成一个 `虚拟 DOM` 的对象，与真实的 `DOM 节点` 一一对应。

渲染函数的 `createElement` 以及 `虚拟 DOM` 不是本次科普的重点，感兴趣的同学可以去 [官方文档](https://cn.vuejs.org/v2/guide/render-function.html#%E8%8A%82%E7%82%B9%E3%80%81%E6%A0%91%E4%BB%A5%E5%8F%8A%E8%99%9A%E6%8B%9F-DOM) 了解。

## 渲染函数结合 JSX 编写组件

> 注意：`render` 函数和 `<template>` 模板是互斥的，二者选择一种去编写组件就行

### 旧版本支持

最新版本的 Vue-cli，天然支持 JSX 的编译，如果你在使用 JSX 时报错了，先安装以下依赖

```shell
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
```

然后在 `babel.config.js` 中添加以下配置

```js
module.exports = {
  presets: ['@vue/babel-preset-jsx']
}
```

### 简单的组件示例

```js
Vue.component('test-component', {
  render() {
    return <h1>你好，世界！</h1>
  }
})
```

### 单页面组件使用示例

```jsx
<script>
export default {
  render() {
    return <h1>你好，世界！</h1>
  }
}
</script>

<style scoped lang="less"></style>
```

### 官方语法介绍

#### 内容

```jsx
render() {
  return <p>hello</p>
}
```

- 动态内容

```js
render() {
  return <p>hello { this.message }</p>
}
```

- 自闭合标签

```jsx
render() {
  return <input />
}
```

- 使用组件

> 组件引入不需要再配置 `components` 属性，很方便

```jsx
import MyComponent from './my-component'

export default {
  render() {
    return <MyComponent>hello</MyComponent>
  }
}
```

#### 属性/Props

```jsx
render() {
  return <input type="email" />
}
```

- 动态绑定

```jsx
render() {
  return <input
    type="email"
    placeholder={this.placeholderText}
  />
}
```

- 使用`扩展运算符`

```jsx
render() {
  const inputAttrs = {
    type: 'email',
    placeholder: 'Enter your email'
  }

  return <input {...{ attrs: inputAttrs }} />
}
```

#### 插槽

- 具名插槽

```jsx
render() {
  return (
    <MyComponent>
      <header slot="header">header</header>
      <footer slot="footer">footer</footer>
    </MyComponent>
  )
}
```

- 作用域插槽

```jsx
render() {
  const scopedSlots = {
    header: () => <header>header</header>,
    footer: () => <footer>footer</footer>
  }

  return <MyComponent scopedSlots={scopedSlots} />
}
```

#### 指令

```jsx
<input vModel={this.newTodoText} />
```

- 带有一个修饰符

```jsx
<input vModel_trim={this.newTodoText} />
```

- 带参数

```jsx
<input vOn:click={this.newTodoText} />
```

- 同时带参数和多个修饰符

```jsx
<input vOn:click_stop_prevent={this.newTodoText} />
```

- `V-html`

```jsx
<p domPropsInnerHTML={html} />
```

#### 函数式组件

- 如果是默认导出的形式，可以直接到处一个箭头函数，箭头函数返回 JSX

```jsx
export default ({ props }) => <p>hello {props.message}</p>
```

- 也可以声明一个大驼峰来存储

```jsx
const HelloWorld = ({ props }) => <p>hello {props.message}</p>
```

### 实际使用上的细节

#### 属性

属性用 `my-name` 和 `myName` 是一样的效果，但是 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称是最佳实践，所以推荐使用 `myName`。

#### 事件绑定

`vOn:click` 可以简写为 `onClick`。

## 总结

以上就是对 vue 中使用渲染函数和 JSX 的科普。渲染函数结合 JSX，能让我们拥有 JavaScript 的完全编程的能力，对于一些高阶组件的编写，会更加灵活。
