<template>
    <div class="channelDetails perH100">
        <div class="searchVal _cus_flexContent _cus_fleAlignCen">
            <span class="search_back" @click="city_back"></span>
                <span class="colorfff city_text">{{channel_title}}</span>
                <!-- <span class="username_ready"> -->
                <i class="addfeedback_icon" @click="username_ready"></i>
            <!-- </span> -->
        </div>
        <div style="height: calc(100% - 1rem);">
            <div class="channel_tab">
                <span class="" @click="handleClick(false)" :class="!isClass?'tab_active':''">热播</span>
                <span class="" @click="handleClick(true)" :class="isClass?'tab_active':''">最新</span>
            </div>
            <scroller v-if="!scrollerType" style="height: calc(100% - 40px - .2rem);" class=" bgfff scroll_box" @pullDown="selPulldown" @pullUp="selPullup" :scrollerMsg="scrollerMsg" types="channelDetails" :dataList="list" ref="scroller"></scroller>
            <scroller v-if="scrollerType" style="height: calc(100% - 40px - .2rem);" class=" bgfff scroll_box" @pullDown="selPulldown" @pullUp="selPullup" :scrollerMsg="scrollerMsg" types="channelDetails" :dataList="newList" ref="scroller2"></scroller>
        </div>
        
    </div>
</template>
<script>
import { coreApi } from "../../services/coreApi";
import { HttpService } from "../../services/http.js";
import { videoApi } from "../../services/videoApi.js";
import Scroller from "../../base/scroller/scroller.vue";
import { debug } from "util";
export default {
  components: {
    Scroller
  },
  data() {
    return {
      list: [],
      newList:[],
      scrollerType: false,
      orderType: "",
      count: "",
      isClass: false,
      channel_title: "云南卫视",
      isTab: false,
      scrollerMsg: {
        PageIndex: 1, //页码从第一页开始
        PageSize: 5, //煤业显示的条数
        isShow: true, //是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
        showloading: false,
        textloading: "加载中",
        showUp: true,
        showToast: false,
        isbounce: true,
        lists: [],
        downObj: {
          content: "下拉刷新",
          height: 40,
          autoRefresh: false,
          downContent: "下拉刷新",
          upContent: "释放后刷新",
          loadingContent: "正在刷新...",
          clsPrefix: "xs-plugin-pulldown-"
        },
        upobj: {
          content: "上拉加载更多",
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: "释放后加载",
          upContent: "上拉加载更多",
          loadingContent: "加载中...",
          clsPrefix: "xs-plugin-pullup-"
        },
        isShowLoading: false,
        textLoading: "加载中",
        scrollerStatus: {
          pulldownStatus: "default",
          pullupStatus: "default"
        }
      }
    };
  },
  mounted() {
    let query = this.$router.history.current.query;
    this.channel_title = query.channel || "所有节目";
    if (this.channel_title != "") {
      this.channelList(true);
    } else {
      this.getList(true);
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/multimedia/video") {
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  },
  methods: {
    handleClick(isTab) {
      this.scrollerMsg.scrollerStatus.pullupStatus = "enabled";
      this.scrollerMsg.showToast = false;
      // this.scrollerMsg.scrollerStatus.pullupStatus = "enabled"
      this.scrollerType = isTab
      if (isTab) {
        this.list = [];
        this.isClass = true;
        this.orderType = "10";
        this.scrollerMsg = Object.assign(this.scrollerMsg, {
          PageIndex: 1, //页码从第一页开始
          PageSize: 5, //煤业显示的条数
          isShow: true, //是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
          showloading: false,
          textloading: "加载中",
          showUp: true,
          isbounce: true,
          scrollerStatus: {
            pulldownStatus: "default",
            pullupStatus: "enabled"
          }
        });
        if (this.channel_title != "") {
          this.channelList(true);
        } else {
          this.getList(true);
        }
        this.$refs.scroller.reset();
      } else {
        this.newList = []
        // this.scrollerMsg.scrollerStatus.pullupStatus = "enabled";
        this.isClass = false;
        this.orderType = "20";
        this.scrollerMsg = Object.assign(this.scrollerMsg, {
          PageIndex: 1, //页码从第一页开始
          PageSize: 5, //煤业显示的条数
          isShow: true, //是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
          showloading: false,
          textloading: "加载中",
          showUp: true,
          isbounce: true,
          scrollerStatus: {
            pulldownStatus: "default",
            pullupStatus: "enabled"
          }
        });
        if (this.channel_title != "") {
          this.channelList(true);
        } else {
          this.getList(true);
        };
        this.$refs.scroller2.reset();
      }
    },
    selPulldown(index) {
      this.scrollerMsg.PageIndex = 1;
      if (this.channel_title != "") {
        this.channelList(true);
      } else {
        this.getList(true);
      }
      setTimeout(() => {
        this.scrollerMsg.scrollerStatus.pulldownStatus = "disabled";
        this.$nextTick(() => {
          this.scrollerMsg.scrollerStatus.pulldownStatus = "disabled"
            ? (this.scrollerMsg.scrollerStatus.pulldownStatus = "enabled")
            : "";
          this.$refs.scroller.reset({bottom: 0});
        });
      }, 1000);
    },
    selPullup(index) {
      this.scrollerMsg.PageIndex = index;
      if (this.channel_title != "") {
        this.channelList(false);
      } else {
        this.getList(false);
      }
    },
    channelList(isEmpty) {
      if(!this.scrollerType){
      var sid = this.$router.history.current.query.id;
      let bodys = {
        i: this.scrollerMsg.PageIndex,
        _jsonp: true,
        _jsonpCallback: "onBack",
        channelId: sid,
        orderBy: this.orderType || "20"
      };
      videoApi.channelList(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          // console.log(r);
          // 接口访问成功，执行
          //视频-->品牌栏目--频道、节目-->详情
          let data = r.list;
          if (isEmpty) {
            this.list = [];
            this.scrollerMsg.scrollerStatus.pullupStatus = "enabled";
            this.scrollerMsg.showToast = false;
          } else {
            //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
            if (data && data.length === 0) {
              this.scrollerMsg.showToast = true;
              this.scrollerMsg.isShowLoading = false;
              this.scrollerMsg.scrollerStatus.pullupStatus = "disabled"; // 禁用下拉
              return;
            }
            this.scrollerMsg.isShow = false;
          }
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
                i["type"] = "channelDetails"; //"tabList" ;
                break;
            }
            i["urlList"] = [];
            i.urlList.push(i.listImgOne);
            i["channel"] = "channel";
            this.list.push(i);
          });

          this.scrollerMsg.isShow = true;
          this.scrollerMsg.showloading = false;
          if (!isEmpty) {
            this.scrollerMsg.scrollerStatus.pullupStatus = "default";
            this.$nextTick(() => {
              this.$refs.scroller.reset();
            });
          }
          // this.list = data;
        } else if (!r.status) {
          // 返回错误信息
          this.watchList = [];
        }
      });
      }else{
        var sid = this.$router.history.current.query.id;
      let bodys = {
        i: this.scrollerMsg.PageIndex,
        _jsonp: true,
        _jsonpCallback: "onBack",
        channelId: sid,
        orderBy: this.orderType || "20"
      };
      videoApi.channelList(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          // console.log(r);
          // 接口访问成功，执行
          //视频-->品牌栏目--频道、节目-->详情
          let data = r.list;
          if (isEmpty) {
            this.newList = [];
            this.scrollerMsg.scrollerStatus.pullupStatus = "enabled";
            this.scrollerMsg.showToast = false;
          } else {
            //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
            if (data && data.length === 0) {
              this.scrollerMsg.showToast = true;
              this.scrollerMsg.isShowLoading = false;
              this.scrollerMsg.scrollerStatus.pullupStatus = "disabled"; // 禁用下拉
              return;
            }
            this.scrollerMsg.isShow = false;
          }
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
                i["type"] = "channelDetails"; //"tabList" ;
                break;
            }
            i["urlList"] = [];
            i.urlList.push(i.listImgOne);
            i["channel"] = "channel";
            this.newList.push(i);
          });

          this.scrollerMsg.isShow = true;
          this.scrollerMsg.showloading = false;
          if (!isEmpty) {
            this.scrollerMsg.scrollerStatus.pullupStatus = "default";
            this.$nextTick(() => {
              this.$refs.scroller2.reset();
            });
          }
          // this.list = data;
        } else if (!r.status) {
          // 返回错误信息
          this.watchList = [];
        }
      });
      }
      
    },
    getList(isEmpty) {
      if(!this.scrollerType){
        this.channel_title = this.$router.query;
      let channelId = this.$router.currentRoute.query.id;
      this.scrollerMsg.showloading = true;
      // 请求data
      let bodys = {
        channelId: channelId,
        i: this.scrollerMsg.PageIndex,
        //mobile:this.idCode.phone.replace(/\s+/g,''),
        _json: false, //参数类型 formdata/json
        _jsonp: true, //dataType: jsonp true/false
        _jsonpCallback: "onBack" //请求接口返回的callback
      };
      // console.log(this.scrollerMsg.PageIndex);
      // 调用gloabApi的api 参数是bodys r 接口返回的数据对象
      videoApi.commonList(bodys).then(r => {
        this.collectionCount = r.count;
        var data = r.list;
        // console.log(data);
        if (isEmpty) {
          this.list = [];
          this.scrollerMsg.scrollerStatus.pullupStatus = "enabled";
          this.scrollerMsg.showToast = false;
        } else {
          //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
          if (data && data.length === 0) {
            this.scrollerMsg.showToast = true;
            this.scrollerMsg.isShowLoading = false;
            this.scrollerMsg.scrollerStatus.pullupStatus = "disabled"; // 禁用下拉
            return;
          }
          this.scrollerMsg.isShow = false;
        }
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
              i["type"] = "channelDetails"; //"tabList" ;
              break;
          }
          i["urlList"] = [];
          i.urlList.push(i.listImgOne);
          i["channel"] = "channel";
          this.list.push(i);
        });

        this.scrollerMsg.isShow = true;
        this.scrollerMsg.showloading = false;
        if (!isEmpty) {
          this.scrollerMsg.scrollerStatus.pullupStatus = "default";
          this.$nextTick(() => {
            // this.$refs.scroller[this.index].reset();
          });
        }
      });
      }else{
this.channel_title = this.$router.query;
      let channelId = this.$router.currentRoute.query.id;
      this.scrollerMsg.showloading = true;
      // 请求data
      let bodys = {
        channelId: channelId,
        i: this.scrollerMsg.PageIndex,
        //mobile:this.idCode.phone.replace(/\s+/g,''),
        _json: false, //参数类型 formdata/json
        _jsonp: true, //dataType: jsonp true/false
        _jsonpCallback: "onBack" //请求接口返回的callback
      };
      // console.log(this.scrollerMsg.PageIndex);
      // 调用gloabApi的api 参数是bodys r 接口返回的数据对象
      videoApi.commonList(bodys).then(r => {
        this.collectionCount = r.count;
        var data = r.list;
        // console.log(data);
        if (isEmpty) {
          this.newList = [];
          this.scrollerMsg.scrollerStatus.pullupStatus = "enabled";
          this.scrollerMsg.showToast = false;
        } else {
          //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
          if (data && data.length === 0) {
            this.scrollerMsg.showToast = true;
            this.scrollerMsg.isShowLoading = false;
            this.scrollerMsg.scrollerStatus.pullupStatus = "disabled"; // 禁用下拉
            return;
          }
          this.scrollerMsg.isShow = false;
        }
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
              i["type"] = "channelDetails"; //"tabList" ;
              break;
          }
          i["urlList"] = [];
          i.urlList.push(i.listImgOne);
          i["channel"] = "channel";
          this.newList.push(i);
        });

        this.scrollerMsg.isShow = true;
        this.scrollerMsg.showloading = false;
        if (!isEmpty) {
          this.scrollerMsg.scrollerStatus.pullupStatus = "default";
          this.$nextTick(() => {
            // this.$refs.scroller[this.index].reset();
          });
        }
      });
      }
      
    },

    city_back() {
      this.$router.go(-1);
    },
    username_ready() {
      this.$router.push({
        path: "/public/searchmsg",
        query: { recomSetCode: "YNSJTXW", SetCode: "YNSJTSP" }
      });
    },
    onConfirm() {
      // console.log("已清空");
    },
    onCancel() {
      // console.log("已取消");
    },
    SetUserhead() {
      this.$router.push({
        path: "/mymodule/setheadphoto"
      });
    },
    SetUsername() {
      this.$router.push({
        path: "/mymodule/setusername"
      });
    }
  }
};
</script>
<style lang="less">
.channelDetails {
  font-size: 0.28rem;
  .channel_past {
    background-color: #fff;
    overflow: hidden;
    padding: 0.3rem;
    font-size: 14px;
    > li {
      width: 48%;
      font-size: 0.26rem;
      margin-bottom: 0.3rem;
      > img {
        width: 100%;
        height: 1.8rem;
      }
      > p {
        margin: 0.32rem 0 0.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      > div {
        font-size: 0.24rem;
        color: #999;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .searchVal {
    width: 100%;
    height: 1rem;
    color: #fff;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    line-height: 1rem;
    text-align: center;
    background: #f41a14;
    z-index: 2;
    .addfeedback_icon {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      margin-right: 0.3rem;
      background: url(../../../static/imgs/search.png);
      background-repeat: no-repeat;
      background-size: 100%;
      z-index: 3;
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
  .newsMessage_content {
    .newsMessage_list {
      > li {
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        border-bottom: 2px solid #eeeeee;
      }
    }
    .newsMessage_notime {
      display: block;
      width: 100%;
      padding-top: 1rem;
      text-align: center;
    }
  }
  .channel_tab {
    display: block;
    overflow: hidden;
    background: #fff;
    height: .8rem;
    display: flex;
    align-items: center;
    padding-left: .3rem;
    > .tab_active {
      background: #f3f2f2;
      border-radius: 0.05rem;
      color: #ef131c;
      margin-right: 0.2rem;
    }
    > span {
      display: inline-block;
      height: .4rem;
      line-height: .4rem;
      padding: 0 .05rem;
      border-radius: 0.05rem;
      color: #000;
      margin-right: 0.2rem;
    }
  }
  .login_alert {
    .weui-dialog {
      max-width: 80%;
      border-radius: 0.12rem;
      // border:none;
    }
    .weui-dialog__bd,
    .weui-dialog__hd,
    .weui-dialog__ft {
      font-size: 0.32rem;
    }
    .dialog__hd {
      border: none;
    }
    .weui-dialog__ft {
      width: 100%;
      padding: 0 0.4rem;
      line-height: 0.8rem;
      margin: 0 auto;
      padding-bottom: 0.4rem;
      .weui-dialog__btn_default {
        background-color: #c1c1c1;
        margin-rigfht: 0.4rem;
        margin-left: 0;
      }
      > a {
        margin-left: 0.4rem;
        background-color: #f41a14;
        color: #fff;
        font-weight: 500;
        border-radius: 0.12rem;
      }
    }
  }
  .scroll_box {
    margin-top: 0.2rem;
  }
}
</style>
