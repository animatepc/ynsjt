<template>
        <div class="home">
        <tab
        v-if="tabArr.length > 1"
            active-color="#fc2506"
            bar-active-color="#fc2506"
            :animate="false"
            :line-width="2"
            :scroll-threshold="5"
            ref="tabIndex"
            v-model.number="tabIndex"
            class="bgfff"
            style="padding-top: .88rem;">
            <tab-item
                class="tab_item"
                style="height: .88rem;line-height: .88rem;font-size: .28rem;"
                v-for="(item,keys) in tabArr"
                :key="keys"
                @click.native="handler(keys,item)"><span>{{item.treeName}}</span></tab-item>
        </tab>
         <div class="home_content color28" v-if="newsListBox.length > 0 && keys == index" v-for="(item,keys) in newsListBox" :key="keys">
            <scroller
                v-show="item.isShow"
                v-model="item.scrollerStatus"
                lock-x
                scrollbar-y
                ref="scroller"
                :bounce="item.isbounce"
                :use-pullup="item.showUp"
                :use-pulldown="item.showDown"
                :pulldown-config="item.downObj"
                :pullup-config="item.upobj" 
                @on-pulldown-loading="selPullDown(keys)"
                @on-pullup-loading="selPullUp(keys)"
                style="height: calc(100vh - 1rem - .88rem - .98rem)">
                <div class="_cus_overHidden">
                    <ul class="home_list _cus_overHidden">
                        <li v-for="(item,keys) in item.lists" :key="keys" class="_cus_flexContent" @click="Details_back(item)">
                            <div class="_cus_overHidden __cus_fl _cus_flex1" :class="(item.type == 'list' || item.type == 'tabList' || item.type == 'tabAudio')?'newslist _cus_posRelative':''">
                                <span v-show="item.type =='tab'" class="source-handle-title">专题</span>
                                <label class="source-label">{{item.listTitle | htmlDecodeByRegExp}}</label>
                                <div class="tabImg" v-if="item.urlList.length > 0" v-show="item.type == 'tab' || item.type == 'tabVideo'" :class="(item.type=='tabList' || item.type == 'tabVideo')?'_cus_posRelative':''">
                                    <div class="list_live" v-show="item.isLive == '1'" :class="item.liveStatus == '0'?'live_state':item.liveStatus == '20'?'live_state':'live_loading'">{{item.liveStatus == '0'?'未开始':item.liveStatus == '10'?'直播中':item.liveStatus == '20'?'已结束':item.liveStatus == '30'?'直播预告':item.liveStatus == '40'?'直播回看':''}}</div>
                                    <img class="" v-lazy="item.urlList[0]" :key="item.urlList[0]" alt="">
                                    <i class="video_playicon" v-show="item.type =='tabVideo'"></i>
                                </div>
                                 <div  v-if="item.urlList.length > 0" v-show="item.type == 'tabTranslate'" class="_cus_overHidden tabTranslate">
                                    <ul class="_cus_flexContent _cus_jusContent home_atlas">
                                        <li v-for="(img,keys) in item.urlList" :key="keys" class="_cus_flex1">
                                            <img v-lazy="img" key="img" alt="">
                                        </li>
                                    </ul>
                                </div>
                                <p class="home_time _cus_overHidden perW100 color999" style="">
                                    <span v-show="item.topFlag == '1'" class="source-handle-title" style="margin-top:0px">置顶</span>
                                    <span class="__cus_fl">
                                        <span>{{item.source}}</span>
                                        <span class="">{{item.createTimeStr}}</span>
                                    </span>
                                    <!-- <span class="__cus_fr" v-show="item.type !='tab'"  v-if="!item.isLive == '1'">
                                        <span>{{item.virtualClickTimes}}</span>
                                        <span class="new_watch"></span>
                                    </span> -->
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
                    <span class="no_data _cus_textCenter Block" v-show="newsListBox[index].showToast">没有更多新闻了!</span>
                </div>
            </scroller>
        </div>
    </div>
</template>
<script>
import { newsApi } from "../../services/newsapi.js";
import { HttpService } from "../../services/http";
import { mapGetters,mapState } from "vuex";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      tabArr: [
        { tabName: "云南省" },
        { tabName: "热点" },
        { tabName: "新时代" },
        { tabName: "直播" }
      ],
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
      index: 0,
      tabIndex: 0,
      type: "1",
      newsListBox: [],
      city: "云南省",
      cityObj: {},
      tabData: {}
    };
  },
  //修改列表页的meta值，false时再次进入页面会重新请求数据。
  beforeRouteLeave(to, from, next) {
    if (to.path == "/public/screencity") {
      from.meta.keepAlive = true;
    } else{
      from.meta.keepAlive = false;
    }
    
    // console.log(from)
    next();
  },
  mounted() {
    //第一次加载
    this.cityObj = this.getCityObj;
    this.city = this.cityObj ? this.cityObj.areaName : "云南省";
    this.getCloumnList();
    if (this.index > 0 && this.tabArr.length > 0) {
      this.handler(this.index, this.tabArr[this.index]);
    }
  },
  computed: {
    // ...mapGetters({
    //   cityObj: state=> state.getCityObj,
    //   city: state => state.getCityObj.areaName || '云南省'
    // })
    ...mapGetters(['getCityObj']),
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
  watch: {
    $route(newVal, oldVal) {
      if (newVal.path == "/system/home" && oldVal.path != '/public/screencity') {
        // 记住本次切换记录
        this.tabIndex = this.index;
        // console.log(this.$route.meta.keepAlive)
        // this.tabArr[0].treeName = this.cityObj.areaName;
      } else {
        this.tabIndex = 0;
      }

      if(oldVal.path == '/public/screencity'){
        this.index = 0;
         this.newsListBox[this.index].PageIndex = 0;
        this.cityObj = this.getCityObj;
        this.city = this.cityObj ? this.cityObj.areaName : "云南省";
        console.log(this.city)
        // this.$nextTick(()=>{
          this.getCloumnList();
        //   if (this.index > 0 && this.tabArr.length > 0) {
            // this.handler(this.index, this.tabArr[this.index]);
        //   }
        // })
      }

    },
  },
  methods: {
    // 获取栏目列表
    getCloumnList() {
      let bodys = {
        type: 1,
        _jsonp: true,
        _jsonpCallback: "onBack"
      };
      newsApi.getColumnList(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          r.list.unshift({ treeName: this.city });
          this.tabArr = r.list;
          this.tabArr.map(i => {
            this.newsListBox.push({
              PageIndex: 1, //页码从第一页开始
              PageSize: 5, //煤业显示的条数
              isShow: false, //是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
              showloading: false,
              textloading: "加载中",
              showToast: false,
              showUp: true,
              showDown: true,
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
            });
          });
          this.$nextTick(() => {
            //第一次调用此方法
            this.getNewsList(true);
            // this.$refs.scroller.reset({top:0});
          });
        }
      });
    },
    Details_back(items) {
      // console.log(items)
      let data = items.contentType;
      let videoLabel = undefined;
      let path = "";
      switch (data) {
        case "30":
          path = "/videodetails";
          videoLabel = items.liveStatus ? items.liveStatus : undefined;
          break;
        case "10":
          path = "/newsdetails";
          break;
        case "20":
          path = "/atlasdetails";
          break;
        case "40":
          path = "/audiodetails";
          break;
        case "60":
          path = "/specialdetails";
          break;
        case "50":
          items.seriesType == "0"
            ? (path = "/programdetails")
            : items.seriesType == "10" ? (path = "/videochannel") : (path = "/programdetails");
          break;
      }
      let Json = {
        refType: items.contentType,
        id: items.id,
        columnCode: items.columnCode,
        videoLabel: videoLabel,
        beforeroute: this.tabArr[this.tabIndex].treeName == '直播'?'video':undefined 
      };
      this.$router.push({
        path: `/public${path}/${items.id}`,
        query: Json
      });
    },
    //第一次加载的时候容易为空true
    getNewsList(isEmpty) {
      this.newsListBox[this.index].showloading = true;
      // console.log(this.tabData)
      let JsonApi = {
        i: this.newsListBox[this.index].PageIndex,
        columnCode: this.index == 0 ? undefined : this.tabData.treeCode,
        cityCode: this.cityObj
          ? this.cityObj.areaType == "2" && this.index == 0
            ? this.cityObj.areaCode
            : undefined
          : undefined,
        provCode: this.cityObj
          ? this.cityObj.areaType == "1" && this.index == 0
            ? this.cityObj.areaCode
            : undefined
          : this.index == 0 ? 530000 : undefined,
        _jsonp: true,
        _jsonpCallback: "onBack"
      };
      newsApi.getnewsList(JsonApi).then(r => {
        if (r.status && r.statusCode == "200") {
          // sucess callback
          var data = r.list;
          if (isEmpty) {
            this.newsListBox[this.index].lists = [];
            let _this = this;
            this.newsListBox[this.index].scrollerStatus.pullupStatus =
              "enabled";
            this.newsListBox[this.index].showToast = false;
            this.$nextTick(() => {
              this.$refs.scroller[0].reset();
            });
          } else {
            //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
            if (data && data.length === 0) {
              this.newsListBox[this.index].showToast = true;
              this.newsListBox[this.index].isShowLoading = false;
              this.newsListBox[this.index].scrollerStatus.pullupStatus =
                "disabled"; // 禁用下拉
              this.$refs.scroller[0].reset({ bottom: 0 });
              return;
            }
            this.newsListBox[this.index].isShow = false;
          }
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
            this.newsListBox[this.index].lists.push(data[i]);
          }
          this.newsListBox[this.index].isShow = true;
          this.newsListBox[this.index].showloading = false;
          if (!isEmpty) {
            this.newsListBox[this.index].scrollerStatus.pullupStatus =
              "default";
            this.$refs.scroller[0].reset({ bottom: 0 });
          }
        }
      });
    },
    selPullUp() {
      this.newsListBox[this.index].PageIndex++;
      this.getNewsList(false);
      this.$nextTick(() => {
        this.$refs.scroller[0].reset();
      });
    },
    selPullDown() {
      this.newsListBox[this.index].PageIndex = 1;
      this.getNewsList(true);
      setTimeout(() => {
        this.newsListBox[this.index].scrollerStatus.pulldownStatus = "disabled";
        this.$nextTick(() => {
          this.newsListBox[
            this.index
          ].scrollerStatus.pulldownStatus = "disabled"
            ? (this.newsListBox[this.index].scrollerStatus.pulldownStatus =
                "default")
            : "";
          this.$refs.scroller[0].reset();
        });
      }, 1000);
    },
    activated() {
      this.$refs.scroller[0].reset();
    },
    //
    handler(keys, data) {
      this.index = keys;
      this.newsListBox[keys].PageIndex = 1;
      data.treeCode
        ? (this.tabData = Object.assign(this.tabData, data))
        : undefined;
      this.newsListBox[keys].lists = [];
      if (this.newsListBox[keys].lists.length == 0) {
        this.getNewsList(true);
      }
    }
  }
};
</script>
<style lang="less">
.home {
  background-color: #fff;
  .home_content {
    height: calc(100vh - 1rem - 0.88rem - 0.98rem);
    .home_list {
      > li {
        padding: 0.2rem 0.3rem;
        border-bottom: 1px solid #eeeeee;
        box-sizing: border-box;
        .source-label {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-align: justify;
          line-height: 1.5;
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
            background: url(../../../static/imgs/playicon.png) no-repeat left
              center;
            background-size: 100%;
            z-index: 2;
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
  .tab_item {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .newslist {
    height: 1.44rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.vux-tab-container,
.vux-tab {
  height: 0.88rem !important;
}
</style>

