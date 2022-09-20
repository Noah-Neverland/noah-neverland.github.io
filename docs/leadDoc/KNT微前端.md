---
title: 微前端
---

# KNT微前端

## 主应用

### 配置

~~~javascript
/* core --> app-config.js
 * @Descripttion: 需要注册的微应用
 */
const MicroApps = [
  // 孕产
  {
    name: 'pregnancy',
    // entry: '//192.168.2.46:8080',
    entry: '//localhost:8080',
    container: '#microContainer',
    activeRule: '/pregnancy'
  },
  // 儿科
  {
    name: 'pediatrics',
    entry: '//192.168.2.46:8082',
    container: '#microContainer',
    activeRule: '/pediatrics'
  }
];

export default MicroApps;

/* core --> index.js
 * @Descripttion: 全局注册微应用
 */
import Vue from 'vue';
import { registerMicroApps, start, initGlobalState } from 'qiankun';
import router from '../src/router';
import store from '../src/store';
import MicroApps from './app-config';

const _initState = {
  userInfo: store.state.userInfo
};

const apps = MicroApps.map((item) => {
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
Vue.prototype.$setGlobalState = actions.setGlobalState;

registerMicroApps(apps);
start({ prefetch: false });

/* src --> main.js
 * @Descripttion: 入口文件引入
 */
import '../core/index'; // 微应用配置
~~~

## 微应用

### 配置

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