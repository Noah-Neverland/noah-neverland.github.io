---
title: KNT健康平台技术文档
---

# KNT健康平台技术文档

## 项目介绍

- 框架：vue 版本 2.6.11
- UI框架：vantUI

- 主要功能：报告、服务资讯、健康档案、健康评估、专科服务、精选服务、健康资讯（百科）、订单、个人中心

~~~javascript
// 项目本地运行
yarn serve
// 测试环境打包
yarn build:staging
// 生产环境打包
yarn build
~~~

## 项目结构

## 配置文件解析

### 微前端（qiankun）

#### 主应用配置

~~~javascript
/*
 * @Descripttion: 微前端配置入口
 * @version: 1.0.0
 * @Author: shuaishuai.han
 * @Date: 2022-01-05 22:13:32
 */
import Vue from 'vue';
import { registerMicroApps, start, initGlobalState } from 'qiankun';
import router from '../src/router';
import store from '../src/store';
import MicroApps from './app-config'; // 子应用相关配置信息

// 传给子应用
const _initState = {
  userInfo: store.state.userInfo, // 用户信息
  department: store.state.department // 跳转子应用时传专科信息
};

const apps = MicroApps.filter((item) => item.isOpen).map((item) => {
  const { name, entry, container, activeRule } = item;
  return {
    name,
    entry,
    container,
    activeRule,
    props: {
      MicroRouter: (info) => {
        router.push(info);
      }
    }
  };
});

const actions = initGlobalState(_initState);
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  // console.log('state1===', state);
  // console.log('prev1===', prev);
}, true);
// 设置全局方法
Vue.prototype.$setGlobalState = actions.setGlobalState;

registerMicroApps(apps);
start({ prefetch: false });
~~~

#### 子应用配置

~~~javascript
/* vue.config.js
 * @Descripttion: 更改微应用配置文件
 */
const packageName = require('./package.json').name;

module.exports = {
  ...
  configureWebpack: {
    ...
    output: {
      // 资源打包路径
      library: packageName,
      libraryTarget: 'umd',
      jsonpFunction:  `webpackJsonp_${packageName}`
    }
  },
};
/* config --> index.js
 * @Descripttion: 本地服务配置 允许跨域
 */
module.exports = {
  ...
  get devServer() {
    return {
      disableHostCheck: true,
      headers: {
        //因为qiankun内部请求都是fetch来请求资源，所以子应用必须允许跨域
        'Access-Control-Allow-Origin': '*'
      },
    };
  },
};

/* config --> public-path.js
 * @Descripttion: runtime publicPath 主要解决的是微应用动态载入的 脚本、样式、图片 等地址不正确的问题
 */
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

/* src --> main.js
 * @Descripttion: 入口文件
 */
/* eslint-disable */
import '../config/public-path';
import * as types from '@/store/mutations-types';

Vue.config.productionTip = false;

let mainInstance = null;

const render = (props = {}) => {
  const { container } = props;
  mainInstance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app');
};

// 默认独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 父应用加载子应用，子应用必须暴露三个接口：bootstrap、mount、unmount
export async function bootstrap(props) { };

export async function mount(props) {
  const { MicroRouter } = props;
  props.onGlobalStateChange((state, pre) => {
    store.commit(types.SET_USERINFO_MUTATION, state.userInfo);
  }, true);
  Vue.prototype.$MicroRouter = MicroRouter;
  render(props);
};

export async function unmount(props) {
  mainInstance.$destroy();
  mainInstance.$el.innerHTML = '';
  mainInstance = null;
};

/* src --> store --> index.js
 * @Descripttion: vuex配置文件 存储本地更改唯一标识key
 */
import createPersistedState from 'vuex-persistedstate';
const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      key: 'pregnancy'
    })
  ]
});

export default store;

/* src --> router --> index.js
 * @Descripttion: 更改路由base路径
 */
const router = new Router({
  mode: 'history',
  base: '/xxx', // 更改为主应用配置的路由
  routes: []
});

export default router;
~~~

### vue.config.js

~~~javascript
const autoprefixer = require('autoprefixer');
const {
  publicPath, devServer
} = require('./config');
const { chainWebpackImg, chainWebpackNoConsole, chainSvgRuleConfig } = require('./config/plugin');

const chainWebpackGloablConfig = (config) => {
  config.plugin('html').tap((args) => {
    args[0].title = '恺恩泰健康平台';
    return args;
  });
}

module.exports = {
  publicPath,
  devServer,
  productionSourceMap: false,
  chainWebpack: config => {
    // 移除prefetch插件，避免加载多余的资源
    config.plugins.delete('prefetch');
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload');
    config.optimization.splitChunks({
      chunks: 'all'
    });
    chainWebpackGloablConfig(config);
    // 图片压缩
    chainWebpackImg(config);
    // 生产环境去除console
    chainWebpackNoConsole(config);
    // svg
    chainSvgRuleConfig(config);
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("autoprefixer")({
            browsers: 'last 5 version',
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8",
              "last 5 versions", // 所有主流浏览器最近10版本用
            ],
            grid: true,
          }),
          require("postcss-pxtorem")({
            rootValue: 37.5, // 结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
            propList: ["*"], // 是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
            unitPrecision: 5, // 保留rem小数点多少位
            //selectorBlackList: ['.radius'],  //则是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
            replace: true,
            mediaQuery: false, // 媒体查询( @media screen 之类的)中不生效
            minPixelValue: 12, // px小于12的不会被转换
          })
        ]
      },
      sass: {
        prependData: `
        @import "@/styles/variables.scss";
        `,
      },
      less: {
        modifyVars: {
          // hack: `true; @import "${mainTheme}";`
          hack: 'true; @import "~@/styles/vant-ui-main-theme.less"'
        }
      },
    },
  },
  configureWebpack: {
    // devtool: 'none',
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.json', '.sass', '.css', '.vue'],
    },
  },
};
~~~

## 组件

### Empty 空状态

~~~javascript
/**
 * @param description 描述信息 
 * @param image 图片
 * @return {*}
 */
<empty description="xxx" image="xxx" />
~~~

## 插件（plugins）

### loading加载

~~~javascript
/**
 * 利用vantUI van-loading 封装 
 * options参数可参考vantUI
 * 使用方法：
 * this.$loading.show(options) 调用 options 替换 defaultOptions 信息
 * this.$loading.close(); 关闭
 */
const defaultOptions = {
  size: '48', // 加载图标大小
  text: '加载中...', // 加载文案
  textColor: 'white', // 加载文案颜色
  textSize: '', // 加载文案大小
  iconColor: 'white', // 图标颜色
  type: '', // 加载图标的类型
  vertical: true // 垂直排列
};
~~~

### 隐私协议

~~~javascript
/**
 * 使用方法：
 * this.$privacyAc({ main: xxx });
 * 传需要展示的协议，目前协议是前端写死
 * main 参数 knt--恺恩泰服务协议, user--用户个人信息保护政策
 */
this.$privacyAc({ main: 'knt' });
this.$privacyAc({ main: 'user' });
~~~

### 支付成功失败弹窗

~~~javascript
// 默认配置
const defaultOptions = {
  icon: 'checked', // 图标
  title: '', // 标题
  subTitle: '', // 副标题
  buttonText: '确定' // 按钮文案
};
// 使用方法
this.$promptMessage({ title: 'xxx', buttonText: 'xxx' }, () => {});
~~~

## 自定义指令（directive）

### 防抖

~~~javascript
// 使用方法
<button v-debounce="debounceClick">防抖</button>
~~~

### 截流

~~~javascript
// 使用方法
<button v-throttle="debounceClick">截流</button>
~~~

### 长按

~~~javascript
// 使用方法
<button v-longpress="longpress">长按</button>
~~~

## 过滤器（filter）

-  toDecimal ：强制保留2位小数，不足补 0

## 工具方法（utils）

### 保留2位小数不足补0

~~~javascript
/**
 * @name: 保留两位小数 不足补0
 * @param {String | Number} value 要处理的数据
 * @param {Number} tofixed 保留几位小数
 * @return {*}
 */
toDecimal(num)
~~~

### GetQueryString

~~~javascript
/**
 * @name: 获取地址栏参数
 * @param {string} name 需要获取的参数
 * @return {*}
 */
GetQueryString(name)
~~~

### formatDate

~~~javascript
/**
 * @name: 日期格式化
 * @param {Date} objDate 'new Date()'
 * @param {string} fmt 'yyyy-MM-dd HH:mm:ss'(传入的格式)
 * @return {*}
 */
formatDate(new Date(), 'yyyy-MM-dd')
~~~

## 引用的依赖

~~~javascript
"@antv/f2": "^3.8.10-beta.1", // 阿里可视化图表
"amfe-flexible": "^2.2.1", // 自适应
"lodash": "^4.17.21", // js工具
"qiankun": "^2.6.3", // 微前端
"qrcodejs2": "^0.0.2", // 生成二维码
"svg-sprite-loader": "^6.0.11", // svg
"vant": "^2.12.36", // ui
"vue-clipboard2": "^0.3.3", // 复制
"vue-jsonp": "^2.0.0", // 调用第三方接口 jsonp 请求
"vuex-persistedstate": "^4.1.0" // 存储vuex内容
~~~