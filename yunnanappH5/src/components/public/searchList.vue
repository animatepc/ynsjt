<template>
	<div class="searchList">
		<div class="search_head _cus_flexContent _cus_fleAlignCen">
			<span class="search_back" @click="search_back"></span>
	        <div class="colorfff _cus_posRelative _cus_overHidden search_box" @click.prevent.stop="touchVal">
	            <span class="_cus_posAbsolute search_icon"></span>
	            <input type="text"  v-model="searchVal" class="_cus_posAbsolute search_mode" placeholder="输入搜索词">
	        </div>
	    </div>
	    <!--tab区-->
	    <tab
          active-color="#fc2506"
          bar-active-color="#fc2506"
          :animate="false"
          :line-width="2"
          :scroll-threshold="1"
          v-model.number="tabIndex"
          style="padding-top: .88rem; margin-top: 1rem">
          <tab-item
            style="height: .88rem;line-height: .88rem;font-size: .28rem;width: 20%;"
            v-for="(item,keys) in tabArr"
            :key="keys"
            @click.native="handler(keys)"><span>{{item.tabName}}</span></tab-item>
      </tab>
        <div class="searchList_content color28" v-for="(item,keys) in newsListBox" :key="keys" v-if="keys == index">
          <scroller
              v-show="item.isShow"
              v-model="item.scrollerStatus"
              lock-x
              scrollbar-y
              ref="scroller"
              :bounce="item.isbounce"
              :use-pullup="item.showUp"
              :use-pulldown="true"
              :pulldown-config="item.downObj"
              :pullup-config="item.upobj" 
              @on-pulldown-loading="selPullDown(keys)"
              @on-pullup-loading="selPullUp(keys)"
              style="height: calc(100vh - .88rem - .98rem)">
              <div class="_cus_overHidden">
                  <ul class="home_list _cus_overHidden" v-if="keys != 5" >
                      <li v-for="(item,keys) in item.lists" :key="keys" class="_cus_flexContent" @click="Details_back(item)">
                          <div class="_cus_overHidden __cus_fl _cus_flex1" :class="(item.type == 'list' || item.type == 'tabAudio' || item.type =='tabList')?'newslist _cus_posRelative':''">
                             <div class="_cus_overHidden _cus_flexContent">
                                <span v-show="item.type =='tab'" class="source-handle-title">专题</span>
                                <span v-show="item.type == 'tabList'" class="source-handle-title">{{item.seriesType == '0'?'节目':item.seriesType == '10'?'剧集':''}}</span>
                                <label class="source-label">{{item.listTitle | htmlDecodeByRegExp}}</label>
                             </div>
                              <div class="tabImg" v-if="item.urlList.length > 0" v-show="item.type == 'tab' || item.type == 'tabVideo'" :class="(item.type=='tabList' || item.type == 'tabVideo')?' _cus_posRelative':''">
                                  <div class="video_live" v-show="item.isLive == '1'" :class="item.liveStatus == '0'?'live_state':item.liveStatus == '20'?'live_state':'live_loading'">{{item.liveStatus == '0'?'未开始':item.liveStatus == '10'?'直播中':item.liveStatus == '20'?'已结束':item.liveStatus == '30'?'直播预告':item.liveStatus == '40'?'直播回看':''}}</div>
                                  <img class="" :src="item.urlList[0]"  alt="">
                                  <i class="video_playicon" v-show="item.type =='tabVideo'"></i>
                              </div>
                                <div  v-if="item.urlList.length > 0" v-show="item.type == 'tabTranslate'" class="_cus_overHidden tabTranslate">
                                  <ul class="_cus_flexContent _cus_jusContent home_atlas">
                                      <li v-for="(img,keys) in item.urlList" :key="keys" class="_cus_flex1">
                                          <img v-lazy="img" :key="img" alt="">
                                      </li>
                                  </ul>
                              </div>
                              <p class="home_time _cus_overHidden perW100 color999">
                                  <span v-show="item.topFlag == '1'" class="source-handle-title">置顶</span>
                                  <span class="__cus_fl">
                                      <span>{{item.source}}</span>
                                      <span class="">{{item.createTimeStr}}</span>
                                  </span>
                                  <span class="__cus_fr" v-if="!item.isLive == '1'">
                                      <span>{{item.virtualClickTimes}}</span>
                                      <span class="new_watch"></span>
                                  </span>
                              </p>
                          </div>
                          <div v-if="item.urlList.length > 0" v-show="item.type == 'list' || item.type == 'tabList' || item.type == 'tabAudio'" class="_cus_overHidden __cus_fr imageNews-img">
                              <img :src="item.urlList[0]" alt="">
                              <i class="audio_icon" v-show="item.type == 'tabAudio'"></i>
                          </div>
                      </li>
                  </ul>
                  <!-- 我拍 -->
                  <ul class="myPhoto_list" v-else>
                      <li :key="keys" class="" v-for="(item,keys) in newsListBox[5].lists">
                          <img class="head_photo" v-lazy="item.userAvatar" :key="item.userAvatar" :alt="item.userAvatar"/>
                          <div class="myPhoto_posted">
                              <div class="_cus_flexContent _cus_jusContent">
                                  <span class="">{{item.nickName}}</span>
                                  <span class="">{{item.createTimeStr}}</span>
                              </div>
                              <p>{{item.content}}</p>
                              <ul class="myPhoto_img _cus_overHidden"  v-if="item.url ==''">
                                  <li class="__cus_fl" v-for="(img,index) in item.urlList" :key="img" @click="img_back(item.urlList,index)">
                                      <img v-lazy="img" :alt="img" :key="img" class=""/>
                                  </li>
                              </ul>
                              <div class="" v-else>
                                <div class="video-photo" @click="myphotoShow(item.url,keys)">
                                  <img v-lazy="item.urlList.length > 0?item.urlList[0]:'../../../static/images/loading.png'" alt="">
                                  <i class="video_playicon"></i>
                                </div>
                              </div>
                          </div>
                      </li>
                  </ul>
                  <span class="no_data _cus_textCenter Block" v-show="newsListBox[index].showToast">没有更多新闻了!</span>
              </div>
          </scroller>
          <div v-transfer-dom class="v-transfer_content" v-show="videoBox" v-if="newsListBox[5].lists.length > 0 && keys == 5">
            <div v-show="videoBox" class="dialog-demo" :class="videoShow?'animateStart':'animateEnd'">
              <img src="../../../static/imgs/return_video.png" alt="" class="" @click="videoShow = false">
              <div class="img-box">
                <playDiv :playInfo="playInfo" ref="playDiv" :changeStatus="changeStatus" @changeFull="changeFull"></playDiv>
              </div>
            </div>
          </div>
      </div>
	</div>
</template>

<script>
import { newsApi } from "../../services/newsApi.js";
import { myPhotoApi } from "../../services/myPhotoApi.js";
import { HttpService } from "../../services/http";
import { mapMutations, mapState, mapGetters } from "vuex";
import { TransferDomDirective as TransferDom } from 'vux';
import playDiv from "../../components/playmodule/playmodule.vue";
import { setTimeout } from "timers";
export default {
  components: {
    playDiv
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      tabArr: [
        { tabName: "综合" },
        { tabName: "新闻" },
        { tabName: "视频" },
        { tabName: "音频" },
        { tabName: "图集" },
        { tabName: "我拍" }
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
      type: "1",
      newsListBox: [],
      list: [],
      contentType: "",
      searchVal: "",
      recomSetCode: "",
      tabIndex: 0,
      videoShow: false,
      videoBox: false,
      playInfo: {},
      changeStatus: ''
    };
  },
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = false;
    next();
  },
  computed: {
    ...mapState(["imgObj"]),
    ...mapGetters(["getTabindex"])
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
      if (newVal.path == "/public/searchlist") {
        // 记住本次切换记录
        this.tabIndex = this.index;
      } else {
        this.tabIndex = 0;
      }
    },
    videoShow(newVal,oldVal){
      if(newVal != oldVal){
        if(newVal){
          this.changeStatus = 'play';
        }else{
          this.changeStatus = 'pause';
        }
      }
    }
  },
  mounted() {
    //第一次加载
    this.getCloumnList();
    let recomSetCode = this.$route.query.recomSetCode;
    let SetCode = this.$route.query.SetCode;
    this.tabIndex = 0;
    this.$nextTick(() => {
      if (recomSetCode == "YNSJTSP" || SetCode == "YNSJTSP") {
        this.handler(2);
        setTimeout(() => {
          this.tabIndex = 2;
        });
      } else if (recomSetCode == "YNSJTWP") {
        this.handler(5);
        setTimeout(() => {
          this.tabIndex = 5;
        });
      } else {
        this.tabIndex = 0;
      }
    });
  },
  methods: {
    myphotoShow(url,keys){
      this.videoShow = true;
      this.videoBox = true;
      let videoUrl = '';
      videoUrl = url;
      this.myPhoto_box = true;
      this.playInfo = {
        url: videoUrl,
        type: 90,
        id: 0,
        pindao: true  
      };
      $('#my-player').addClass('myphoto-video');
    },
    changeFull(isStatus){
      if(isStatus){
         $('#my-player').removeClass('myphoto-video')
      }else{
        $('#my-player').addClass('myphoto-video')
      }
    },
    ...mapMutations({
      setImgArr: "saveImgInfo",
      setPath: "saveSearchPath",
      setTabObj: "saveTabObj"
    }),
    img_back(Obj, keys) {
      this.$nextTick(() => {
        this.setImgArr(Obj);
        this.$router.push({
          path: "/myphoto/mypreview",
          query: { imgIndex: keys }
        });
      });
    },
    // 遍历内容区域
    getCloumnList() {
      this.tabArr.map((i, keys) => {
        this.newsListBox.push({
          PageIndex: 1, //页码从第一页开始
          PageSize: 5, //煤业显示的条数
          isShow: false, //是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
          showloading: true,
          textloading: "加载中",
          showUp: true, //第一次隐藏下拉
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
          },
          index: keys
        });
      });
      // console.log(this.getTabindex)
      // if (this.newsListBox.length > 0) {
      //   this.index = this.getTabindex.tabindex;
      //   this.contentType = this.getTabindex.contentType;
      //   setTimeout(() => {
      //     if (this.index != 5) {
      //       this.getSearchList(true);
      //     } else {
      //       this.getMyVideoList(true);
      //     }
      //   }, 200);
      // }
      this.index = this.tabIndex;
      setTimeout(() => {
        if (this.index != 5) {
          this.getSearchList(true);
        } else {
          this.getMyVideoList(true);
        }
      }, 20);
    },
    Details_back(items) {
      let data = items.contentType;
      let videoLabel = undefined;
      let path = "";
      switch (data) {
        case "30":
          path = "/videodetails";
          videoLabel = items.liveStatus;
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
            : items.seriesType == "10" ? (path = "/videochannel") : path = "/programdetails";
          break;
      }
      let Json = {
        refType: items.contentType,
        id: items.id,
        columnCode: items.columnCode,
        videoLabel: videoLabel
      };
      this.$router.push({
        path: `/public${path}/${items.id}`,
        query: Json
      });
    },
    //第一次加载的时候容易为空true  新闻列表
    getSearchList(isEmpty) {
      //获取输入的标题
      let title = this.$route.query.title;
      this.searchVal = title;
      this.newsListBox[this.index].showloading = true;
      let JsonApi = {
        i: this.newsListBox[this.index].PageIndex,
        title: title ? title : undefined,
        contentType: this.contentType
      };
      newsApi.search(JsonApi).then(r => {
        // sucess callback
        var data = r.list;
        if (isEmpty) {
          this.newsListBox[this.index].lists = [];
          this.newsListBox[this.index].showToast = false;
          this.newsListBox[this.index].scrollerStatus.pullupStatus = "enabled";
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
            return;
          }
          this.newsListBox[this.index].isShow = false;
        }
        for (let i = 0; i < data.length; i++) {
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
          this.newsListBox[this.index].scrollerStatus.pullupStatus = "default";
          this.$nextTick(() => {
            this.$refs.scroller[0].reset();
          });
        }
      });
    },
    selPullUp() {
      this.newsListBox[this.index].PageIndex++;
      this.newsListBox[this.index].showUp = true;
      if (this.index != 5) {
        this.getSearchList(false);
      } else {
        this.getMyVideoList(false);
      }
      this.$nextTick(() => {
        this.$refs.scroller[0].reset();
      });
      this.videoBox = false;
    },
    selPullDown() {
      this.newsListBox[this.index].showUp = true;
      this.newsListBox[this.index].PageIndex = 1;
      if (this.index != 5) {
        this.getSearchList(true);
      } else {
        this.getMyVideoList(true);
      }
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
      this.videoBox = false;
    },
    activated() {
      this.$refs.scroller[0].reset();
    },
    //
    getArticleList() {},
    handler(keys) {
      this.index = keys;
      this.newsListBox[this.index].lists = [];
      this.newsListBox[this.index].PageIndex = 1;
      if (this.newsListBox[this.index].lists.length == 0) {
        if (keys == 0) {
          //综合
          this.contentType = "";
          this.getSearchList(true);
        } else if (keys == 1) {
          //新闻
          this.contentType = 10;
          this.getSearchList(true);
        } else if (keys == 2) {
          //视频
          this.contentType = 30;
          this.getSearchList(true);
        } else if (keys == 3) {
          //音频
          this.contentType = 40;
          this.getSearchList(true);
        } else if (keys == 4) {
          //图集
          this.contentType = 20;
          this.getSearchList(true);
        } else if (keys == 5) {
          //我拍
          this.getMyVideoList(true);
        }
      }
      // let bodys = {};
      // bodys.tabindex = keys;
      // bodys.contentType = this.contentType;
      //    this.setTabObj(bodys);
      this.videoBox = false;
    },
    //我拍列表
    getMyVideoList(isEmpty) {
      this.newsListBox[this.index].showloading = true;
      let title = this.$router.currentRoute.query.title;
      this.searchVal = title;
      let bodys = {
        i: this.newsListBox[this.index].PageIndex,
        content: title,
        _jsonp: true, //dataType: jsonp true/false
        _jsonpCallback: "onBack" //请求接口返回的callback
      };
      myPhotoApi.getMyPhotoList(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          // 接口访问成功，执行
          let data = r.list; //等级列表
          if (isEmpty) {
            this.newsListBox[this.index].lists = [];
            this.newsListBox[this.index].showToast = false;
            this.newsListBox[this.index].showUp = true;
            this.newsListBox[this.index].scrollerStatus.pullupStatus =
              "enabled";
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
            this.$nextTick(() => {
              this.$refs.scroller[0].reset();
            });
          }
        } else {
          // 返回错误信息
        }
      });
    },
    search_back() {
      this.$router.go(-1);
    },
    touchVal() {
      let recomSetCode = this.$router.currentRoute.query.recomSetCode;
      this.recomSetCode = recomSetCode;
      this.$router.push({
        path: "/public/searchMsg",
        query: { recomSetCode: recomSetCode }
      });
    }
  }
};
</script>

<style lang="less">
.searchList {
  background-color: #fff;
  .search_head {
    width: 100%;
    height: 1rem;
    color: #fff;
    position: fixed;
    top: 0;
    z-index: 1;
    display: flex;
    line-height: 1rem;
    font-size: 0.28rem;
    text-align: center;
    background: #f41a14;
    z-index: 2;
    .search_back {
      width: 0.22rem;
      height: 0.4rem;
      margin-left: 0.3rem;
      display: inline-block;
      background: url("../../../static/imgs/back.png") center center no-repeat;
      background-size: contain;
      z-index: 10;
    }
    .search_photo {
      width: 5.35rem;
    }
    .gobroke {
      height: 1rem;
      line-height: 1rem;
      right: 0.5rem;
      font-size: 0.4rem;
      color: #fff;
    }
    .search_box {
      flex: 1;
      height: 0.6rem;
      border: 2px solid #fff;
      border-radius: 0.1rem;
      margin: 0 0.3rem;
      .search_icon {
        width: 0.3rem;
        height: 0.3rem;
        background: url("../../../static/imgs/search.png") center center
          no-repeat;
        background-size: contain;
        z-index: 1;
        top: 0;
        left: 35%;
        bottom: 0;
        margin: auto;
      }
      .search_mode {
        position: absolute;
        left: 40%;
        width: 60%;
        height: 100%;
        padding-left: 0.1rem;
        border: none;
        outline: 0;
        box-sizing: border-box;
        display: block;
        font-size: 0.28rem;
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
  }
  .searchList_content {
    height: calc(100vh - 0.88rem - 0.98rem);
    .myPhoto_list {
      > li {
        display: flex;
        width: 100%;
        background: #fff;
        padding: 0.3rem;
        border-bottom: 1px solid #eee;
        > .head_photo {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
          margin-right: 0.4rem;
          overflow: hidden;
          background-color: #666;
        }
        > .myPhoto_posted {
          width: 85%;
          > p:first-child {
            width: 100%;
            color: #666666;
            box-sizing: border-box;
            padding: 0 0.2rem 0.2rem 0;
            margin-top: 0.1rem;
          }
          > p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 0.3rem;
          }
          > .myPhoto_img {
            > li {
              width: 1.7rem;
              height: 1.7rem;
              margin-top: 0.2rem;
              overflow: hidden;
              margin-left: 0.2rem;
              > img {
                width: 100%;
                height: 100%;
              }
            }
            > li:nth-child(3n + 1) {
              margin-left: 0rem;
            }
          }
        }
      }
    }
  }
  .newslist {
    height: 1.44rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .vux-tab-container,
  .vux-tab {
    height: 0.88rem !important;
  }
  
}
.myphoto-video{
    top: 0 !important;
    bottom: 0 !important;
    margin: auto !important;
  }
  .v-transfer_content{
    .dialog-demo{
      >img:nth-of-type(1){
        margin: .3rem;
        width: .4rem;
        height: .4rem;
      }
      z-index: 2;
      position: fixed;
      width: 100%;
      top: 0;
      height: 100vh;
      background-color: rgba(0, 0, 0, 1);
    }
  }
  .video-photo{
    margin-top: .2rem;
    height: 3rem;
    // margin-left: .2rem;
    position: relative;
    // max-width: 80%;
    // overflow: hidden;
    >img{
      width: 100%;
      height: 100%;
    }
    >.video_playicon{
      width: 16%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background: url(../../../static/imgs/playicon.png) no-repeat center center;
      background-size: 100%;
      z-index: 2;
    }
  }
  .animateStart{
    animation: identifier 200ms;
    animation-fill-mode : forwards;
  }
  .animateEnd{
    animation: animationEnd 200ms;
    animation-fill-mode : forwards;
  }
  @keyframes identifier {
    0% {
      transform: scale(0.4);
      opacity:0;
    }
    20% {
      transform: scale(0.4);
      opacity:0;
    }
    100% {
      transform: scale(1);
      opacity:1;
    }
  }
  @keyframes animationEnd {
    0% {
      transform: scale(1);
    }
    80% {
      transform: scale(0.4);
      opacity:0;
    }
    100%{
      transform: scale(0.4);
      opacity:0;
      visibility: hidden;
    }
  }

</style>