---
title: 微信小程序中基于手机号的授权流程设计
date: 2021/03/09
tags:
  - 微信小程序
  - 授权
---

![问题截图](./2021-03-09-miniapp-auth-process-based-on-phone/process.svg)

以上流程设计基于以下几点
- 用户体系基于手机号，而非 openId 或 UnionID
- 一级 token 的设计是在小程序所调用的接口不在其他平台使用的前提下
