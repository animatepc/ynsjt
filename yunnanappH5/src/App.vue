<template>
  <div id="app" v-cloak>
    <keep-alive> 
      <router-view v-if="$route.meta.keepAlive"></router-view> 
    </keep-alive> 
    <router-view v-if="!$route.meta.keepAlive"></router-view>
     <div id="globalLoading" style="display: none;">
      <ui-loading></ui-loading>
    </div>
    <!-- <div id="errornetwork" style="display: none;">
      <error-network @handlerError="handlerError"></error-network>
    </div> -->
  </div>
</template>

<script>
import uiLoading from "./base/loading/loading.vue";
import errorNetwork from './base/error/errorNetwork.vue';
import { adapted } from "./common/js/common.js";
export default {
  name: "App",
  components: {
    uiLoading,
    errorNetwork
  },
  methods:{
    handlerError(item){
      console.log(this.$route);
      this.$router.go(0)
    }
  }
};
</script>

<style lang="less">
@import "./less/_global";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
#globalLoading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3111;
}
[v-clock]{
  display: none !important;
}
</style>
