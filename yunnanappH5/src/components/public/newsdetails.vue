<template>
    <div class="newsdetails _cus_flexContent _cus_direction">
         <div class="searchVal">
            <span class="search_back" @click="city_back"></span>
            <span class="colorfff city_text">新闻内容</span>
        </div>
        <div class="newsdetails_content _cus_flex1" ref="newsdetails_content">
            <div class="details_head">
                <span class="news_title">{{newsdetails_msg.title}}</span>
                <p class="new_wrap perW100 _cus_flexContent _cus_jusContent">
                    <span>
                        <span>{{newsdetails_msg.source}}</span>
                        <span>{{newsdetails_msg.createTimeStr}}</span>
                    </span>
                    <span>
                       <i @click="clickCollection" :class="isCollection==1?'collectActive':'collect'"></i>
                       <!-- <span>{{newsdetails_msg.virtualClickTimes}}</span> -->
                       <!-- <i class="news_watch"></i> -->
                       <!-- <i class="fatch_bridge" @click="fatchBridge"></i> -->
                       <img src="../../../static/imgs/share.png" @click="fatchBridge">
                    </span>
                </p>
            </div>
        <div>
        </div>
            <div class="details_content" v-html="htmlDecodeByRegExp" ref="htmlImg"></div>
            <div class="details_footer">
                <p class="news_footer_title">新闻推荐</p>
                <ul class="home_list _cus_overHidden">
                    <li v-if="dataList.length > 0" v-for="(item,keys) in dataList" :key="keys" class="_cus_flexContent" @click="Details_back(item)">
                        <div class="_cus_overHidden __cus_fl _cus_flex1" :class="(item.type == 'list' || item.type == 'tabList' || item.type == 'tabAudio')?'newslist _cus_posRelative':''">
                            <span v-show="item.type =='tab'" class="source-handle-title">专题</span>
                            <label class="source-label">{{item.listTitle}}</label>
                            <div class="tabImg" v-show="item.type == 'tab' || item.type == 'tabVideo'" :class="item.type=='tabList'?'_cus_posRelative':''">
                                <img class="" v-if="item.urlList.length > 0" v-lazy="item.urlList[0]" :key="item.urlList[0]" :alt="item.urlList[0]">
                                <i class="video_playicon" v-show="item.type =='tabVideo'"></i>
                            </div>
                                <div v-show="item.type == 'tabTranslate'" class="_cus_overHidden tabTranslate" style="padding-bottom:0.5rem">
                                <ul class="" style="display:flex;justify-content:space-between">
                                    <li v-for="(img,keys) in item.urlList" :key="keys" >
                                        <img v-lazy="img" :key="img" :alt="img" v-if="img !='' && img" style="width:2.1rem;height:1.44rem">
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
                              <img v-lazy="item.urlList[0]" :key="item.urlList[0]" v-if="item.urlList.length > 0" :alt="item.urlList[0]">
                              <i class="audio_icon" v-show="item.type == 'tabAudio'"></i>
                          </div>
                    </li>
                </ul>
            </div>
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
import { newsApi } from "../../services/newsapi.js";
import { HttpService } from "../../services/http";
import Scroller from "../../base/scroller/scroller.vue";
import { commonApi } from "../../common/js/common.js";
import { mapState, mapMutations } from 'vuex';
import { loginApi } from '../../services/loginApi.js';
import { coreApi } from '../../services/coreApi.js';
import { UserService } from '../../services/user.js';
import { adapted } from "../../common/js/adapted.js";
import { Share } from '../../common/js/bridgeShare.js';
import { shareWx } from '../../common/js/shareWeixin.js';
import { sms } from '../../services/commonApi.js'; 
export default {
  components: {
    Scroller
  },
  data() {
    return {
      hide_alert: false,
      isCollection: 0,
      toast: {
        toastShow: false,
        toastText: "收藏成功"
      },
      test_mag: "请确认登录",
      newsdetails_msg: {},
      dataList: [],
      scrollerObj: {
        PageIndex: 1, //页码从第一页开始
        PageSize: 5, //煤业显示的条数
        isShow: true, //是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
        showloading: false,
        textloading: "加载中",
        showUp: true,
        isbounce: true,
        lists: [],
        downObj: {
          content: "请上拉刷新数据",
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: "请上拉刷新数据",
          upContent: "请上拉刷新数据",
          loadingContent: "加载中...",
          clsPrefix: "xs-plugin-pullup-"
        },
        upobj: {
          content: "请上拉刷新数据",
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: "请上拉刷新数据",
          upContent: "请上拉刷新数据",
          loadingContent: "加载中...",
          clsPrefix: "xs-plugin-pullup-"
        },
        isShowLoading: false,
        textLoading: "加载中",
        scrollerStatus: {
          pulldownStatus: "default",
          pullupStatus: "default"
        }
      },
      path: "",
      pathother:false,
      Model: '',
      shareData: {
        img: '',
        title: '',
        introduce: '',
        url: ''
      },
      show: false
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
    } else {
      to.meta.keepAlive = false;
    }

     if(from.path.includes("/public/newsdetails")) {
      from.meta.keepAlive = false;
    }

    next();
  },
  computed: {
    htmlDecodeByRegExp() {
      let str = this.newsdetails_msg.content || [];
      var s = "";
      if (str.length == 0) return "";
      s = str.replace(/&amp;/g, "&");
      s = s.replace(/&lt;/g, "<");
      s = s.replace(/&gt;/g, ">");
      s = s.replace(/&nbsp;/g, " ");
      s = s.replace(/&#39;/g, "'");
      s = s.replace(/&quot;/g, '"');
      // s = s.replace(/hh/g, "href");
      s = s.replace(/<p.*?>(.*?)<\/p>/g,function(e){
        return e.replace(/<br>/g,"");
      })
      s= s.replace(/font-size:(\d+)/g, function(e){
        return 'font-size:' + Number(e.match(/\d+/ig)[0]) / 10 + 'rem;'
      })
      s= s.replace(/line-height:(\d+)/g, function(e){
        return 'line-height:' + Number(e.match(/\d+/ig)[0]) / 10 + 'rem;'
      })
      s = s.replace(/px;/g, "");
      return s;
    },
    ...mapState(['loginMsg'])
  },
  mounted() {
    this.path = this.$route.path;
    // !this.pathother?this.getNewsList():''
    this.Model = adapted.browser().versions.ios?'ios':adapted.browser().versions.android?'android':'';

    shareWx.getQueryString('newsdetails'); 
  },
  watch: {
    path(newVal, oldVal) {
      if ( newVal != oldVal && newVal !='') {
        this.$nextTick(()=>{
          this.getNewsList();
          this.$refs.newsdetails_content.scrollTo(0, 0);
        })
      }
    }
  },
  methods: {
    fatchBridge(){
      // 
      if(this.Model == 'ios'){
        this.show = true;
      }else{
        let bodys = {
          img: this.newsdetails_msg.listShareImg != '' && this.newsdetails_msg.listShareImg ?this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png',
          title: this.newsdetails_msg.title,
          introduce: !this.newsdetails_msg.introduction || this.newsdetails_msg.introduction == ''?this.removeHTMLTag(this.newsdetails_msg.content):this.newsdetails_msg.introduction,
          url: window.location.href
        };
        Share.bridgeShart(bodys,this.Model, 'OpenShareMenu')
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
        introduce: !this.newsdetails_msg.introduction || this.newsdetails_msg.introduction == ''?this.removeHTMLTag(this.newsdetails_msg.content):this.newsdetails_msg.introduction,
        url: window.location.href,
        // type: ''
      };
      Share.bridgeShart(bodys,this.Model, 'qqZoneShare')
    },
    qqFriendShare(){
      let bodys = {
        img: this.newsdetails_msg.listShareImg != '' && this.newsdetails_msg.listShareImg ?this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png',
        title: this.newsdetails_msg.title,
        introduce: !this.newsdetails_msg.introduction || this.newsdetails_msg.introduction == ''?this.removeHTMLTag(this.newsdetails_msg.content):this.newsdetails_msg.introduction,
        url: window.location.href
      };
      if(this.Model == 'ios'){
        Share.bridgeShart(bodys,this.Model, 'qqFriendShare')
      }else{
        Share.bridgeShart(bodys,this.Model, 'qqFirendShare')
      }
      
    },
    weiXinFriendShare(){
      // ynsjt://
      let bodys = {
        // img: this.newsdetails_msg.listShareImg,
        img: this.newsdetails_msg.listShareImg != '' && this.newsdetails_msg.listShareImg ?this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png',
        title: this.newsdetails_msg.title,
        introduce: !this.newsdetails_msg.introduction || this.newsdetails_msg.introduction == ''?this.removeHTMLTag(this.newsdetails_msg.content):this.newsdetails_msg.introduction,
        url: window.location.href
      };
      Share.bridgeShart(bodys,this.Model, 'weiXinFriendShare')
    },
    weiXinCircleShare(){
      // WXSceneTimeline
      let bodys = {
        // img: this.newsdetails_msg.listShareImg,
        img: this.newsdetails_msg.listShareImg != '' && this.newsdetails_msg.listShareImg ?this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png',
        title: this.newsdetails_msg.title,
        introduce: !this.newsdetails_msg.introduction || this.newsdetails_msg.introduction == ''?this.removeHTMLTag(this.newsdetails_msg.content):this.newsdetails_msg.introduction,
        url: window.location.href
      };
      Share.bridgeShart(bodys,this.Model, 'weiXinCircleShare')
      
    },
    weiboShare(){
      let bodys = {
        // img: this.newsdetails_msg.listShareImg,
        img: this.newsdetails_msg.listShareImg != '' && this.newsdetails_msg.listShareImg ?this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png',
        title: this.newsdetails_msg.title,
        introduce: !this.newsdetails_msg.introduction || this.newsdetails_msg.introduction == ''?this.removeHTMLTag(this.newsdetails_msg.content):this.newsdetails_msg.introduction,
        url: window.location.href
      };
      Share.bridgeShart(bodys,this.Model, 'weiboShare')
    },
    onConfirm() {
      this.$router.push({
        path: "/login/login"
      });
    },
    onCancel() {
      this.hide_alert = false;
    },
    selPullUp(items) {
      this.getNewsList(false);
    },
    selPullDown(items) {
      this.getNewsList(false);
    },
    getNewsList() {
      let bodys = this.$route.query;
      newsApi.getNewsDetails(bodys).then(r => {
        if (r.status && r.statusCode == "200") {
          this.newsdetails_msg = r.data;
          this.isCollection = r.data.isCollection;
          let data = r.data.contentList;
          let path = "";
          data.map(i => {
            switch (i.contentType) {
              case "30":
                i["type"] = "tabVideo";
                break;
              case "10":
                i["type"] = "list";
                break;
              case "40":
                i["type"] = "tabAudio";
                break;
              case "20":
                i["type"] = "tabTranslate";
                break;
              case "60":
                i["type"] = "tab";
                break;
              case "50":
                i["type"] = "tabList";
                break;
            }
          });
          this.dataList = data;
          
        } else {
          this.newsdetails_msg = {};
        }
        // 记住登录状态
        this.$nextTick(()=>{
          let loginMsg = this.loginMsg;
          loginMsg.status == ''?this.getInfoUser():''
        });

        // setShareInfo({
        //   title: _this.newsdetails_msg.title,
        //   summary: !this.newsdetails_msg.introduction || this.newsdetails_msg.introduction == ''?this.removeHTMLTag(this.newsdetails_msg.content):this.newsdetails_msg.introduction,
        //   pic:  this.newsdetails_msg.listShareImg != '' && this.newsdetails_msg.listShareImg ?this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png',
        //   url: window.location.href + '&tencentShare=1'
        // });



        // 微信分享方法
        var _this = this;
        var url =window.location.href.split('#')[0];
        var shareData = {
          title: _this.newsdetails_msg.title, 
              desc: !_this.newsdetails_msg.introduction || _this.newsdetails_msg.introduction == ''?_this.removeHTMLTag(_this.newsdetails_msg.content):_this.newsdetails_msg.introduction, 
              imgUrl: _this.newsdetails_msg.listShareImg != '' && _this.newsdetails_msg.listShareImg ?_this.newsdetails_msg.listShareImg:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png', 
              link: window.location.href.split('#')[0]+'#'+window.location.href.split('#')[1]
        }; 
          shareWx.share(`${sms}weichatShare/sign.do?url=${url}`, {}, shareData, ['wx','firends','wb','qq','zone']);
        // shareWx.share(`http://dinglinfeng.4kb.cn/langya/sign.do`, { url: url }, shareData, ['wx','firends','wb','qq','zone']);
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
          path = `/programdetails/${items.id}`
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
      this.path = this.$route.path;
    },
    city_back() {
      if(window.history.length > 1){
        this.$nextTick(()=>{
          this.$router.go(-1);
        })
        setTimeout(() => {
          this.path = this.$route.path;
        }, 200);
      }else{
        this.$router.push({
          'path': '/system/home'
        })
      }
      
    },
    clickCollection() {
      this.toast.toastShow = false;
      var id = this.$router.history.current.query.id;
      let bodys = {
        _json: false, //参数类型 formdata/json
        _jsonp: true, //dataType: jsonp true/false
        _jsonpCallback: "onBack" //请求接口返回的callback
      };
      bodys.refType = 10;
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
    }
  }
};
</script>
<style lang="less">
.newsdetails {
  background-color: #fff;
  font-size: 0.28rem;
  .searchVal {
    width: 100%;
    height: 1rem;
    position: relative;
    color: #fff;
    z-index: 1;
    // display: flex;
    line-height: 1rem;
    background: #f41a14;
    z-index: 2;
    .search_back {
      // position: absolute;
      // left: 0;
      // top: 0;
      width: 0.22rem;
      height: 0.4rem;
      margin-left: 0;
      display: inline-block;
      background: url("../../../static/imgs/back.png") no-repeat;
      background-position-x: center !important;
      background-size: 22%;
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
        background: url("../../../static/imgs/search.png") center center no-repeat;
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
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 100vw;
      text-align: center;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.32rem;
      z-index: -1;
    }
  }
  .details_content{
    white-space:normal;
    word-break:break-all;
  }
  .newsdetails_content {
    overflow-y: scroll;
    width: 100%;
    white-space: wrap;
    embed {
      max-width: 100%;
    }
    strong {
      width: 100%;
      display: block;
      word-break: break-all;
      word-warp: break-word;
    }
    img {
      max-width: 100% !important;
      height: auto !important;
    }
    iframe {
      width: 100% !important;
    }
    video {
      width: 100% !important;
      // max-width: 100%;
    }
    .details_head {
      margin-bottom: 0.4rem;
      border-bottom: .02rem solid #eeeeee;
      > .news_title {
        height: auto;
        display: block;
        font-size: 0.35rem;
        font-weight: bold;
        margin: 0.3rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-align: justify;
        line-height: 0.56rem;
      }
      > .new_wrap {
        color: #b3b3b3;
        overflow: hidden;
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
    .details_content {
      padding: 0 0.3rem;
      overflow: hidden;
          div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th,textarea, td{
          font-size: .28rem !important;
          line-height: .56rem !important;
            img {
              max-width: 100% !important;
              height: auto !important;
            }
        }
        img {
          max-width: 100% !important;
          height: auto !important;
        }
      img {
        max-width: 100% !important;
        height: auto !important;
      }
      p {
        line-height: 0.5rem;
      }
    }
    .details_footer {
      .news_footer_title {
        font-size: .32rem;
        height: 0.8rem;
        background-color: #ffffff;
        border-bottom: solid .04rem #eee;
        line-height: 0.8rem;
        padding:0 .3rem;
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
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-align: justify;
          }
          .tabImg {
            width: 100%;
            height: 3.4rem;
            margin-top: 0.1rem;
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
              background: url(../../../static/imgs/playicon.png) no-repeat left center;
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
              background: url(../../../static/imgs/audio.png) no-repeat left center;
              background-size: contain;
              z-index: 89;
            }
          }
        }
      }
    }
  }
}
</style>

