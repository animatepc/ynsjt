<template>
    <div class="video">
       <tab
        active-color="#fc2506"
        bar-active-color="#fc2506"
        :animate="false"
        :line-width="2"
        style="padding-top: .88rem;">
            <tab-item
            	style="height: .88rem;line-height: .88rem;font-size: .28rem;"
            v-for="(item,keys) in tabArr"
            :selected="keys == tabs_box"
            :key="keys"
            @click.native="handler(keys,item.treeCode)"><span>{{item.treeName}}</span></tab-item>
        </tab>
        <div class="video_content _cus_overHidden perH100 bgfff">
        	<div class="perH100 _cus_flexContent _cus_direction" v-if="0 == tabs_box">
          <div  v-if="jplist.length > 0" style="height: 4rem;">
            <swiper class="swiper" :list="jplist" :show-dots="false" :show-desc-mask="true" :loop="true" :auto="true" height="4rem"></swiper>
	    		</div> 
          <scroller
                :lock-x="true"
                :scrollbarY="true"
                :bounce="false"
                ref="myScroller"
                style="height: auto;"
                class="_cus_flex1">
             	<div ref="video_box perH100">
             		<div class="video_channel" ref="video_channel">
			    		<p class="video_title _cus_flexContent _cus_jusContent bgfff">
			    			<span class="">按频道查找</span>
			    			<span @click="ishide = !ishide" class="_cus_flexContent _cus_fleAlignCen">
			    				所有频道
			    				<i class="ishide_icon" style="margin-left: .1rem;" :class="ishide?'icon_rotate':''" ></i>
			    			</span>
			    		</p>
			    		<ul class="video_channel_list _cus_textCenter" :class="ishide?'list_ellipsis':'list_auto'"> 
                <li v-for="(item,keys) in channelList" :key="keys" @click="Details_go(item)">{{item.channelName}}</li> 
			    		</ul>
			    	</div>
	        	
		        	<div class="video_program _cus_overHidden" ref="video_program">
			        	<p class="video_program_title _cus_flexContent _cus_jusContent _cus_fleAlignCen"  @click="AllProgram_go()">
			        		<span>所有节目</span>
			        		<i class="video_arrow"></i>
			        	</p>
			        	<ul class="video_program_list _cus_overHidden">
			        		<li v-for="(item,keys) in watchList" :key="keys" @click="Details_go(item)">
			        			<img v-lazy="item.listImgOne" :key="item.listImgOne" alt="" class="Block"/>
			        			<label for="">{{item.listTitle}}</label>
			        		</li>
			        	</ul>
			        </div>
		        </div>
	    	</scroller>		    	
		    </div>	
        	<div class="_cus_overHidden  perH100 bgfff" v-if="1 == tabs_box">
                <div class="_cus_overHidden perH100 _cus_flexContent _cus_direction scroller_hots">
                <div style="height: 4rem" v-if="getSlider.length > 0">
                   <swiper  class="swiper" :list="getSlider" :loop="true" :show-dots="false" :show-desc-mask="true" :auto="true" height="4rem"></swiper>
                </div>
                 <scroller-hots v-if="imgArr.length > 0" class="newsMessage_content bgfff _cus_flex1" style="height: 100%" types="videoBox" @pullDown="boxPulldown" @pullUp="boxPullup" :scrollerMsg="scrollerBox" :dataList="imgArr" ref="scroller"></scroller-hots>
                <p v-else class="_cus_textCenter">暂无数据~</p>
                </div>   
        	</div>
        	<div 
            class="_cus_overHidden"
              v-for="(item,keys) in newsList"
              :key="keys"
              v-if="keys == tabs_box - 2"
              style="height: calc(100vh - 1rem - .88rem - .98rem);" >
             <scroller-video v-if="item.videoList.length > 0" class="newsMessage_content bgfff" style="height: 100%" types="videoList" @pullDown="selPulldown" @pullUp="selPullup" :scrollerMsg="item.scrollerMsg" :dataList="item.videoList" ref="scrollers"></scroller-video>
        	  <p v-else class="_cus_textCenter">暂无数据~</p>
          </div>
        </div>
    </div>
</template>

<script>
import { HttpService } from "../../services/http.js";
import { videoApi } from "../../services/videoApi.js";
import Slider from "../../base/slider/slider.vue";
import ScrollerVideo from "../../base/scroller/scroller.vue";
import ScrollerHots from "../../base/scroller/scroller.vue";
export default {
  components: {
    Slider,
    ScrollerVideo,
    ScrollerHots
  },
  data() {
    return {
      ishide: true,
      tabArr: [
        { tabName: "品牌栏目" },
        { tabName: "云上热播" },
        { tabName: "短视频" }
      ],
      imgArr: [],
      tabs_box: 0,
      getSlider: [],
      channelList: [],
      PageIndex: 1, //页码从第一页开始
      PageSize: 5, //煤业显示的条数
      isShow: true, //是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
      showloading: false,
      textloading: "加载中",
      showToast: false,
      showUp: true,
      isbounce: false,
      jplist: [],
      watchList: [],
      upobj: {
        content: "请下拉加载数据",
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: "请下拉加载数据",
        upContent: "请下拉加载数据",
        loadingContent: "加载中...",
        clsPrefix: "xs-plugin-pullup-"
      },
      isShowLoading: false,
      textLoading: "加载中",
      scrollerStatus: {
        pullupStatus: "default"
      },
      newsList: [],
      columnList: [],
      listColumnCode: 0,
      scrollerMsg: {
        PageIndex: 1, //页码从第一页开始
        PageSize: 5, //煤业显示的条数
        isShow: true, //是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
        showloading: false,
        textloading: "加载中",
        showToast: false,
        showUp: true,
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
      },
      scrollerBox: {
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
        },
        page: false
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = false;
    next();
  },
  mounted() {
    // let a1 = this.$refs.video_channel.clientHeight,
    //   a2 = this.$refs.video_program.clientHeight;
    // this.$refs.video_box.style = `calc(height:${a1 + a2}px + .2rem + .3rem)`;
    this.getListColumn();
  },
  methods: {
    selPulldown(index) {
      this.newsList[this.tabs_box - 2].scrollerMsg.PageIndex = 1;
      this.getList(true);
    },
    selPullup(index) {
      this.newsList[this.tabs_box - 2].scrollerMsg.PageIndex = index;
      this.getList(false);
    },
    boxPulldown(index) {
      this.scrollerBox.PageIndex = 1;
      this.getImgArrList(true);
    },
    boxPullup(index) {
      this.scrollerBox.PageIndex++;
      this.getImgArrList(false);
    },
    videoDetails(items) {
      let data = items.contentType,
        path = "";
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
              : "";
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
    },
    AllProgram_go(type) {
      let path = "/channelDetails";
      this.$router.push({
        path: `/public${path}/${Math.random()}`,
        query: ""
      });
    },
    Details_go(items) {
      let contentType = items.contentType;
      let orderBy = 20;
      let path = `/channelDetails/${items.id}`;
      if (contentType == "50") {
        path = `/programdetails/${items.id}`;
      }
      let Json = {
        channelId: items.channelId,
        id: items.id,
        channel: items.channelName,
        recomSetCode: "YNSJTSP"
      };
      this.$router.push({
        path: `/public${path}`,
        query: Json
      });
    },
    //视频-->品牌栏目-->频道、节目2
    getWatchList() {
      var columnId = "YNSJTJMDB";
      var bodys = {
        _jsonp: true,
        _jsonpCallback: "onBack",
        columnId: columnId
      };
      videoApi.watchList(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          //轮播图
          r.jpList.map(i => {
            i["img"] = i.recomImage;
            i["title"] = i.name;
            switch (i.contentType) {
              case "30":
                i["url"] = `/public/videodetails/${i.id}?refType=${
                  i.contentType
                }&id=${i.contentId}&columnCode=null`;
                break;
              case "10":
                i["url"] = `/public/newsdetails/${i.id}?refType=${
                  i.contentType
                }&id=${i.contentId}&columnCode=null`;
                break;
              case "20":
                i["url"] = `/public/atlasdetails/${i.id}?refType=${
                  i.contentType
                }&id=${i.contentId}&columnCode=null`;
                break;
              case "40":
                i["url"] = `/public/audiodetails/${i.id}?refType=${
                  i.contentType
                }&id=${i.contentId}&columnCode=null`;
                break;
              case "60":
                i["url"] = `/public/specialdetails/${i.id}?refType=${
                  i.contentType
                }&id=${i.contentId}&columnCode=null`;
                break;
              case "50":
                i.seriesType == "0"
                  ? (i["url"] = `/public/programdetails/${i.id}?refType=${
                      i.contentType
                    }&id=${i.contentId}&columnCode=null`)
                  : i.seriesType == "10"
                    ? (i["url"] = `/public/videochannel/${i.id}?refType=${
                        i.contentType
                      }&id=${i.contentId}&columnCode=null`)
                    : i["url"] = `/public/programdetails/${i.id}?refType=${
                      i.contentType
                    }&id=${i.contentId}&columnCode=null`;
                break;
            }
          });
          this.$nextTick(() => {
            // 接口访问成功，执行
            //视频-->品牌栏目--频道、节目
            this.channelList = r.channelsList;
            // 轮播
            this.jplist = r.jpList;
            this.watchList = r.ptList;
          });
        } else if (!r.status) {
          // 返回错误信息
          this.watchList = [];
        }
      });
    },
    //获取轮播列表
    getSliderList() {
      var recomSetCode = "YNSJTYSRB";
      var bodys = {
        _jsonp: true,
        _jsonpCallback: "onBack",
        recomSetCode: recomSetCode
      };
      videoApi.recom(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          // 接口访问成功，执行
          let resultList = r.list;
          resultList.map(i => {
            switch (i.contentType) {
              case "30":
                i["url"] = `/public/videodetails/${i.id}?refType=${
                  i.contentType
                }&id=${i.contentId}&columnCode=null`;
                break;
              case "10":
                i["url"] = `/public/newsdetails/${i.id}?refType=${
                  i.contentType
                }&id=${i.contentId}&columnCode=null`;
                break;
              case "20":
                i["url"] = `/public/atlasdetails/${i.id}?refType=${
                  i.contentType
                }&id=${i.contentId}&columnCode=null`;
                break;
              case "40":
                i["url"] = `/public/audiodetails/${i.id}?refType=${
                  i.contentType
                }&id=${i.contentId}&columnCode=null`;
                break;
              case "60":
                i["url"] = `/public/specialdetails/${i.id}?refType=${
                  i.contentType
                }&id=${i.contentId}&columnCode=null`;
                break;
              case "50":
                i.seriesType == "0"
                  ? (i["url"] = `/public/programdetails/${i.id}?refType=${
                      i.contentType
                    }&id=${i.contentId}&columnCode=null`)
                  : i.seriesType == "10"
                    ? (i["url"] = `/public/videochannel/${i.id}?refType=${
                        i.contentType
                      }&id=${i.contentId}&columnCode=null`)
                    : (i["url"] = `/public/programdetails/${i.id}?refType=${
                      i.contentType
                    }&id=${i.contentId}&columnCode=null`);
                break;
            }
            i["img"] = i.recomImage;
            i["title"] = i.name;
          });
          this.$nextTick(() => {
            this.getSlider = resultList; //轮播列表
          });
        } else if (!r.status) {
          // 返回错误信息
          this.getSlider = [];
        }
        this.getImgArrList(true);
      });
    },
    //获取节目列表
    getImgArrList(isEmpty) {
      var columnCode = "YNSJTSPXW1";
      var bodys = {
        i: this.scrollerBox.PageIndex,
        _jsonp: true,
        _jsonpCallback: "onBack",
        columnCode: columnCode
      };
      videoApi.video(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          // 接口访问成功，执行
          var data = r.list;
          // 上拉刷新
          if (isEmpty) {
            this.imgArr = [];
            this.scrollerBox.scrollerStatus.pullupStatus = "enabled";
            this.scrollerBox.showToast = false;
            this.$nextTick(() => {
              this.$refs.scroller.reset();
            });
            // 下拉加载
          } else {
            //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
            if (data && data.length === 0) {
              this.scrollerBox.page = true;
              this.scrollerBox.showToast = true;
              this.scrollerBox.isShowLoading = false;
              this.scrollerBox.scrollerStatus.pullupStatus = "disabled"; // 禁用下拉
              return;
            }
            this.scrollerBox.isShow = false;
          }
          for (var i = 0; i < data.length; i++) {
            data[i]["type"] = "tab_video";
            var urlList = data[i].urlList;
            if (urlList.length > 0) {
              data[i]["imgurl"] = urlList[0];
            }
            this.imgArr.push(data[i]);
          }

          this.scrollerBox.isShow = true;
          this.scrollerBox.showloading = false;
          if (!isEmpty) {
            this.scrollerBox.scrollerStatus.pullupStatus = "default";
            this.$nextTick(() => {
              this.$refs.scroller.reset();
            });
          }
        } else if (!r.status) {
          // 返回错误信息
          this.imgArr = [];
        }
      });
    },
    //获取数据列表
    //品牌栏目
    getListColumn() {
      let bodys = {
        _jsonp: true,
        _jsonpCallback: "onBack",
        columnCode: "YNSJTJMDBJPJM",
        type: 2
      };
      videoApi.getColumnVideoList(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          // 接口访问成功，执行
          this.tabArr = r.list;
          for (let i = 0; i < this.tabArr.length - 2; i++) {
            this.newsList.push({
              videoList: [],
              scrollerMsg: this.scrollerMsg
            });
          }
        } else if (!r.status) {
          // 返回错误信息
          this.tabArr = [];
        }
        this.$nextTick(() => {
          this.getWatchList();
        });
      });
    },

    //短视频
    getList(isEmpty) {
      var columnCode = this.listColumnCode;
      var bodys = {
        i: this.newsList[this.tabs_box - 2].scrollerMsg.PageIndex,
        _jsonp: true,
        _jsonpCallback: "onBack",
        columnCode: columnCode
      };
      videoApi.video(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          // 接口访问成功，执行
          var data = r.list;
          if (isEmpty) {
            this.newsList[this.tabs_box - 2].videoList = [];
            this.newsList[
              this.tabs_box - 2
            ].scrollerMsg.scrollerStatus.pullupStatus =
              "enabled";
            this.newsList[this.tabs_box - 2].showToast = false;
            this.$nextTick(() => {
              this.$refs.scrollers && this.$refs.scrollers.length > 0
                ? this.$refs.scrollers[0].reset()
                : "";
            });
          } else {
            //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
            if (data && data.length === 0) {
              this.newsList[this.tabs_box - 2].scrollerMsg.showToast = true;
              this.newsList[
                this.tabs_box - 2
              ].scrollerMsg.isShowLoading = false;
              this.newsList[
                this.tabs_box - 2
              ].scrollerMsg.scrollerStatus.pullupStatus =
                "disabled"; // 禁用下拉
              return;
            }
            this.newsList[this.tabs_box - 2].scrollerMsg.isShow = false;
          }
          for (var i = 0; i < data.length; i++) {
            data[i]["type"] = "tab_video";
            var urlList = data[i].urlList;
            if (urlList.length > 0) {
              data[i]["imgurl"] = urlList[0];
            }
            // console.log(this.tabs_box);
            this.newsList[this.tabs_box - 2].videoList.push(data[i]);
            // console.log(this.newsList[this.tabs_box - 2].videoList);
          }
          this.newsList[this.tabs_box - 2].scrollerMsg.isShow = true;
          this.newsList[this.tabs_box - 2].scrollerMsg.showloading = false;
          if (!isEmpty) {
            this.newsList[
              this.tabs_box - 2
            ].scrollerMsg.scrollerStatus.pullupStatus =
              "default";
            this.$nextTick(() => {
              this.$refs.scrollers && this.$refs.scrollers.length > 0
                ? this.$refs.scrollers[0].reset()
                : "";
            });
          } else if (!r.status) {
            // 返回错误信息
            console.log(r.status);
            this.newsList[this.tabs_box - 2].videoList = [];
          }
        }
      });
    },
    handler(index, treeCode) {
      this.tabs_box = index;
      console.log(this.tabs_box);
      this.listColumnCode = treeCode;
      if (index == 0) {
        this.channelList = [];
        this.watchList = [];
        this.Jplist = [];
        this.getWatchList();
      } else if (index == 1) {
        this.scrollerMsg.PageIndex = 1;
        this.getSlider = [];
        this.imgArr = [];
        this.getSliderList(true);
      } else {
        this.newsList[index - 2].scrollerMsg.PageIndex = 1;
        this.newsList[index - 2].videoList = [];
        this.getList(true);
      }
    },
    loadImage() {},
    selPullUp() {},
    channelJump() {
      this.$router.push({
        path: "/public/channeldetails"
      });
    }
  }
};
</script>
<style lang="less">
.video {
  .slider-wrapper {
    position: relative;
    overflow: hidden;
    margin-top: 0.3rem;
    margin-bottom: 0.2rem;
    .slider {
      width: 94%;
      height: 4rem;
      margin: 0 3%;
      overflow: hidden;
    }
  }
  .video_content {
    height: calc(100vh - 1rem - 0.88rem - 0.98rem);
    .video_channel {
      padding: 0 0.3rem;
      background: #fff;
      margin-bottom: 0.3rem;
      overflow: hidden;
      .video_title {
        overflow: hidden;
        min-height: 0.84rem;
        line-height: 0.84rem;
        .ishide_icon {
          display: inline-block;
          width: 0.22rem;
          height: 0.22rem;
          background: url(../../../static/imgs/arroe.png) no-repeat;
          background-size: contain;
          transform: rotate(180deg);
          transition: all 0.5s;
        }
        .icon_rotate {
          transform: rotate(90deg);
        }
      }
      .video_channel_list {
        overflow: hidden;
        > li {
          width: 30%;
          height: 0.7rem;
          line-height: 0.7rem;
          float: left;
          background-color: #f7f7f7;
          margin-bottom: 0.3rem;
          margin-right: 5%;
          border-radius: 0.05rem;
        }
        > li:nth-child(3n + 3) {
          margin-right: 0;
        }
      }
      .list_auto {
        height: auto;
      }
      .list_ellipsis {
        height: 1rem;
      }
    }
    .video_program {
      background-color: #fff;
      padding: 0.3rem 0;
      margin-bottom: 0.2rem;
      .video_program_title {
        padding: 0 0.3rem;
        font-size: 0.3rem;
        margin-bottom: 0.3rem;
        overflow: hidden;
      }
      .video_arrow {
        width: 0.3rem;
        height: 0.3rem;
        display: inline-block;
        background: url("../../../static/imgs/arrow.png") no-repeat;
        background-size: contain;
      }
      .video_program_list {
        > li {
          width: 48%;
          margin-right: 4%;
          margin-top: 0.3rem;
          float: left;
          > img {
            width: 100%;
            height: 2.2rem;
          }
        }
        > li:nth-of-type(2n) {
          margin-right: 0;
        }
      }
    }
    .video_list {
      background: #fff;
      > li {
        padding: 0.2rem 0.3rem;
        border-bottom: 1px solid #eeeeee;
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
          line-height: 0.48rem;
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
        .home_time {
          bottom: 0;
          margin-top: 0.3rem;
          font-size: 0.2rem;
          .new_watch {
            margin-left: 0.15rem;
            width: 0.29rem;
            height: 0.2rem;
            display: inline-block;
            background: url(../../../static/imgs/eye.png) no-repeat left center;
            background-size: 100%;
          }
        }
        .imageNews-img {
          width: 2.2rem;
          height: 1.44rem;
          margin-left: 0.2rem;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .swiper {
    p {
      height: auto !important;
      font-size: 0.3rem !important;
    }
  }
  .vux-tab-container,
  .vux-tab {
    height: 0.88rem !important;
  }
  .video_program_list {
    padding: 0 0.3rem;
    > li {
      margin-top: 0.3rem;
      margin-bottom: 0 !important;
      label {
        display: block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .video_hots_list {
    padding: 0.3rem;
    padding-top: 0;
    overflow: hidden;
    > li {
      width: 48%;
      margin-right: 4%;
      margin-bottom: 0.3rem;
      float: left;
      > img {
        width: 100%;
        height: 2rem;
      }
    }
    > li:nth-of-type(2n) {
      margin-right: 0;
    }
  }
}
</style>

