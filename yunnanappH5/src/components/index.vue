<template>
    <div class="" :class="pathWatch == 0 || pathWatch == 1 || pathWatch == 2?'index':''" ref="index">
        <m-header :header-path="pathWatch"></m-header>
        <router-view :class="pathWatch != 3 && pathWatch != 4?'content-box':''"></router-view>
        <m-footer :header-path="pathWatch" :ismode="ismode"></m-footer>
    </div>
</template>
<script>
import mFooter from "./menu.vue";
import mHeader from "./header.vue";
import { adapted } from "../common/js/adapted.js";
import { colorApi } from '../services/colorApi.js';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      // 0代表首页,1代表视频,2代表我拍,3代表云上TV,4代表我的
      pathWatch: 0,
      ismode: false
    };
  },
  components: {
    "m-footer": mFooter,
    "m-header": mHeader
  },
  created() {
    let routerPath = this.$router.history.current.path;
    this.mask_router(routerPath);

    // adapted.setStatusbar("backgroundColor:#f41a14");
    // adapted.plusReady(this, routerPath);
    
  },
  mounted(){
    this.$nextTick(()=>{
      // colorApi.bColor().then(r=>{
      //   // console.log(r)
      // })
    })
    
  },
  watch: {
    $route(to, from) {
      this.mask_router(to.path);
      adapted.plusReady(this, to.path);
    }
  },
  methods: {
    ...mapMutations({
      setColor:'saveColor'
    }),
    mask_router(items) {
      // console.log(items)
      let routerArr = [
        "system",
        "multimedia",
        "myphoto",
        "cloudtv",
        "mymodule"
      ];
      routerArr.forEach((e, index) => {
        if (items.includes(e)) {
          this.pathWatch = index;
        }
      });
      this.ismode =
        items.split("/")[1] == "mymodule" && items.split("/")[2] == "signin";
    }
  }
};
</script>
<style lang="less" src="./index.less"></style>
