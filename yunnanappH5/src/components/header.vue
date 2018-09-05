<template>
    <div ref="header" :style="color?color:''" class="header _cus_flexContent _cus_fleAlignCen _cus_justifyCen" :class="headerPath == 2?'_cus_posRelative':''" v-if="headerPath != 3 && headerPath != 4">
        <div class="colorfff _cus_posRelative _cus_overHidden search_box" @click.prevent.stop="touchVal" :class="headerPath == 2?'search_photo':'_cus_flex1'">
            <span class="_cus_posAbsolute search_icon"></span>
            <input type="text" class="_cus_posAbsolute search_mode" placeholder="搜索">
        </div>
        <div class="colorfff search_city _cus_overHidden" @click="select_city" v-show=" headerPath == 0">
            <span class="_cus_flexContent">
                <i class="inlineBlock menu_location"></i>
                <span class="lineHeight">{{city}}</span>
            </span>
        </div>
        <span class="gobroke" :class="headerPath == 2?'_cus_posAbsolute':''" v-if="headerPath == 2" @click="addphoto">+</span>
        <confirm
            class="confirm_alert"
            :value="hide_alert"
            button-text="确认"
            @on-cancel="onCancel"
            @on-confirm="onConfirm">
            <span>{{test_mag}}</span>
        </confirm>
        <actionsheet
        class="head_sheet"
        v-model="show"
        :menus="{
          menu1: '上传图片',
          menu2: '上传视频',
          menu3: '取消'
        }"
        @on-click-menu="click">
        </actionsheet>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { HttpService } from "../services/http.js";
import { coreApi } from "../services/coreApi.js";
import { loginApi } from "../services/loginApi.js";
import { UserService } from "../services/user.js";
import { loginService } from '../common/js/bridgeLogin.js';
import { adapted } from "../common/js/adapted.js";
import { upload } from '../common/js/bridgeUpload.js';
import { Actionsheet } from 'vux'
export default {
  components: {
    Actionsheet
  },
  data() {
    return {
      search_popup: false,
      city_popup: false,
      city: "云南省",
      cityObj: {},
      hide_alert: false,
      loading:true,
      test_mag:'',
      show:false,
      Model: '',
      bodys: {
        userId: ''
      }
    };
  },
  props: {
    headerPath: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(["getCityObj"]),
    ...mapState(['colorMsg']),
    color(){
      return `background-color:${this.colorMsg.color};`
    }
  },
  mounted() {
    this.cityObj = Object.assign(this.cityObj, this.getCityObj);
    this.city = this.cityObj.areaName || "云南省";
    this.Model = adapted.browser().versions.ios?'ios':adapted.browser().versions.android?'android':'';
    this.hide_alert = false;
  },
  watch:{
    '$route'(newVal,oldVal){
      if(newVal.path == '/system/home'){
        // console.log(this.getCityObj)
        if(this.getCityObj){
          this.city = this.getCityObj.areaName;
        }
      }
    }
  },
  methods: {
    click(items){
      // console.log(items)
      if(items == 'menu1'){
        upload.bridgeUpload(this.Model, this.bodys, 'uploadPic');
      }else if(items == 'menu2'){
        upload.bridgeUpload(this.Model, this.bodys, 'uploadVideo');
      }
    },
    touchVal() {
      let recomSetCode = "";
      if (this.headerPath == 0) {
        //首页点击搜索
        recomSetCode = "YNSJTXW";
      } else if (this.headerPath == 1) {
        //视频点击搜索
        recomSetCode = "YNSJTSP";
      } else if (this.headerPath == 2) {
        //我拍点击搜索
        recomSetCode = "YNSJTWP";
      }
      this.$router.push({
        path: "/public/searchmsg",
        query: { recomSetCode: recomSetCode }
      });
    },
    search_back() {
      this.$router.push({
        path: "/public/screencity"
      });
    },
     //取本地信息验证
    signIn(){
      let bodys = {};
      let local = UserService.get();
      bodys.account = local.account;
      bodys.accountType = local.accountType;
      bodys.userId = local.id;
      loginApi.valiLoginUser(bodys).then(r => {
          if (r.statusCode == "200" && r.status) {
              // this.getInfoUser()  //不需要了
              this.bodys.userId = r.user.id;

              // this.$router.push({
              //   path: "/myphoto/releasephoto"
              // });
              this.show = true;
          } else {
              this.hide_alert = true;
              this.test_mag = r.errorMessage;
          }
      });
    },
    // 登录验证
    getInfoUser(){
      // 调用gloabApi的api 参数是bodys r 接口返回的数据对象
      coreApi.getInfoUser().then(r => {
        if (r.statusCode == "200") {
          //登陆成功
          if (r.status && r.loginStatus) {
            // this.userId = r.data.userId;
            // this.$router.push({
            //     path: "/myphoto/releasephoto"
            // });
            this.show = true;
          } else{
            this.hide_alert = true;
            this.test_mag = "请先登录！";
            this.loading = false;
          }
        }
      });
    },
    addphoto() {
       UserService.get()?this.signIn():this.getInfoUser()
    },
    onHide() {},
    onShow() {},
    select_city() {
      this.$router.push({
        path: "/public/screencity"
      });
    },
    city_back() {
      this.city_popup = false;
    },
    onCancel(){
      this.hide_alert = false;
    },
    onConfirm() {
      // 弹窗隐藏
      if (!this.loading) {
        this.$router.push({
          path: "/login/login"
        });
      }
    }
  }
};
</script>
<style lang="less" src="./header.less">

</style>

