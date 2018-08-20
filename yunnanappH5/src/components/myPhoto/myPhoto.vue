<template>
    <div class="myPhoto">
      
		<scroller class="newsMessage_content bgfff perH100" style="height: 100%;" types="myPhoto_list" @pullDown="selPulldown" @pullUp="selPullup" :scrollerMsg="scrollerMsg" :dataList="newMsg" ref="scroller"></scroller>
    </div>
</template>
<script>
//引用ajax
import { HttpService } from "../../services/http.js";
import { myPhotoApi } from "../../services/myPhotoApi.js";
import Scroller from "../../base/scroller/scroller.vue";
import { shareWx } from '../../common/js/shareWeixin.js';
import { sms } from '../../services/commonApi.js'; 
export default {
  components: {
    Scroller
  },
  data() {
    return {
      scrollerMsg: {
        PageIndex: 1, //页码从第一页开始
        PageSize: 5, //每页显示的条数
        isShow: false, //是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
        showloading: false,
        showToast: false,
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
          pulldownStatus: "default",
          pullupStatus: "default"
        }
      },
      newMsg: [],
      img:''
    };
  },
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = false;
    next();
  },
  mounted() {
    this.getMyPhotoList(true);
    shareWx.getQueryString('shootlist');
  },
  methods: {
    selPulldown(index) {
      this.scrollerMsg.PageIndex = 1;
      this.getMyPhotoList(true);
    },
    selPullup(index) {
      this.scrollerMsg.PageIndex = index;
      this.getMyPhotoList(false);
    },
    // 获取视频第一帧的截图
    // getvideoImg(url){
    //   return new Promise((resolve,reject)=>{
    //      let video;
    //       var scale = 0.8;
    //       var captureImage = ()=> {
    //           var canvas = document.createElement("canvas");
    //           canvas.width = video.videoWidth * scale;
    //           canvas.height = video.videoHeight * scale;
    //           canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
              
    //           resolve(canvas.toDataURL("image/png"))
    //       };          
    //       var initialize = ()=> {
    //           // this.$refs.video.src = require('../../../static/video/201807030406515b3b2e9b71f4b.mp4');
              
    //           video = this.$refs.video;
    //           video.setAttribute('src',url);
    //           video.addEventListener('loadeddata', captureImage);
    //       };
    //       initialize();
    //   })
    // },
    //获取我拍列表
    getMyPhotoList(isEmpty) {
      // 请求data
      let bodys = {
        i: this.scrollerMsg.PageIndex
      };
      // 调用gloabApi的api 参数是bodys r 接口返回的数据对象
      myPhotoApi.getMyPhotoList(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          var data = r.list;
          if (isEmpty) {
            this.newMsg = [];
            this.$nextTick(() => {
              this.scrollerMsg.scrollerStatus.pullupStatus = "disabled"
                ? (this.scrollerMsg.scrollerStatus.pullupStatus = "default")
                : "";
                this.scrollerMsg.showToast = false;
              this.scrollerMsg.show = false;
              this.$refs.scroller.enablePullup();
            });
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
            // if(data[i].url !=''){
            //   data[i]["videoImg"] = '';
            //   // let a= 0
            //   this.getvideoImg(data[i].url).then(src=>{
            //     data[i]["videoImg"] = src;
            //   })
            // }
            this.newMsg.push(data[i]);
          }
          // console.log(data)
          this.scrollerMsg.isShow = true;
          this.scrollerMsg.showloading = false;
          if (!isEmpty) {
            this.scrollerMsg.scrollerStatus.pullupStatus = "default";
            this.$nextTick(() => {
              this.$refs.scroller.reset();
            });
          }
        } else {
          // alert("接口调用失败");
          // console.log("接口调用失败");
        }
        // 微信分享方法
        var _this = this;
        var url =window.location.href.split('#')[0];
        console.log(r.list[0])
        var shareData = {
              title: r.list[0].content, 
              desc: r.list[0].content, 
              imgUrl:  r.list[0].urlList.length> 0?r.list[0].urlList[0]:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png', 
              link: window.location.href.split('#')[0]+'#'+window.location.href.split('#')[1]
        }; 
        shareWx.share(`${sms}weichatShare/sign.do?url=${url}`, {}, shareData, ['wx','firends','wb','qq','zone']);

      });
    }
  }
};
</script>
<style lang="less">
.myPhoto {
  height: calc(100vh - 2rem);
  background: #fff;
}
.video-list{
  display: none;
}
</style>

