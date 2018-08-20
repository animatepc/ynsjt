<template>
    <div class="videodetails">
        <div class="videodetails_back" @click="city_back" v-show="isFull">
            <i class="videodetails_icon" ></i>
        </div>
        <div class="videodetails_video _cus_posRelative">
            <div class="" :class="!isShow?'video_vh':'video'" ref="video_vh">
              <img v-if="(newsdetails_msg.isLive == 1 && (newsdetails_msg.liveStatus == '0' || newsdetails_msg.liveStatus == '20')) || newsdetails_msg.videoAddress == '' && newsdetails_msg.liveUrl == ''" v-lazy="newsdetails_msg.listShareImg" :key="newsdetails_msg.listShareImg">
              <video-play v-else :playInfo="playInfo" :changeStatus="changeStatus" @changeFull="changeFull" @isFull="FullActive"></video-play>
            </div> 
            <div class="new_wrap perW100 _cus_flexContent _cus_jusContent">
                <span>
                    <span>{{newsdetails_msg.title}}</span>
                </span>
                <span class="Block _cus_flexContent list_watch">
                  <i @click="clickCollection()" :class="isCollection==1?'collectActive':'collect'"></i>
                  <!-- <span>{{newsdetails_msg.virtualClickTimes}}</span> -->
                  <!-- <i class="news_watch"></i> -->
                  <img src="../../../static/imgs/share.png" @click="fatchBridge">
                </span>
            </div>
            <div class="list_box">
              <span>{{newsdetails_msg.liveTimeStr}}</span>
              <span class="_cus_flexContent _cus_fleAlignCen">
                  <span v-if="newsdetails_msg.isLive == 1 && newsdetails_msg.liveStatus == '10'" style="margin-right: .2rem;">
                    <span class="ft700">{{watchPeople}}</span>
                    人正在看
                  </span>
                  <span class="status_live Block" v-show="newsdetails_msg.isLive == 1" :class="newsdetails_msg.liveStatus == '0'?'live_state':newsdetails_msg.liveStatus == '20'?'live_state':'live_loading'">{{newsdetails_msg.liveStatus == '0'?'未开始':newsdetails_msg.liveStatus == '10'?'直播中':newsdetails_msg.liveStatus == '20'?'已结束':newsdetails_msg.liveStatus == '30'?'直播预告':newsdetails_msg.liveStatus == '40'?'直播回看':''}}</span>
              </span>
             
            </div>
        </div>
        <!-- height: calc(100vh - 5.9rem) -->
        	<!-- <scroller
            :lock-x="true"
            :scrollbarY="false"
            :bounce="false"
            ref="scroller"
            style="height: auto; " > -->
        	<div class="_cus_overHidden video_content" style="flex: 1;height: auto;overflow-y: scroll;">
	            <div class="_cus_overHidden">
	                <p class="_cus_flexContent _cus_jusContent _cus_overHidden">
	                    <span>
	                        <span>{{newsdetails_msg.createTimeStr}}</span>
	                        <span>{{newsdetails_msg.source}}</span>
	                    </span>
	                    <span class="isIcon" @click="isIcon = !isIcon">
	                    	简介 
	                    	<i class="video_icon" :class="isIcon?'video_icon_action':''"></i>
	                    </span>
	                </p>
	                <div class="video_introduce _cus_overHidden" :class="isIcon?'Block':'None'">
	                    <span>{{newsdetails_msg.introduction}}</span>
	                </div>
	                <p class="news_footer_title">相关推荐</p>
	            </div>
	            <ul class="home_list _cus_overHidden">
                  <li v-for="(item,keys) in newslists" :key="keys" class="_cus_flexContent" @click="Details_back(item)">
                      <div class="_cus_overHidden __cus_fl _cus_flex1 _cus_posRelative">
                          <span v-show="item.type =='tab'" class="source-handle-title">专题</span>
                          <label class="source-label">{{item.listTitle | htmlDecodeByRegExp}}</label>
                          <div class="tabImg _cus_posRelative" v-if="item.urlList.length > 0" v-show="item.type == 'tab' || item.type == 'tabVideo'" :class="item.type=='tabList'?'newslist _cus_posRelative':''">
                              <span class="video_live" v-show="item.isLive == 1" :class="item.liveStatus == '0'?'live_state':item.liveStatus == '20'?'live_state':'live_loading'">{{item.liveStatus == '0'?'未开始':item.liveStatus == '10'?'直播中':item.liveStatus == '20'?'已结束':item.liveStatus == '30'?'直播预告':item.liveStatus == '40'?'直播回看':''}}</span>
                              <img class="" v-lazy="item.urlList[0]" :key="item.urlList[0]" alt="">
                              <i class="video_playicon" v-show="item.type =='tabVideo'"></i>
                          </div>
                            <div  v-if="item.urlList.length > 0" v-show="item.type == 'tabTranslate'" class="_cus_overHidden tabTranslate" style="padding-bottom:0.5rem">
                              <ul class="" style="display:flex;justify-content:space-between">
                                  <li v-for="(img,keys) in item.urlList" :key="keys" >
                                      <img v-lazy="img" :key="img" alt="" style="width:2.15rem;height:1.44rem">
                                  </li>
                              </ul>
                          </div>
                          <p class="home_time _cus_overHidden color999" :class="item.type == 'tabList' || item.type ==  'tabAudio' || item.type ==  'tabTranslate'?'_cus_posAbsolute perW100':''">
                              <span v-show="item.type =='tabTranslate'" class="source-handle-title">置顶</span>
                              <span class="__cus_fl">
                                  <span>{{item.source}}</span>
                                  <span class="">{{item.createTimeStr}}</span>
                              </span>
                              <span class="__cus_fr">
                                  <!-- <span>{{item.virtualClickTimes}}</span> -->
                                  <!-- <span class="new_watch"></span> -->
                              </span>
                          </p>
                      </div>
                      <div v-if="item.urlList.length > 0" v-show="item.type == 'list' || item.type == 'tabList' || item.type == 'tabAudio'" class="_cus_overHidden __cus_fr imageNews-img">
                          <img v-lazy="item.urlList[0]" :key="item.urlList[0]" alt="">
                          <i class="audio_icon" v-show="item.type == 'tabAudio'"></i>
                      </div>
                  </li>
              </ul>
        	</div>
        	<!-- </scroller> -->
        <confirm
            class="confirm_alert"
            :value="hide_alert"
            button-text="确认"
            @on-confirm="onConfirm"
            @on-cancel="onCancel">
            <span>{{test_mag}}</span>
        </confirm> 
        <toast :value="toast.toastShow" type="text" width="auto" :text="toast.toastText" position="bottom" class="toast_alert"></toast>
        <popup v-model="show" @on-hide="popupHide" @on-show="popupShow">
          <div class="bgfff popup_content">
             <fieldset class="login_field">
                <legend>分享到</legend>
            </fieldset>
             <ul class="_cus_flexContent _cus_textCenter">
              <li class="_cus_flex1">
                <img src="../../../static/images/qqFriendShare.png" alt="" @click="qqFriendShare" class="">
                <span class="color666">QQ好友</span>
              </li>
              <li class="_cus_flex1">
                <img src="../../../static/images/qqZoneShare.png" alt="" @click="qqZoneShare" class="">
                <span class="color666">QQ空间</span>
              </li>
              <li class="_cus_flex1">
                <img src="../../../static/images/weiXinFriendShare.png" alt="" @click="weiXinFriendShare"  class="">
                <span class="color666">朋友圈</span>
              </li>
              <li class="_cus_flex1">
                <img src="../../../static/images/weiXinCircleShare.png" alt="" @click="weiXinCircleShare"  class="">
                <span class="color666">微信好友</span>
              </li>
              <li class="_cus_flex1">
                <img src="../../../static/images/weiboShare.png" alt="" @click="weiboShare"  class="">
                <span class="color666">微博</span>
              </li>
            </ul>
            <div>
            </div>
            <x-button @click.native="show = false">取消</x-button>
          </div>
      </popup>
    </div>
</template>
<script>
import VideoPlay from "../playmodule/playmodule.vue";
import { HttpService } from "../../services/http.js";
import { newsApi } from "../../services/newsApi.js";
import { commonApi } from "../../common/js/common.js";
import { adapted } from "../../common/js/adapted.js";
import { loginApi } from '../../services/loginApi.js';
import { coreApi } from '../../services/coreApi.js';
import { UserService } from '../../services/user.js';
import { mapState, mapMutations } from 'vuex';
import { Share } from '../../common/js/bridgeShare.js';
import { shareWx } from '../../common/js/shareWeixin.js';
import { sms } from '../../services/commonApi.js'; 
import $ from "jquery";
import { clearTimeout } from 'timers';
export default {
  components: {
    VideoPlay
  },
  data() {
    return {
      isIcon: false,
      newsdetails_msg: {},
      newslists: [],
      videoAddress: "",
      liveStatus: "",
      hide_alert: false,
      test_mag: "请确定是否登录?",
      toast: {
        toastShow: false,
        toastText: "收藏成功"
      },
      isCollection: 0,
      videoLabel: this.$router.history.current.query.videoLabel,
      playInfo: {},
      thisWidth: "",
      oldWidth: document.documentElement.offsetWidth,
      isShow: true,
      isFull: true,
      path: "",
      changeStatus: "",
      show: false,
      watchPeople: '',
      timer: null
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/system/home") {
      to.meta.keepAlive = true;
    } else if (to.path == "/public/searchlist") {
      to.meta.keepAlive = true;
    } else if(to.path == "/multimedia/video") {
      to.meta.keepAlive = true;
    } else if(to.path == "/mymodule/mycollection") {
      to.meta.keepAlive = true;
    } else if(to.path == "/mymodule/recordhist") {
      to.meta.keepAlive = true;
    } else if(to.path.includes('/public/videodetails')) {
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  },
  computed: {
    videoStatus() {
      let videoLabel = this.$router.history.current.query.videoLabel;
      return videoLabel == "0"
        ? "未开始"
        : videoLabel == "10"
          ? "直播中"
          : videoLabel == "20"
            ? "已结束"
            : videoLabel == "30"
              ? "直播预告"
              : videoLabel == "40" ? "直播回看" : "";
    },
    ...mapState(['loginMsg'])
  },
  mounted() {
    this.path = this.$route.path;
    this.changeStatus = "play";
    this.model = adapted.browser().versions.ios?'ios':adapted.browser().versions.android?'android':'';
    shareWx.getQueryString('videodetails'); 
  },
  beforeDestroy() {
      if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
          clearInterval(this.timer); //关闭
          console.log('已经离开播放页');
      }
  },
  watch: {
    path(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$nextTick(()=>{
          this.getNewsList();
        })
      }
    }
  },
  filters:{
    htmlDecodeByRegExp(item) {
      let str = item;
      var s = "";
      // if (str.length == 0) return "";
      s = str.replace(/&amp;/g, "&");
      s = str.replace(/&lt;/g, "<");
      s = str.replace(/&gt;/g, ">");
      s = str.replace(/&nbsp;/g, " ");
      s = str.replace(/&#39;/g, "'");
      s = str.replace(/&quot;/g, '"');
      return s;
    }
  },
  methods: {
    random(num, peo, date, length){
        let ceil = Math.ceil(Math.random()*(30-5+1)+5); //随机增加时间
        let people = Math.ceil(Math.random()*(50-5+1)+5) //随机在线人数
        num += ceil;
        peo += people;
        this.timer = setTimeout(()=>{
            if(num < date || people < length){
                this.random(num, peo, date, length);
                console.log('当前观看人数'+peo);
                this.watchPeople += peo;
            }else{
                console.log('直播已结束');
                this.random = null;
                clearTimeout(this.timer);
                return;
            }
        },ceil * 1000)
    },
    fatchBridge(){
      // 
      if(this.model == 'ios'){
        this.show = true;
      }else{
        let bodys = {
          img: this.newsdetails_msg.listShareImg != '' && this.newsdetails_msg.listShareImg ?this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png',
          title: this.newsdetails_msg.title,
          introduce: '',
          url: window.location.href
        };
        Share.bridgeShart(bodys,this.model, 'OpenShareMenu')
      }
    },
    popupHide(){
      this.show = false;
    },
    popupShow(){

    },
    removeHTMLTag(description) {
          description = description.replace(/(\n)/g, "");  
          description = description.replace(/(\t)/g, "");  
          description = description.replace(/(\r)/g, "");
          description = description.replace(/\s*/g, "");
          description = description.replace(/<[^>]+>/g, "")
          description = description.replace(/[a-z,A-Z,&,/,=,;,-,:,-,.-]/g, '')
          return description.substring(0,20)
    },
    qqZoneShare(){
      let bodys = {
        // img: this.newsdetails_msg.listShareImg,
        img: this.newsdetails_msg.listShareImg != '' && this.newsdetails_msg.listShareImg ?this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png',
        title: this.newsdetails_msg.title,
        introduce: '',
        url: window.location.href,
        // type: ''
      };
      Share.bridgeShart(bodys,this.model, 'qqZoneShare')
    },
    qqFriendShare(){
      let bodys = {
        img: this.newsdetails_msg.listShareImg != '' && this.newsdetails_msg.listShareImg ?this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png',
        title: this.newsdetails_msg.title,
        introduce: '',
        url: window.location.href
      };
      if(this.model == 'ios'){
        Share.bridgeShart(bodys,this.model, 'qqFriendShare')
      }else{
        Share.bridgeShart(bodys,this.model, 'qqFirendShare')
      }
      
    },
    weiXinFriendShare(){
      // ynsjt://
      let bodys = {
        // img: this.newsdetails_msg.listShareImg,
        img: this.newsdetails_msg.listShareImg != '' && this.newsdetails_msg.listShareImg ?this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png',
        title: this.newsdetails_msg.title,
        introduce: '',
        url: window.location.href
      };
      Share.bridgeShart(bodys,this.model, 'weiXinFriendShare')
    },
    weiXinCircleShare(){
      // WXSceneTimeline
      let bodys = {
        // img: this.newsdetails_msg.listShareImg,
        img: this.newsdetails_msg.listShareImg != '' && this.newsdetails_msg.listShareImg ?this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png',
        title: this.newsdetails_msg.title,
        introduce: '',
        url: window.location.href
      };
      Share.bridgeShart(bodys,this.model, 'weiXinCircleShare')
      
    },
    weiboShare(){
      let bodys = {
        // img: this.newsdetails_msg.listShareImg,
        img: this.newsdetails_msg.listShareImg != '' && this.newsdetails_msg.listShareImg ?this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png',
        title: this.newsdetails_msg.title,
        introduce: '',
        url: window.location.href
      };
      Share.bridgeShart(bodys,this.model, 'weiboShare')
    },
    FullActive(msg) {
      this.isFull = !msg;
      // !this.isFull?this.$bridge.callhandler('full', $("body").hasClass('full').toString()):''
    },
    changeFull(msg) {
      // alert(2)
      this.model == 'ios'?this.isShow = !msg:'';
      this.isFull = !msg;
    },
    //放播放器播放/暂停
    changVideo() {
      this.changeStatus = this.changeStatus == "play" ? "pause" : "play";
    },
    playAuto(self) {
      // console.log(self)
      this.playInfo = {
        url: self.url,
        type: 90,
        id: self.id,
        img: self.img,
        isShowChannal: false
      };
    },
    onConfirm() {
      this.$router.push({
        path: "/login/login"
      });
    },
     onCancel(){
      this.hide_alert = false;
    },
    clickCollection() {
      this.toast.toastShow = false;
      var id = this.$router.history.current.query.id;
      let bodys = {
        _json: false, //参数类型 formdata/json
        _jsonp: true, //dataType: jsonp true/false
        _jsonpCallback: "onBack" //请求接口返回的callback
      };
      bodys.refType = 30;
      bodys.refId = id;
      // console.log(bodys);
      commonApi.Collection(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          this.toast.toastShow = true;
          this.isCollection = this.isCollection == 1 ? 0 : 1;
          this.toast.toastText =
            this.isCollection == 1 ? "收藏成功!" : "取消收藏成功!";
        } else {
          this.hide_alert = true;
          this.test_mag = r.errorMessage;
        }
      });
    },
    getNewsList() {
      // debugger
      let params = this.$router.history.current.query;
      newsApi.getNewsDetails(params).then(r => {
        if (r.status && r.statusCode == "200") {
          this.isCollection = r.data.isCollection;
          this.newsdetails_msg = r.data;
          let bodys = {};
          bodys.url = r.data.isLive == 1?r.data.liveStatus == 10?r.data.liveUrl:r.data.liveStatus == 30?r.data.videoAddress:r.data.liveStatus == 40?r.data.videoAddress:'':r.data.videoAddress;
          bodys.id = r.data.id;
          bodys.img = r.data.listShareImg;
          this.playAuto(bodys);
          //视频地址
          this.videoAddress = r.data.videoAddress;
          //直播状态:0未开始 10直播中 20已结束 30直播预告 40直播回看
          this.liveStatus = r.data.liveStatus;
          let data = r.data.contentList;
          for (var i = 0; i < data.length; i++) {
            switch (data[i].contentType) {
              case "30":
                data[i]["type"] = "tabVideo";
                break;
              case "10":
                data[i]["type"] = "list";
                break;
              case "40":
                data[i]["type"] = "tabAudio";
                break;
              case "20":
                data[i]["type"] = "tabTranslate";
                break;
              case "60":
                data[i]["type"] = "tab";
                break;
              case "50":
                data[i]["type"] = "tabList";
                break;
            }
          };
            this.newslists = data;
            this.watchPeople = Number(this.newsdetails_msg.onLineNum);
          // if(this.newsdetails_msg.isLive == 1 && this.newsdetails_msg.liveStatus == '10'){
            console.log('正在直播...');
            //初始化时间，基数，小时转化为秒数，总观看数
            let s = 3 * 60 *  60;
            let totalTime = Math.ceil(Math.random()*(300000-200000+200000)+200000); //随机增加时间
            this.random(0,Number(this.newsdetails_msg.onLineNum) - Number(this.newsdetails_msg.onLineNum),s,totalTime);
          // };

        } else {
          this.newsdetails_msg = {};
        }

        // 记住登录状态
        this.$nextTick(()=>{
          this.getInfoUser();
        });

        // 微信分享方法
        var _this = this;
        var url =window.location.href.split('#')[0];
        var shareData = {
              title: _this.newsdetails_msg.title, 
              desc: '',
              imgUrl: _this.newsdetails_msg.listShareImg != '' && _this.newsdetails_msg.listShareImg ?_this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png', 
              link: window.location.href.split('#')[0]+'#'+window.location.href.split('#')[1]
        }; 
        shareWx.share(`${sms}weichatShare/sign.do?url=${url}`, {}, shareData, ['wx','firends','wb','qq','zone']);
      });
    },
    // 记住登录状态
    ...mapMutations({
        setloginMsg:'savelogin'
    }),
    getInfoUser(){
        coreApi.getInfoUser().then(r => {
            if (r.statusCode == "200") {
            //登陆成功
            if (r.status && r.loginStatus) {
                // console.log(this.loginMsg)
            } else{
                // this.hide_alert = true;
                // this.test_mag = "请先登录！";
            }
            this.setloginMsg(r);
            let loginMsg = this.loginMsg;
            let userMsg = UserService.get();
            !loginMsg.loginStatus && userMsg?this.loginStatus(userMsg):''
            }
        });
    },
    loginStatus(userMsg){
        let bodys = {};
        bodys.account = userMsg.account;
        bodys.accountType = userMsg.accountType;
        bodys.userId = userMsg.id;
        loginApi.valiLoginUser(bodys).then(r=>{});
    },
    city_back() {
      this.$router.go(-1);  
       setTimeout(() => {
        this.path = this.$route.path;
      }, 200);
    },
    Details_back(items) {
      let data = items.contentType;
      let path = "";
      switch (data) {
        case "30":
          path = `/videodetails/${items.id}`;
          break;
        case "10":
          path = `/newsdetails/${items.id}`;
          break;
        case "20":
          path = `/atlasdetails/${items.id}`;
          break;
        case "40":
          path = `/audiodetails/${items.id}`;
          break;
        case "60":
          path = `/specialdetails/${items.id}`;
          break;
        case "50":
          items.seriesType == "0"
            ? (path = `/programdetails/${items.id}`)
            : items.seriesType == "10"
              ? (path = `/videochannel/${items.id}`)
              : path = `/programdetails/${items.id}`;
          break;
      }
      let Json = {
        refType: items.contentType,
        id: items.id,
        columnCode: items.columnCode
      };
      this.$router.push({
        path: `/public${path}`,
        query: Json
      });
      this.newsdetails_msg = {};
      this.path = this.$route.path;
    }
  }
};
</script>
<style lang="less">
.videodetails {
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .videodetails_back {
    width: 0.6rem;
    height: 0.6rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    position: fixed;
    left: 0.2rem;
    top: 0.2rem;
    z-index: 1000;
    .videodetails_icon {
      width: 0.36rem;
      height: 0.36rem;
      background: url("../../../static/imgs/back.png") center center no-repeat;
      background-size: contain;
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .videodetails_video {
    padding: 0;
    width: 100%;
    overflow: hidden;
    z-index: 99;
    background: #fff;
    min-height: 5.5rem;
    border-bottom: .02rem solid #eee;
    padding-bottom: 0.3rem;
    .video {
      height: 4.2rem;
      >img{
        width: 100%;
      }
    }
    > .new_wrap {
      z-index: 1;
      color: #b3b3b3;
      overflow: hidden;
      padding: 0.3rem;
      line-height: 0.34rem;
      display: flex;
      align-items: flex-start;
      > span:last-child {
        display: flex;
        align-items: flex-start;
        > img {
          width: 0.3rem;
          height: 0.3rem;
          display: block;
          float: left;
          margin-left: 0.03rem;
          // margin-right: 0.5rem;
          transform: rotate(0deg) !important;
        }
        > .news_watch {
          display: inline-block;
          width: 0.29rem;
          height: 0.3rem;
          line-height: 0.3rem;
          margin-bottom: 0.04rem;
          display: inline-block;
          vertical-align: middle;
          margin-left: 0.1rem;
          background: url(../../../static/imgs/eye.png) no-repeat left center;
          background-size: 100%;
        }
      }
    }
  }
  .video_content {
    > div:nth-of-type(1) {
      > p {
        padding:0 .3rem;
        overflow: hidden;
        min-height: 0.84rem;
        line-height: 0.84rem;
        .video_icon {
          display: inline-block;
          width: 0.22rem;
          height: 0.22rem;
          transform: rotate(90deg);
          transition: all 0.5s;
          background: url("../../../static/imgs/arroe.png") no-repeat;
          background-size: contain;
        }
        .video_icon_action {
          transform: rotate(180deg);
        }
      }
      .video_introduce {
        padding: 0 .3rem;
        height: auto;
      }
      .Block {
        display: block;
      }
      .None {
        display: none;
      }
      .news_footer_title {
        font-size: .32rem;
        height: 0.8rem;
        background-color: #ffffff;
        border-bottom: solid .04rem #eee;
        line-height: 0.8rem;
        padding:0 .3rem;
      }
    }
  }
  .list_box {
    overflow: hidden;
    padding: 0 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .video_state {
      background-color: rgba(0, 0, 0, 0.5);
    }
    .video_loading {
      background-color: #f41a14;
    }
    .status_live {
      display: block;
      padding: 0.1rem;
      color: #fff;
      font-size: 0.24rem;
    }
  }
  .video_vh {
    height: 100vh;
  }
  .isIcon {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  .tabImg {
    margin: 0.3rem 0 !important;
  }
}
</style>

