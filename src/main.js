import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n

import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';

import '@/icons'; // icon
import '@/permission'; // permission control

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
// import '../mock'; // simulation data

// https://www.itread01.com/articles/1488001229.html

Vue.use(ElementUI, { locale });

// 關閉生產模式下的提示
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
