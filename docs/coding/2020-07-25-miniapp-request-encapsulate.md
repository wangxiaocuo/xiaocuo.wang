---
title: 微信小程序接口请求封装
date: 2020/07/25 21:16:55
tags:
  - 前端
  - 微信小程序
---

以 [Taro](https://taro-docs.jd.com/taro/docs/README) 为例，对于小程序的接口请求进行封装。可以复用于微信小程序原生开发，或其他平台的小程序。

<!-- more -->

## 工具类封装

```js
// src/utils/request.js

import Taro from '@tarojs/taro'

// 请求路径公用部分
const DOMAIN = 'https://test.com/api/'

/**
  * 错误统一处理
  * @param {String} type 错误类型
  * @param {*} err 错误内容
  */
const handleRequestError = (type, err) => {
  if (type === 'gateway') {
    // 具体情况具体对待
  }
  if (type === 'business') {
    // 具体情况具体对待
  }
}

// 用 Symbol 变量处理私有变量和方法
const _defaultConfig = Symbol('_defaultConfig')
const _sendRequest = Symbol('_sendRequest')

// 拦截器 - 打印请求的相关信息
const interceptor = chain => {
  const requestParams = chain.requestParams
  const { method, header, data, url } = requestParams

  console.log(
    `
HTTP 请求=====>
地址：${url}
方式：${method || 'GET'}
参数：
    `,
    { header, data }
  )

  return chain.proceed(requestParams).then(res => {
    console.log(
      `
HTTP 响应<=====
地址：${url}
响应体：
      `,
      res
    )
    return res
  })
}
addInterceptor(interceptor)
// 也可以使用 Taro 官方提供的拦截器
// Taro.addInterceptor(Taro.interceptors.logInterceptor)

/**
 * 接口请求类 Request
 */
class Request {
  constructor() {
    // 私有变量：默认配置
    this[_defaultConfig] = {
      header: {},
      timeout: 10000
    }
  }

  /**
   * 私有方法：发起请求
   * @param {String} method 请求方法
   * @param {String} url 请求路径
   * @param {Object} data 请求参数
   * @param {Object} config 请求配置
   */
  [_sendRequest](method, url = '', data = {}, config = {}) {
    config.header = config.header || {}
    // 请求头中挂载 token
    const token = Taro.getStorageSync('token')
    if(token) {
      config.header.token = token
    }
    return new Promise((resolve, reject) => {
      Taro.request({
        method,
        url: DOMAIN + url,
        data,
        // 挂载默认配置
        ...this[_defaultConfig],
        // 挂载自定义配置
        ...config,
        success: res => {
          if (res.code !== 200) {
            // 业务报错 处理
            // 这里只是示例，具体项目具体对待
            handleRequestError('business', res)
            return reject(res.message)
          }
          resolve(res.data)
        },
        fail: err => {
          // 网关报错 处理
          handleRequestError('gateway', err)
          reject(err)
        }
      })
    })
  }

  /**
   * GET 请求
   * @param {String} url 请求路径
   * @param {*} data 请求参数
   * @param {Object} config 请求参数
   */
  get(url, data, config) {
    return this[_sendRequest]('GET', url, data, config)
  }

  /**
   * POST 请求
   * @param {String} url 请求路径
   * @param {*} data 请求参数
   * @param {Object} config 请求参数
   */
  post(url, data, config) {
    return this[_sendRequest]('POST', url, data, config)
  }

  /**
   * PUT 请求
   * @param {String} url 请求路径
   * @param {*} data 请求参数
   * @param {Object} config 请求参数
   */
  put(url, data, config) {
    return this[_sendRequest]('PUT', url, data, config)
  }

  /**
   * DELETE 请求
   * @param {String} url 请求路径
   * @param {*} data 请求参数
   * @param {Object} config 请求参数
   */
  delete(url, data, config) {
    return this[_sendRequest]('DELETE', url, data, config)
  }
}

export default new Request()
```

## 工具类使用

在 `src` 下新建 `apis` 文件夹，用于放置各模块的请求方法。

```bash
|--src
|-----apis
|---------basic.js
|---------user.js
```

以 `user.js` 为例：

```js
import Taro from '@tarojs/taro'
import request from '@/utils/request'

class UserApi {
  /**
   * 小程序 login
   */
  wxLogin(params) {
    return request.get(`/wx-login`, params)
  }
  /**
   * 授权手机号
   * @param {String} params.iv 偏移值
   * @param {String} params.encryptedData 加密数据
   */
  authPhone(params) {
    return request.post(`/auth-phone`, params)
  }
}

export default new UserApi()
```

## 接口调用示例

```js
// 示例
// app.jsx

import Taro from '@tarojs/taro'
import userApi from '@/apis/user'

try {
  const res = await Taro.login()
  const wxLoginRes = await userApi.wxLogin({ jscode: res.code })
} catch (error) {
  console.error(error)
}
```
