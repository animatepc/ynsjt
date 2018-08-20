// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import LazyLoad from 'vue-lazyload'
import {JsBridge} from './common/js/bridge.js';
import $ from 'jquery';
import VueJsonp from 'vue-jsonp';
import '../static/js/flexible.js';
import './common/js/pinchzoom.js';

// import '../static/js/share.js';
// import '../static/js/weixin.js';

import {
        LoadingPlugin,
        Popup,
        Scroller,
        LoadMore,
        Tab,
        TabItem,
        Alert,
        Confirm,
        XInput,
        XButton,
        Group,
        Toast,
        ToastPlugin,
        XTextarea,
        Swiper,
        SwiperItem,
        Actionsheet,
        XDialog,
        ConfigPlugin //阻止body滚动
      } from 'vux'

Vue.config.productionTip = false

window.addEventListener('DOMContentLoaded',function(){
    fastclick.attach( document.body );
},false );

Vue.use(LazyLoad,{
  loading: './static/images/loading.png',
  error: './static/images/loading.png',
  attempt: 4,
  preLoad: 1.3,
  listenEvents:['scroll','wheel','mousewheel','resize','animationend','transitionend','touchmove'], //你想让vue监听的事件
})
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
})

Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(VueJsonp)

Vue.component('popup', Popup)
Vue.component('scroller', Scroller)
Vue.component('load-more', LoadMore)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('alert', Alert)
Vue.component('confirm', Confirm)
Vue.component('xInput', XInput)
Vue.component('xButton', XButton)
Vue.component('group', Group)
Vue.component('toast', Toast)
Vue.component('xTextarea',XTextarea)
Vue.component('swiper',Swiper)
Vue.component('swiper-item',SwiperItem)
Vue.component('actionsheet', Actionsheet)
Vue.component('x-dialog',XDialog)
import './assets/css/reset.css'
Vue.prototype.$bridge = JsBridge
Vue.prototype.$ = $

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
