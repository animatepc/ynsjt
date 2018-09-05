<template>
    <div class="videoChannel  _cus_flexContent _cus_direction perH100">
        <div class="videodetails_back" @click="city_back" v-show="isFull">
            <i class="videodetails_icon" ></i>
        </div>
        <div class="videodetails_video _cus_posRelative">
            <div class="" :class="!isShow?'video_vh':'video'">
              <img v-if="(newsdetails_msg.isLive == 1 && (newsdetails_msg.liveStatus == '0' || newsdetails_msg.liveStatus == '20')) || (newsdetails_msg.videoAddress == '' && newsdetails_msg.liveUrl == '')" v-lazy="newsdetails_msg.listShareImg" :key="newsdetails_msg.listShareImg">
              <video-play v-else :playInfo="playInfo"  @changeFull="changeFull" @isFull="FullActive"></video-play>
            </div>
            <p class="new_wrap perW100 _cus_flexContent _cus_jusContent" v-show="isShow">
                <span>
                    <span>{{newsdetails_msg.title}}</span>
                    <!-- <span>{{newsdetails_msg.title}}</span> -->
                </span>
                <span>
                    <span>{{newsdetails_msg.virtualClickTimes}}</span>
                    <i class="news_watch"></i>
                    <i @click="clickCollection()" :class="isCollection==1?'collectActive':'collect'"></i>
                    <img src="../../../static/imgs/share.png" @click="fatchBridge">
                </span>
            </p>
            <p class="_cus_flexContent _cus_jusContent _cus_fleAlignCen _cus_overHidden" v-show="isShow">
                <span>
                    <span>{{newsdetails_msg.watchDateStr}}</span>
                    <span>{{newsdetails_msg.source}}</span>
                </span>
                <span class="isIcon" @click="isIcon = !isIcon">
                    简介 
                    <i class="video_icon" :class="isIcon?'video_icon_action':''"></i>
                </span>
            </p>
            <div class="video_introduce _cus_overHidden" :class="isIcon?'Block':'None'" v-show="isShow">
                <span>{{newsdetails_msg.introduction}}</span>
            </div>
        </div>
        	<!-- <scroller
            v-show="isShow"
            :lock-x="true"
            :scrollbarY="true"
            :bounce="false"
            style="height: auto"
            class="bgfff videodetails_introduce"> -->
          <div class="bgfff videodetails_introduce" style="flex: 1;height: auto;overflow-y: scroll;">
         <div class="color333 channel">
            <div class="_cus_flexContent _cus_jusContent _cus_fleAlignCen _cus_overHidden" v-show="isShow">
                <span>
                    <span>剧集</span>
                </span>
                <span class="" @click="isHide = !isHide">
                    <i class="video_icon" :class="isHide?'video_icon_action':''"></i>
                </span>
            </div>
            <div class="video_introduce _cus_overHidden" :class="isHide?'Block':'None'" v-show="isShow">
              
               <ul class="program_list">
                    <li v-for="(item,keys) in setList" :key="keys" @click="tabProgram(item,keys)" :style="keys === liveIndex?colorText:''">
                      {{item.watchDateStr}}</li>
               </ul>
            </div>
         </div>
        	<div class="_cus_overHidden video_content">
            <div class="_cus_overHidden videoBox" v-show="isShow">
              <p class="news_footer_title">相关推荐</p>
          </div>
          <ul class="home_list _cus_overHidden">
                  <li v-for="(item,keys) in newslists" :key="keys" class="_cus_flexContent" @click="Details_back(item)">
                      <div class="_cus_overHidden __cus_fl _cus_flex1 _cus_posRelative">
                          <span v-show="item.type =='tab'" class="source-handle-title">专题</span>
                          <label class="source-label">{{item.listTitle | htmlDecodeByRegExp}}</label>
                          <div class="tabImg _cus_posRelative" v-if="item.urlList.length > 0" v-show="item.type == 'tab' || item.type == 'tabVideo'" :class="item.type=='tabList'?'newslist _cus_posRelative':''">
                              <span class="video_live" v-show="item.isLive == 1" :class="item.liveStatus == '0'?'live_state':item.liveStatus == '20'?'live_state':'live_loading'">{{item.liveStatus == '0'?'未开始':item.liveStatus == '10'?'直播中':item.liveStatus == '20'?'已结束':item.liveStatus == '30'?'直播预告':item.liveStatus == '40'?'直播回看':''}}</span>
                              <img class="" v-lazy="item.urlList[0]" alt="" :key="item.urlList[0]">
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
                                  <span>{{item.virtualClickTimes}}</span>
                                  <span class="new_watch"></span>
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
    </div>
</template>
<script>
import { HttpService } from "../../services/http.js";
import { newsApi } from "../../services/newsApi.js";
import { commonApi } from "../../common/js/common.js";
import VideoPlay from "../playmodule/playmodule.vue";
import { mapState, mapMutations } from "vuex";
import { loginApi } from '../../services/loginApi.js';
import { coreApi } from '../../services/coreApi.js';
import { UserService } from '../../services/user.js';
import { adapted } from "../../common/js/adapted.js";
import { Share } from '../../common/js/bridgeShare.js';
import { shareWx } from '../../common/js/shareWeixin.js';
import { sms } from '../../services/commonApi.js'; 
import $ from "jquery";
export default {
  components: {
    VideoPlay
  },
  data() {
    return {
      isIcon: false,
      isHide: false,
      newsdetails_msg: {},
      newslists: [],
      videoAddress: "",
      liveStatus: "",
      news_List: [
        {
          label: "对仗不工整上下联挂反 昆明老街多幅对联被指“没文化",
          soure: "昆明信息港",
          timer: "1天前",
          watch_num: 30,
          type: "list"
        },
        {
          label: "滇池大坝12组新建景观雕塑全部完工 正式与市民见面",
          soure: "春城晚报",
          timer: "1天前",
          watch_num: 4,
          type: "list"
        },
        {
          label: "昆明市将实施献血条例：献血满5次终生免交临床用血费",
          soure: "春城晚报",
          timer: "1天前",
          watch_num: 4,
          type: "list"
        },
        {
          label: "昆明今后违法排污将面临最高50万元罚款",
          soure: "春城晚报",
          timer: "1天前",
          watch_num: 4,
          type: "list"
        },
        {
          label: "最美云南 秘境百马",
          price: require("../../../static/imgs/contentimg.jpg"),
          tab: "专题",
          timer: "2天前",
          type: "tab"
        },
        {
          label: "名声关注",
          price: require("../../../static/imgs/contentimg.jpg"),
          watch_num: 158,
          timer: "2天前",
          type: "tablist"
        },
        {
          label: "客车追尾大货车 男子被困消防营救",
          price: require("../../../static/imgs/contentimg.jpg"),
          watch_num: 85,
          timer: "2天前",
          type: "tab_video"
        }
      ],
      setList: [],
      newsdetails_msg: [],
      hide_alert: false,
      test_mag: "请确定是否登录?",
      toast: {
        toastShow: false,
        toastText: "收藏成功"
      },
      isCollection: 0,
      playInfo: {},
      img: "",
      url: " ",
      thisWidth: "",
      thisHeight: "",
      isShow: true,
      isFull: true,
      watchId: "",
      color: "",
      liveIndex: ""
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/system/home") {
      to.meta.keepAlive = true;
    } else if (to.path == "/public/searchlist") {
      to.meta.keepAlive = true;
    } else if(to.path == "/multimedia/video"){
      to.meta.keepAlive = true;
    } else if(to.path == "/mymodule/mycollection"){
      to.meta.keepAlive = true;
    } else if(to.path == "/mymodule/recordhist"){
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    from.meta.keepAlive = false;
    next();
  },
  mounted() {
    this.$nextTick(()=>{
      this.getNewsList();
    });
    this.model = adapted.browser().versions.ios?'ios':adapted.browser().versions.android?'android':'';
    shareWx.getQueryString('videodetails',this.$route); 
  },
  computed: {
    ...mapState(["colorMsg","loginMsg"]),
    colorText() {
      return `border: 1px solid ${this.colorMsg.color}; color: ${
        this.colorMsg.color
      }`;
    }
  },
  watch: {
    watchId(newVal, oldVal) {
      if (newVal != oldVal) {
        let bodys = {};
        bodys.id = newVal;
        bodys.refType = 30;
        this.getNewsList(bodys);
      }
    }
  },
  filters: {
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
    fatchBridge(){
      // 
      if(this.model == 'ios'){
        // this.show = true;
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
    FullActive(msg) {
      this.isFull = !msg;
      // this.isShow = !msg;
      this.isIcon = !this.isIcon;
      this.$nextTick(()=>{
        this.$refs.scroller.reset();
      })
    },
    changeFull(msg) {
      this.isFull = !msg;
      this.isShow = !msg;
    },
    playAuto(self) {
      this.playInfo = {
        url: self.url,
        type: 90,
        id: self.id,
        img: self.img,
        isShowChannal: false
      };
      this.url = self.url;
      this.img = self.img;
    },
    tabProgram(items, keys) {
      this.playInfo = {
        url: this.url,
        type: 90,
        id: items.id,
        img: this.img,
        isShowChannal: false
      };
      this.watchId = items.id;
      this.liveIndex = keys;
    },
    onConfirm() {
      this.$router.push({
        path: "/login/login"
      });
    },
    onCancel() {
      this.hide_alert = false;
    },
    clickCollection() {
      this.toast.toastShow = false;
      var id = this.$router.history.current.query.id;
      let bodys = {
        _json: false //参数类型 formdata/json
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
    getNewsList(tabPlay) {
      let params = tabPlay ? tabPlay : this.$route.query;
      newsApi.watchPlay(params).then(r => {
        if (r.status && r.statusCode == "200") {
          this.isCollection = r.data.isCollection;
          this.newsdetails_msg = r.data;
          // console.log(r.data)
          let bodys = {};
          bodys.id = this.newsdetails_msg.id;
          bodys.img = this.newsdetails_msg.thumbnail;
          bodys.url = r.data.isLive == 1?r.data.liveUrl:r.data.videoAddress;
          this.playAuto(bodys);
          //视频地址
          //   this.videoAddress = r.data.videoAddress;
          //直播状态:0未开始 10直播中 20已结束 30直播预告 40直播回看
          this.setList = r.list;
          let data = r.associatedList;
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
          }
          this.newslists = data;
        } else {
          this.newsdetails_msg = [];
        }
        // 记住登录状态
        this.$nextTick(()=>{
          let loginMsg = this.loginMsg;
          loginMsg.status == ''?this.getInfoUser():''
        });
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
    }
  }
};
</script>
<style lang="less">
.videoChannel {
  height: 100vh;
  overflow: hidden;
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
    width: 100%;
    z-index: 99;
    background: #fff;
    .video {
      height: 4.2rem;
    }
    > .new_wrap {
      color: #b3b3b3;
      overflow: hidden;
      border-bottom: 0.01rem solid #eee;
      padding: 0.3rem;
      line-height: 0.34rem;
      > span:last-child {
        display: flex;
        align-items: flex-start;
        > img {
          width: 0.3rem;
          height: 0.3rem;
          display: block;
          float: left;
          margin-left: 0.03rem;
          margin-right: 0.5rem;
          transform: rotate(0deg) !important;
        }
        > img:last-child{
          margin-right: 0;
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
          margin-right: .1rem;
          background: url(../../../static/imgs/eye.png) no-repeat left center;
          background-size: 100%;
        }
      }
    }
    > p:nth-of-type(2),
    > p:nth-of-type(3) {
      padding: 0 0.3rem;
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
  }
  .video_introduce {
      height: auto;
      padding: .2rem 0;
      .program_list {
        padding-left: .2rem;
        height: auto;
        overflow: hidden;
        > li {
          display: inline-block;
          width: 2rem;
          height: 0.72rem;
          line-height: 0.72rem;
          border: 1px solid #bfbfbf;
          border-radius: 0.04rem;
          margin-right: 0.2rem;
          margin-bottom: 0.3rem;
          text-align: center;
          box-sizing: border-box;
        }
        > li:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
    .Block {
      display: block;
    }
    .None {
      display: none;
    }
    .channel{
      padding: 0 0.3rem;
      >div:nth-child(1){
        font-size: .26rem;
      }
    }
  .videodetails_introduce {
    background-color: #fff;
    color: #999;
    .video_content {
      .videoList {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0.3rem;
        border-bottom: .02rem solid #eee;
        > div:nth-child(1) {
          flex: 1;
          > span:nth-child(1) {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          > p:nth-child(2) {
            color: #999999;
            margin-top: 0.1rem;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            > span:nth-child(1) {
              margin-right: 0.2rem;
            }
          }
        }
        > div:nth-child(2) {
          width: 2.2rem;
          height: 1.2rem;
          margin-left: 0.1rem;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .home_list {
        > li {
          padding: 0.2rem 0.3rem;
          box-sizing: border-box;
          .source-handle-title {
            margin-right: 0.15rem;
            margin-top: 0.033rem;
            float: left;
            color: #f41a14;
            border: 2px solid #f41a14;
            text-align: center;
            line-height: 1.5;
            padding: 0 0.1rem;
            font-size: 0.24rem;
            border-radius: 0.1rem;
          }
          .source-label {
            color: #000;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-align: justify;
            line-height: 0.48rem;
          }
          .tabImg {
            width: 100%;
            height: 3.4rem;
            margin-top: 0.3rem;
            margin-bottom: 0.3rem;
            > img {
              vertical-align: middle;
              width: 100%;
              height: 100%;
              z-index: 1;
            }
            > .video_playicon {
              width: 1.06rem;
              height: 1.06rem;
              position: absolute;
              top: 50%;
              left: 50%;
              margin-top: -0.58rem;
              margin-left: -0.58rem;
              background: url(../../../static/imgs/playicon.png) no-repeat left
                center;
              background-size: 100%;
              z-index: 2;
            }
          }
          > .tabTranslate {
            width: 100%;
            height: 1.44rem;
            margin-bottom: 0.3rem;
            > li {
              img {
                float: left;
                width: 2.2rem;
                height: 1.44rem;
                display: block;
              }
            }
          }
          .imageNews-img {
            width: 2.2rem;
            height: 1.44rem;
            margin-left: 0.2rem;
            position: relative;
            > img {
              width: 100%;
              height: 100%;
            }
            > .audio_icon {
              width: 0.66rem;
              height: 0.66rem;
              position: absolute;
              top: 50%;
              left: 50%;
              margin-top: -0.38rem;
              margin-left: -0.38rem;
              background: url(../../../static/imgs/audio.png) no-repeat left
                center;
              background-size: contain;
              z-index: 89;
            }
          }
        }
      }
    }
  }
 .videoBox {
    .news_footer_title {
      margin-top: 0.2rem;
    font-size: 0.32rem;
    height: 0.8rem;
    background-color: #ffffff;
    color: #000;
    border-bottom: solid .04rem #eee;
    line-height: 0.8rem;
    padding: 0 0.3rem;
    }
  }
  .video_vh {
    height: 100vh;
  }
  .isIcon {
    white-space: nowrap;
  }
}
</style>

