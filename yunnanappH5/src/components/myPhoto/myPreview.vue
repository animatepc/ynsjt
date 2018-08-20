<template>
	<div class="myPreview">
		<div class="searchVal _cus_flexContent _cus_fleAlignCen">
            <span class="search_back" @click="city_back"></span>
            <span class="city_text"><span class="mypreview_indexs">{{indexs}}</span>/{{imglength}}</span>
        </div>
        <div v-if="imgList.length > 0" class="swiper_content">
        	<swiper v-model.number="imgIndex"  :show-dots="false" class="swiper_box" @click.prevent.stop @on-index-change="swiperChange">
            <swiper-item @click.prevent.stop v-for="(item,keys) in imgList" :key="keys" class="imgtrans" :class="keys == imgIndex?'img_show':'img_hide'">
              <div class="pinch-zoom">
                <img :src="item.img" :key="item.img" :alt="item.img" class="touchArea"  @touchstart.prevent @touchend.prevent @tep.prevent>
              </div>
            </swiper-item>
          </swiper>
        </div>
        <actionsheet
          :value="actions.isActions"
          show-cancel
          class="actions_alert"
          :menus="actions.menus"
          @on-click-menu="clickMenu">
        </actionsheet>
	</div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import download from '../../common/js/downloadImg.js';
import { adapted } from "../../common/js/adapted.js";
import $ from "jquery";
import { clearTimeout, clearInterval, setTimeout } from "timers";
export default {
  data() {
    return {
      imglength: 3,
      indexs: 1,
      imgIndex:0,
      imgList: [],
      // 下载图片
      actions: {
        isActions: false,
        menus: {
          menuImg: "保存图片"
        }
      }
    };
  },
  computed: {
    ...mapState(["imgObj"]),
    ...mapGetters(["getPathObj"])
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/system/home") {
      to.meta.keepAlive = true;
    } else if (to.path == "/public/searchlist") {
      to.meta.keepAlive = true;
    } else if (to.path == "/multimedia/video") {
      to.meta.keepAlive = true;
    } else if (to.path == "/myphoto/shootlist") {
      to.meta.keepAlive = true;
    } else if (to.path == "/mymodule/mypicture") {
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  },
  mounted() {
    this.imglength = this.imgObj.length;
    this.imgIndex = this.$route.query.imgIndex
    this.imgObj.map(i => {
      this.imgList.push({ img: i });
    });
    // 
    let _this = this, timeOutEvent;
    this.$nextTick(() => {
      // 移动端点击放大效果
      $("div.pinch-zoom").each(function(e) {
        new RTP.PinchZoom($(this), {
          tapreset: true
        });
      });
    });
      // 处理手指长按
      // $(".touchArea").on({
      //   touchstart: function(e){
      //       timeOutEvent = setTimeout(()=>{
      //         // 执行长按
      //         // alert(1)
      //         // _this.actions.isActions = true;
      //       },1000);  
      //       // e.preventDefault();
      //   },  
      //   touchmove: function(){  
      //     clearTimeout(timeOutEvent);   
      //     timeOutEvent = 0;   
      //     // _this.actions.isActions = false;
      //   },  
      //   touchend: function(e){  
      //     clearTimeout(timeOutEvent);  
      //     if(timeOutEvent!=0){
      //       // _this.actions.isActions = false;
      //       // 执行点击事件
      //       // alert('执行点击事件');
      //     }   
      //     // return false;   
      //   }  
      // });
  },
  methods: {
    // 功能按钮
    clickMenu(keys, items) {
      this.actions.isActions = false;
      // console.log(items)
      //  var dataImg = canvas.toDataURL('image/png');
      //  let dataImg = this.imgList[this.indexs - 1].img;
      //  this.$refs.save.setAttribute('href',dataImg);
      //  this.$refs.save.click()
      // let Model = adapted.browser().versions.ios?'ios':adapted.browser().versions.android?'android':''
      // download.downloadImg(Model)
    },
    city_back() {
      if (this.getPathObj.path == "/public/searchMsg") {
        this.$router.push({
          path: this.getPathObj.path,
          query: { recomSetCode: this.getPathObj.recomSetCode }
        });
        return;
      } else if (this.getPathObj.path == "/public/searchlist") {
        this.$router.push({
          path: this.getPathObj.path
        });
        return;
      }
      this.$router.go(-1);
    },
    swiperChange(index) {
      this.indexs = index + 1;
    }
  }
};
</script>

<style lang="less">
.myPreview {
  background-color: #000;
  height: calc(100vh - 1rem);
  margin-top: 1rem;
  font-size: 0.28rem;
  color: #000;
  overflow: hidden;
  .searchVal {
    width: 100%;
    height: 1rem;
    position: fixed;
    top: 0;
    z-index: 1;
    display: flex;
    line-height: 1rem;
    text-align: center;
    background: #fff;
    z-index: 2;
    .search_back {
      width: 0.22rem;
      height: 0.4rem;
      margin-left: 0.3rem;
      display: inline-block;
      background: url("../../../static/imgs/atlas_left_arrow.png") center center
        no-repeat;
      background-size: contain;
      z-index: 10;
    }
    .search_box {
      height: 0.6rem;
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
      .mypreview_indexs {
        color: #f41a14;
      }
    }
  }
  .swiper_content {
    overflow: hidden;
    height: 100%;
    .swiper_box {
      height: 100% !important;
      .vux-swiper {
        height: 100% !important;
        .vux-swiper-item {
          display: flex;
          align-items: center;
          .pinch-zoom-container {
            width: 100%;
            overflow: inherit !important;
            .pinch-zoom,
            .pinch-zoom img {
              -webkit-touch-callout:default;
              -ms-touch-callout:default;
              -moz-touch-callout:default;
              touch-callout:default;
              width: 100%;
              -webkit-user-drag: none;
              -moz-user-drag: none;
              -ms-user-drag: none;
              user-drag: none;
            }
          }
        }
      }
    }
  }
  .actions_alert{
    .weui-actionsheet{
      .weui-actionsheet__action{
        margin-top: .06rem;
      }
       .weui-actionsheet__cell{
          font-size: .32rem;
          padding: .1rem 0;
        }
    }
  }
  .imgtrans{
    transition:all .2 s !important;
  }
  .img_show{
    opacity: 1;
    z-index: 1001;
  }
  .img_hide{
    opacity: 0;
    z-index: -1;
  }
}
</style>