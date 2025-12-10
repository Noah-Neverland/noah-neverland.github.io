---
title: Taro vs uni-app选型对比
---

# Taro vs uni-app选型对比

## Taro

### 多端转换支持

Taro 3 可以支持转换到 H5、ReactNative 以及任意小程序平台。

目前官方支持转换的平台如下：

- H5
- ReactNative
- 微信小程序
- 京东小程序
- 百度小程序
- 支付宝小程序
- 字节跳动小程序
- QQ 小程序
- 钉钉小程序
- 企业微信小程序
- 支付宝 IOT 小程序
- 飞书小程序

### 框架支持

在 Taro 3 中可以使用完整的 **React / Vue / Vue3 / Nerv** 开发体验，具体请参考：

- [基础教程——React](http://taro-docs.jd.com/taro/docs/react-overall)
- [基础教程——Vue](http://taro-docs.jd.com/taro/docs/vue-overall)
- [基础教程——Vue3](http://taro-docs.jd.com/taro/docs/vue3)

### UI框架

- TaroUI
- NutUI

## uniApp

`uni-app` 是一个使用` Vue.js`开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台。

### 框架支持

目前只支持vue技术栈进行开发

### UI框架

- Uni-ui
- uView
- ... （DCloud插件市场还在持续更新中）


## 开发体验

taro 和 uni-app 的环境搭建及项目创建、运行编译都比较简单

taro的安装及使用：

~~~javascript
# 全局安装 @tarojs/cli
$ npm install -g @tarojs/cli
# 创建 taro 项目
$ taro init myApp
# 进入项目目录
$ cd myApp
# 运行到微信小程序，调试模式
$ npm run dev:weapp
# 发行到微信小程序
$ npm run build:weapp
~~~

uni-app的安装及使用：

~~~javascript
# 全局安装 vue-cli
$ npm install -g @vue/cli
# 创建uni-app项目
$ vue create -p dcloudio/uni-preset-vue my-project
# 进入项目目录
$ cd my-project
# 运行到微信小程序，调试模式
$ npm run dev:mp-weixin
# 发行到微信小程序
$ npm run build:mp-weixin
~~~

开发流程方面，taro和uni-app均是以微信小程序为基础，也都针对小程序的开发弊端，提供了更优秀的体验，比如：

- 均支持使用 npm/yarn 安装管理第三方依赖
- 均支持使用 ES6 甚至更新的ES规范
- 均支持使用 less/scss/ts 等预编译器
- 均支持进行应用状态管理，taro 支持 Redux/Mobx，uni-app 支持 vuex

开发工具方面，taro官方未特别推荐IDE，但提供了vscode支持的d.ts； uni-app推荐的开发工具是他自家的HBuilderX，用它可以不配环境，开箱即用。

## 社区生态

### **学习交流**

Taro通过Github Issues+微信群方式交流，微信群活跃，贡献代码的人也多。

uni-app有专门的论坛，还有视频教程，QQ群微信群都活跃。

另外文档角度，uni-app的文档比taro要完善，数了数交流群的数量，也是uni-app多不少。

### **生态**

taro官方发布了taro-ui库，awesome里三方组件不太多。

uni-app官方发布了uni-ui库，还有个插件市场，里面轮子很多，做业务应该可以很快拼轮子做出来。

## 基于公司业务及团队人员技能考虑

根据业务需求及团队成员现状，形成如下对比：

- 如何在有限前端团队人数下搞定更多平台，是我们的首要考虑，我们可不想踩太多坑导致任务完不成，跨端方面uni-app更成熟；
- 团队里熟悉vue技术栈的同学多一点，全员培训react的风险还是略高，使用uni-app内部培训时间短、风险低。