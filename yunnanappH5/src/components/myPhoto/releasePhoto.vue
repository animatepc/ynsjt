<template>
    <div class="releasePhoto">
        <div class="searchVal _cus_flexContent _cus_fleAlignCen">
            <span class="search_back" @click="city_back"></span>
            <span class="colorfff city_text">我拍</span>
            <span class="username_ready">
            	<span class="" @click="username_ready">提交</span>
            </span>
        </div>
        <div class="uploadImg_content">
            <upload-img class="uploadImg" :errorNetwork="networks" v-on:uploadImg="getImgList" @delImg="deleteImg"></upload-img>
            <textarea maxlength="100" name="" id="" v-model="release_txt" cols="5" rows="5"></textarea>
        </div>
        <alert
            class="login_alert"
            :value="hide_alert"
            button-text="确认"
            @on-show="alertShow"
            @on-hide="alertHide">
            <span>{{test_mag}}</span>
        </alert>
        <div  class="loading_msg">
          <loading :show="loadingShow" :text="loadingMsg"></loading>
        </div>
    </div>
</template>
<script>
//引用ajax
import UploadImg from "../../base/uploadImg/uploadImg.vue";
import { HttpService } from "../../services/http.js";
import { myPhotoApi } from "../../services/myPhotoApi.js";
import { coreApi } from "../../services/coreApi.js";
import { setTimeout } from 'timers';
import { Loading } from 'vux';
import { UserService } from '../../services/user';
export default {
  components: {
    UploadImg,
    Loading
  },
  data() {
    return {
      imgList: [],
      release_txt: "",
      hide_alert: false,
      test_mag: "",
      userId: "",
      isReady: false,
      login: true,
      networks: false,
      loadingShow: false,
      loadingMsg:''
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/myphoto/shootlist") {
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  },
  mounted() {
    // this.getInfoUser();
  },
  methods: {
    getInfoUser() {
      let bodys = {
        _jsonp: true,
        _jsonpCallback: "onBack"
      };
      // 调用gloabApi的api 参数是bodys r 接口返回的数据对象
      coreApi.getInfoUser(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          //登陆成功
          if (r.loginStatus) {
            this.userId = r.data.userId;
          } else {
            this.hide_alert = true;
            this.test_mag = "请先登录！";
            this.login = false;
          }
        } else {
          this.hide_alert = true;
          this.test_mag = "请先登录！";
          this.login = false;
        }
      });
    },
    getImgList: function(list) {
      this.networks = false;
      let bodys = {};
      bodys.list = JSON.stringify([list[list.length-1].file.src]);
      bodys.userId = UserService.get().id;
      // this.hide_alert = !this.hide_alert;
      // this.test_mag = '正在上传，请稍后...';
      this.loadingShow = true;
      this.loadingMsg = '正在上传,请稍后...';
      myPhotoApi.uploadFactImage(bodys).then(r => {
        if (r.status && r.statusCode == "200" && r.imgUrlList.length > 0){
           this.imgList.push(r.imgUrlList.join(''));
            this.loadingShow = false;
            this.loadingMsg = '上传成功~';
        }
      }).catch(r=>{
        if(r == 'Internal Server Error'){
          this.loadingMsg = "上传图片失败，请重试";
          setTimeout(()=>{
            this.loadingShow = false;
          },1000)
        }
      })
      // console.log(this.imgList)
    },
    //新增发布我拍
    insertMyPhoto() {
      // 请求data
      let bodys = {
        url: JSON.stringify(this.imgList), //url 图片或者视频地址
        content: this.release_txt, //我拍内容
        userId: UserService.get().id,
        type: 0 //type 0图片 1视频
      };
      if(this.imgList.length > 0){
         // 调用gloabApi的api 参数是bodys r 接口返回的数据对象
        myPhotoApi.insertMyPhoto(bodys).then(r => {
          if (r.statusCode == "200" && r.status) { 
            // 暂无提示
            //alert("接口调用成功");
            // console.log("接口调用成功");
            this.newMsg = r.list;
            this.hide_alert = true;
            this.test_mag = "上传成功";
            this.isReady = true;
          } else {
            // console.log("接口调用失败");
          }
        });
      } else{
          this.hide_alert = true;
          this.test_mag = "请上传至少一张图片";
      }
      if(this.release_txt.length > 0 && this.release_txt.length >= 100){
         this.hide_alert = true;
        this.test_mag = '请上传至少一张图片和不能超过100字';
      }
    },
    deleteImg(index){
      if(this.imgList.length > 0){
        this.imgList.splice(index,1)
      }
    },
    city_back() {
      this.$router.go(-1);
    },
    username_ready() {
      this.insertMyPhoto();
    },
    alertShow() {
      // 弹窗显示
    },
    alertHide() {
      this.hide_alert = false;
      // 弹窗隐藏
      if (this.isReady) {
        this.$router.push({
          path: "/myphoto/shootlist"
        });
      }
      if (!this.login) {
        this.$router.push({
          path: "/login/login"
        });
      }
      if(this.test_mag == "上传图片失败，请重试"){
        this.networks = true;
      }
    }
  }
};
</script>
<style lang="less">
.releasePhoto {
  margin-top: 1rem;
  height: (100vh - 1rem);
  overflow: hidden;
  background-color: #fff;
  .searchVal {
    width: 100%;
    height: 1rem;
    color: #fff;
    position: fixed;
    top: 0;
    z-index: 1;
    display: flex;
    line-height: 1rem;
    text-align: center;
    background: #f41a14;
    z-index: 2;
    .username_ready {
      position: absolute;
      right: 0.3rem;
      display: flex;
      align-items: center;
      .addfeedback_icon {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;

        margin-right: 0.1rem;
        background: url(../../../static/imgs/edit.png);
        background-repeat: no-repeat;
        background-size: 100%;
      }
    }
    .search_back {
      width: 0.22rem;
      height: 0.4rem;
      margin-left: 0.3rem;
      display: inline-block;
      background: url("../../../static/imgs/back.png") center center no-repeat;
      background-size: contain;
      z-index: 10;
    }
    .search_box {
      height: 0.6rem;
      color: #fff;
      flex: 1;
      position: relative;
      overflow: hidden;
      border: 2px solid #fff;
      border-radius: 0.1rem;
      .search_icon {
        width: 0.3rem;
        height: 0.3rem;
        background: url("../../../static/imgs/search.png") center center
          no-repeat;
        background-size: 0.3rem 0.3rem;
        z-index: 1;
        top: 0;
        left: 1.5rem;
        bottom: 0;
        margin: auto;
      }
      .search_mode {
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        padding-left: 2rem;
        outline: 0;
        text-align: left;
        box-sizing: border-box;
        display: block;
        font-size: 0.24rem;
        background-color: #f41a14;
        color: #fff;
        &::-webkit-input-placeholder {
          /*WebKit browsers*/
          color: #fff;
        }
        &::-moz-input-placeholder {
          /*Mozilla Firefox*/
          color: #fff;
        }
        &::-ms-input-placeholder {
          /*Internet Explorer*/
          color: #fff;
        }
      }
    }
    .search_city {
      height: 0.5rem;
      line-height: 0.5rem;
      //              margin: 0 0.3rem;
      margin-right: 0.3rem;
    }
    .city_text {
      position: absolute;
      left: 0;
      width: 100vw;
      text-align: center;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.32rem;
    }
  }
  .uploadImg_content {
    margin-top: 5rem;
    background-color: #fff;
    overflow: hidden;
    margin: 0.3rem;
    margin-bottom: 0.2rem;
    border: 2px solid #999;
    border-radius: 0.2rem;
    > textarea {
      width: 100%;
      padding: .15rem;
      padding-top: 0;
      min-height: 2rem;
      outline: none;
      border: none;
    }
  }
  .loading_msg{
    .weui-toast{
      width: auto;
      top: 3rem;
      padding: 0 .2rem;
    }
  }
}
</style>
