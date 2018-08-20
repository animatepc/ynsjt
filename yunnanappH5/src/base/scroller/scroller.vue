<template>
    <div class="">
         <scroller
            v-if="scrollerMsg"
            v-show="scrollerMsg.isShow"
            v-model="scrollerMsg.scrollerStatus"
            lock-x
            scrollbar-y
            class="scroller"
            ref="scroller"
            :bounce="scrollerMsg.isbounce"
            :use-pullup="scrollerMsg.showUp"
            :use-pulldown="true"
            :pulldown-config="scrollerMsg.downObj"
            :pullup-config="scrollerMsg.upobj" 
            @on-pulldown-loading="selPullDown"
            @on-pullup-loading="selPullUp"
            style="height: 100% !important;">
           <div class="_cus_overHidden">
             <!-- 意见反馈 -->
             <div v-if="types=='feedback'" class="feedback">
               <span class="newsMessage_notime" v-if="!dataList.length">您还没有提过意见~<router-link to="/system/home">去查看新闻</router-link></span>
                <ul class="newsMessage_list _cus_overHidden" v-else>
                    <li v-for="(item,keys) in dataList" :key="keys">
                    	<div class="my-comment">
                    		<div class="my-info">
                        <span class="feedback_con">{{item.feedbackContent}}</span>
                        <span class="feedback-time">{{item.createDateStr}}</span>
                    		</div>
                            <div class="reply-wrap" v-for="(reply,index) in item.replyList" :key="index">              
                                <div class="comment-text">官方回复：
                                    <span class="my-time">{{reply.replyTimeStr}}</span>
                                </div>              
                                <span>{{reply.replyContent}}</span>
                            </div>
                    	</div>

                    </li>
                </ul>
             </div>
             <!-- 我的消息 -->
             <div v-if="types=='newsMessage'" class="newsMessage_content">
                <ul class="newsMessage_list _cus_overHidden">
                    <li v-for="(item,keys) in dataList" :key="keys">   
                      <span class="new_date_span">
                          {{item.logTimeStr}}
                      </span>
                      <div class="new_date_con">
                        <span class="new_span"><span class="new_span_color">管理员</span>{{item.messageCotent}}</span>
                        <span class="Block perW100 _cus_overHidden _cus_fleAlignCen _cus_jusContent" style="display: flex;">
                            <span class="new_icon __cus_fl" v-if="item.readStatus == '0'">new</span>
                            <router-link :to="arg[item.messageType ]" class="new_span_a">去查看></router-link>
                        </span>
                      </div>
                    </li>
                </ul>
             </div>
             <!--  -->
              <ul class="scroll_program_list _cus_overHidden" v-if=" types == 'channelDetails'">
                  <li v-for="(item,keys) in dataList" @click="Details_back(item)" :key="keys">
                    <img v-lazy="item.listImgOne" alt="" :key="item.listImgOne" class="Block"/>
                    <label for="" class="Block perW100 pa_title">{{item.listTitle}}</label>
                  </li>
              </ul>
              <!--  -->
              <ul v-if="types == 'myintegration'" class="">
                  <li class="myintegration_list" v-for="(item,index) in dataList" :key="index">
                      <div>
                          <span>{{item.createTimeStr}}</span>
                          <span>{{item.reason}}</span>
                      </div>
                      <span class="myIntegration_tip">{{item.amount}}</span>
                  </li> 
                </ul>
                <!--  -->
                <ul class="video_list _cus_overHidden" v-if="types == 'videoList'">
                  <li v-for="(item,keys) in dataList" :key="keys" class="_cus_flexContent" @click="Details_back(item)">
                      <div class="_cus_overHidden __cus_fl _cus_flex1 _cus_posRelative" >
                          <span v-show="item.tab" class="source-handle-title">{{item.tab}}</span>
                          <label class="source-label">{{item.listTitle}}</label>
                          <div class="tabImg" v-show="item.type =='tab' || item.type =='tab_video'" :class="item.type=='tablist'?'_cus_posRelative':''">
                              <div class="list_live _cus_posAbsolute" v-show="item.isLive == '1'" :class="item.liveStatus == '0'?'live_state':item.liveStatus == '20'?'live_state':'live_loading'">{{item.liveStatus == '0'?'未开始':item.liveStatus == '10'?'直播中':item.liveStatus == '20'?'已结束':item.liveStatus == '30'?'直播预告':item.liveStatus == '40'?'直播回看':''}}</div>
                              <img class="" v-lazy="item.imgurl" :key="item.imgurl" alt="">
                              <i class="video_playicon" v-show="item.type =='tab_video'"></i>
                          </div>
                          
                          <p class="home_time _cus_overHidden color999" :class="item.type =='tablist'?'_cus_posAbsolute perW100':''">
                              <span class="__cus_fl">
                                  <span>{{item.soure}}</span>
                                  <span class="">{{item.createTimeStr}}</span>
                                  
                              </span>
                              <span class="__cus_fr">
                                  <span>{{item.virtualClickTimes}}</span>
                                  <span class="new_watch"></span>
                              </span>
                          </p>
                      </div>
                      <div v-show="item.type == 'tablist'" class="_cus_overHidden __cus_fr imageNews-img">
                          <img v-lazy="item.imgurl" :key="item.imgurl" alt="">
                      </div>
                    </li> 
	                </ul>
                  <!--  -->
				        	<ul class="video_program_list _cus_overHidden" v-if="types =='videoBox'">
				        		<li v-for="(item,keys) in dataList" :key="keys" @click="Details_back(item)">
				        			<img v-lazy="item.imgurl" :key="item.imgurl" alt="" class="Block"/>
				        			<label for="">{{item.listTitle}}</label>
				        		</li>
				        	</ul>
                  <!-- 我拍 -->
                  <ul class="myPhoto_list _cus_overHidden" v-if="types == 'myPhoto_list'">
                    <li v-for="(item,keys) in dataList" :key="keys">
                      <img class="head_photo" v-lazy="item.userAvatar" :key="item.userAvatar" alt=""/>
                      <div class="myPhoto_posted">
                        <div class="_cus_flexContent _cus_jusContent">
                          <span class="__cus_fl">{{item.nickName}}</span>
                          <span class="__cus_fr">
                            {{item.createTimeStr}}
                          <img src="../../../static/imgs/share.png" @click="fatchBridge(item)" style="margin-left: .2rem; width:.2rem;">
                          </span>
                        </div>
                        <p class="my_p_se">{{item.content}}</p>
                        <ul class="myPhoto_img _cus_overHidden"  v-if="item.url ==''">
                          <li class="__cus_fl" v-for="(img,keys) in item.urlList" :key="keys" @click="img_back(item.urlList,keys)">
                            <img v-lazy="img" :key="img" alt="" class="" />
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
                  <!-- 我的我拍 -->
                  <ul class="myPicture_list _cus_overHidden" v-if="types == 'myPicture_list'">
                    <li v-for="(item,keys) in dataList" :key="keys">
                      <img class="head_photo" v-lazy="item.userAvatar" :key="item.userAvatar" alt=""/>
                      <div class="my_posted">
                        <div class="_cus_flexContent _cus_jusContent">
                          <span class="__cus_fl">{{item.nickName}}</span>
                          <span class="__cus_fr">{{item.createTimeStr}}</span>
                        </div>
                        <p class="my_p_se">{{item.content}}</p>
                        <ul class="myPhoto_img _cus_overHidden">
                          <li class="__cus_fl" v-for="(img,index) in item.urlList" :key="index">
                            <div class="">
                              <img v-lazy="img" :key="img" alt="" class="" @click="img_back(item.urlList,index)"/>
                            </div>
                          </li>
                          
                        </ul>
                        <div style="margin-top: .3rem;">
                          <span :class="item.checkStatus == '2'?'ready_status':item.checkStatus == '3'?'error_status':''">{{item.checkStatus =='1'?'待审核':item.checkStatus == '2'?'已审核':item.checkStatus == '3'?'未通过':''}}</span>
                          <span @click="clearMsg(item)">删除</span>
                        </div>
                        <div v-show="item.checkStatus == '3'">
                          <p>驳回原因</p>
                          <p>{{item.remarks}}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <!--  -->
                <ul class="home_list _cus_overHidden" v-if="types != 'myPhoto_list' && types != 'channelDetails' && types != 'myintegration' && types !='videoList' && types !='videoBox' && types !='myPicture_list' && types !='newsMessage' && types !='feedback'">
                    <li v-for="(item,keys) in dataList" :key="keys" class="_cus_flexContent" @click="Details_back(item)">
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
                                        <img v-lazy="img" :key="img" alt="">
                                    </li>
                                </ul>
                            </div>
                            <p class="home_time _cus_overHidden perW100 color999" style="">
                                <span v-show="item.topFlag == '1'" class="source-handle-title" style="margin-top:0px">置顶</span>
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
                            <img v-lazy="item.urlList[0]" :key="item.urlList[0]" alt="">
                            <i class="audio_icon" v-show="item.type == 'tabAudio'"></i>
                        </div>
                    </li>
                </ul>
                <span class="no_data _cus_textCenter Block" v-show="scrollerMsg.showToast">{{types !='myintegration'?'没有更多新闻了!':'没有更多记录了'}}</span>
            </div>
        </scroller>
        <div v-transfer-dom class="v-transfer_content" v-show="videoBox" v-if="dataList.length > 0 && types == 'myPhoto_list'">
            <div v-show="videoBox" class="dialog-demo" :class="videoShow?'animateStart':'animateEnd'">
              <img src="../../../static/imgs/return_video.png" alt="" class="" @click="videoShow = false">
              <div class="img-box">
                <playDiv :playInfo="playInfo" ref="playDiv" :changeStatus="changeStatus" @changeFull="changeFull"></playDiv>
              </div>
            </div>
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
import { mapMutations, mapState } from "vuex";
import { TransferDomDirective as TransferDom } from 'vux';
import playDiv from "../../components/playmodule/playmodule.vue";
import { setTimeout } from 'timers';
import { adapted } from "../../common/js/adapted.js";
import { Share } from '../../common/js/bridgeShare.js';
// 加载dplayer
// import 'DPlayer/dist/DPlayer.min.css';
// import DPlayer from 'DPlayer';
export default {
  data(){
    return {
      myPhoto_box:false,
      playInfo:{},
      changeStatus: '',
      src:'',
      videoShow: false,
      videoBox: false,
      show: false,
      Model: '',
      bodys: {}, //分享的信息
      dialogIndex: '',
      videoUrl:''
    }
  },
  components:{
    playDiv
  },
  props: ["scrollerMsg", "dataList", "newsList", "setHeight", "types", "arg"],
  computed: {
    ...mapState(["imgObj"])
  },
  directives: {
    TransferDom
  },
  filters: {
    htmlDecodeByRegExp(item) {
      let str = item || '';
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
  mounted(){
    this.$nextTick(()=>{
      this.videoShow = false;
    })
    setTimeout(()=>{
      this.videoShow = false;
    },300);
    this.Model = adapted.browser().versions.ios?'ios':adapted.browser().versions.android?'android':'';
  },
  watch: {
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
  methods: {
    fatchBridge(item){
      this.bodys = Object.assign(this.bodys,  {
          img: item.urlList.length> 0?item.urlList[0]:'http://static.yntv.cn/upload/Yntv_app/Baoliao/2018_08/04/201808040642435b6583233031c.png',
          title: item.content,
          introduce: item.content,
          url: window.location.href
        })
      if(this.Model == 'ios'){
        this.show = true;
      }else{
        Share.bridgeShart(this.bodys,this.Model, 'OpenShareMenu')
      }
      // console.log(this.bodys)
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
      Share.bridgeShart(this.bodys,this.Model, 'qqZoneShare')
    },
    qqFriendShare(){
      if(this.Model == 'ios'){
        Share.bridgeShart(this.bodys,this.Model, 'qqFriendShare')
      }else{
        Share.bridgeShart(this.bodys,this.Model, 'qqFirendShare')
      }
      
    },
    weiXinFriendShare(){
      Share.bridgeShart(this.bodys,this.Model, 'weiXinFriendShare')
    },
    weiXinCircleShare(){
      Share.bridgeShart(this.bodys,this.Model, 'weiXinCircleShare')
      
    },
    weiboShare(){
      Share.bridgeShart(this.bodys,this.Model, 'weiboShare')
    },
    myphotoShow(url,keys){
      this.videoShow = true;
      this.videoBox = true;
      // this.dialogIndex = keys;
      this.videoUrl = url;
      this.myPhoto_box = true;
      this.playInfo = {
        url: this.videoUrl,
        type: 90,
        id: 0,
        pindao: true  
      };
      // console.log(url)
      $('#my-player').addClass('myphoto-video');
      
      //  let _this =this;
      //   this.player = new DPlayer({
      //     container: document.getElementById('player'),
      //     screenshot: true,
      //     autoplay: true,
      //     contextmenu:[],
      //     customType: {
      //       'customWebTorrent': function(video,player) {
      //         player.container.classList.add('dplayer-loading');
      //       }
      //     },
      //     video: {
      //         url: url
      //     }
      // });
    },
    changeFull(isStatus){
      if(isStatus){
         $('#my-player').removeClass('myphoto-video')
      }else{
        $('#my-player').addClass('myphoto-video')
      }
    },
    selPullDown() {
      setTimeout(() => {
        this.scrollerMsg.scrollerStatus.pulldownStatus = "disabled";
        this.$nextTick(() => {
          this.scrollerMsg.scrollerStatus.pulldownStatus = "disabled"
            ? (this.scrollerMsg.scrollerStatus.pulldownStatus = "default")
            : "";
          this.$refs.scroller.reset();
        });
        this.scrollerMsg.PageIndex++;
        this.$emit("pullDown", this.scrollerMsg.PageIndex);
      }, 1000);
      
    },
    selPullUp() {
      this.scrollerMsg.PageIndex++;
      this.$emit("pullUp", this.scrollerMsg.PageIndex);
      this.$nextTick(() => {
        this.$refs.scroller.reset();
      });
      this.videoBox = false;
    },
    Details_back(items) {
      let data = items.contentType;
      let path = "";
      switch (data) {
        case "30":
          path = "/videodetails";
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
          //  path = '/videochannel'
          path = "/programdetails";
          break;
      }
      let Json = {
        refType: items.contentType,
        id: items.id,
        columnCode: items.columnCode
      };
      if (
        (this.types == "myCollection" && items.contentStatus != "20") ||
        (this.types == "recordhist" && items.contentStatus != "20")
      ) {
        this.$router.push({
          path: "/mymodule/errordetails"
        });
      } else {
        this.$router.push({
          path: `/public${path}/${items.id}`,
          query: Json
        });
      }
    },
    reset() {
      this.$refs.scroller.reset();
    },
    enablePullup() {
      this.$refs.scroller.enablePullup();
    },
    ...mapMutations({
      setImgArr: "saveImgInfo"
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
    clearMsg(item) {
      this.$emit("clearMsg", item);
    }
  }
};
</script>
<style lang="less">
*{
  -webkit-overflow-scrolling: touch !important;
  overflow-scrolling: touch !important;
}
.scroller {
  -webkit-overflow-scrolling: touch;
  .myintegration_list {
    padding: 0 0.3rem;
    height: 0.95rem;
    line-height: 0.95rem;
    overflow-y: visible;
    font-size: 0.28rem;
    color: #000;
    background: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    > div {
      > span:first-child {
        display: inline-block;
        width: 2rem;
      }
    }
    > span:last-child {
      color: #fc5b45;
      text-align: right;
    }
  }
  .video_program_list {
    overflow: hidden;
    > li {
      width: 48%;
      margin-right: 4%;
      margin-bottom: 0.3rem;
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
  .myPhoto_list {
    display: flex;
    width: 100%;
    background: #fff;
    display: block;
    padding: 5px;
    > li {
      padding: 0.3rem;
      display: flex;
      border-bottom: 1px solid #eee;
      width: 100%;
      float: left;
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
          padding: 0.2rem 0.1rem 0.33rem 0;
          margin-top: 0.1rem;
          justify-content: space-between;
          > span:nth-of-type(2) {
            float: right;
          }
        }
        > ul:nth-of-type(1) {
          > li {
            width: 1.7rem;
            height: 1.7rem;
            // border: 1px solid #ccc;
            margin-top: 0.2rem;
            overflow: hidden;
            > img {
              width: 100%;
              height: 100%;
            }
          }
        }
        > p {
          margin-top: .3rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 0.3rem;
        }
        > .myPhoto_img {
          > li {
            width: 100%;
            margin-top: 0.2rem;
            margin-left: 0.2rem;
            overflow: hidden;
            > div:nth-child(1) {
              width: 1.7rem;
              height: 1.7rem;
              // border: 1px solid #ccc;
              margin-top: 0.2rem;
              overflow: hidden;
              > img {
                height: 100%;
                width: 100%;
              }
            }
            > div:nth-of-type(2) {
              margin-top: 0.1rem;
              overflow: hidden;
              > span:nth-of-type(1) {
                float: left;
              }
              > span:nth-of-type(2) {
                float: right;
              }
            }
            > div:nth-of-type(3) {
              margin-top: 0.3rem;
              background-color: #f4f4f4;
              padding: 0.1rem 0.1rem 0.3rem 0.15rem;
              border-radius: 4px;
              > p:nth-child(1) {
                width: 100%;
                color: #666666;
                padding: 0.2rem 0.1rem 0.33rem 0;
                box-sizing: border-box;
              }
              > p:nth-of-type(2) {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 24px;
              }
            }
          }
          @media screen and (max-width: 650px) {
            > li:nth-child(3n + 1) {
              margin-left: 0rem;
            }
          }
          @media screen and (min-width: 650px) {
            >li {
              margin-left: 0.2rem;
            }
          }
        }
      }
      .my_posted {
        width: 85%;
        > p:first-child {
          width: 100%;
          color: #666666;
          box-sizing: border-box;
          padding: 0.2rem 0.1rem 0.33rem 0;
          margin-top: 0.1rem;
          > span:nth-of-type(2) {
            float: right;
          }
        }
        > ul:nth-of-type(1) {
          > li {
            width: 1.7rem;
            height: 1.7rem;
            // border: 1px solid #ccc;
            margin-top: 0.2rem;
            overflow: hidden;
            > img {
              // width: 100%;
              // height: 100%;
            }
          }
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
            width: 100%;
            margin-top: 0.2rem;
            margin-left: 0.2rem;
            overflow: hidden;
            > div:nth-child(1) {
              width: 1.7rem;
              height: 1.7rem;
              // border: 1px solid #ccc;
              margin-top: 0.2rem;
              overflow: hidden;
              > img {
                height: 100%;
                width: 100%;
              }
            }
          }
          @media screen and (max-width: 650px) {
            > li:nth-child(3n + 1) {
              margin-left: 0rem;
            }
          }
          @media screen and (min-width: 650px) {
            >li {
              margin-left: 0.2rem;
            }
          }
        }
        > div:nth-of-type(1) {
          margin-top: 0.1rem;
          overflow: hidden;
          > span:nth-of-type(1) {
            float: left;
          }
          > span:nth-of-type(2) {
            float: right;
          }
        }
        > div:nth-of-type(2) {
          margin-top: 0.3rem;
          background-color: #f4f4f4;
          padding: 0.1rem 0.1rem 0.3rem 0.15rem;
          border-radius: 4px;
          > p:nth-child(1) {
            width: 100%;
            color: #666666;
            padding: 0.2rem 0.1rem 0.33rem 0;
            box-sizing: border-box;
          }
          > p:nth-of-type(2) {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 24px;
          }
        }
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

  }
  .myPicture_list {
    -webkit-overflow-scrolling: touch;
    display: flex;
    width: 100%;
    background: #fff;
    display: block;
    padding: 5px;
    > li {
      padding: 0.3rem;
      display: flex;
      border-bottom: 1px solid #eee;
      width: 100%;
      float: left;
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
          padding: 0.2rem 0.1rem 0.33rem 0;
          margin-top: 0.1rem;
          justify-content: space-between;
          > span:nth-of-type(2) {
            float: right;
          }
        }
        > ul:nth-of-type(1) {
          > li {
            width: 1.7rem;
            height: 1.7rem;
            // border: 1px solid #ccc;
            margin-top: 0.2rem;
            overflow: hidden;
            > img {
              width: 100%;
              height: 100%;
            }
          }
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
            width: 100%;
            margin-top: 0.2rem;
            overflow: hidden;
            > div:nth-child(1) {
              width: 1.7rem;
              height: 1.7rem;
              // border: 1px solid #ccc;
              margin-top: 0.2rem;
              overflow: hidden;
              > img {
                height: 100%;
                width: 100%;
              }
            }
            > div:nth-of-type(2) {
              margin-top: 0.1rem;
              overflow: hidden;
              > span:nth-of-type(1) {
                float: left;
              }
              > span:nth-of-type(2) {
                float: right;
              }
            }
            > div:nth-of-type(3) {
              margin-top: 0.3rem;
              background-color: #f4f4f4;
              padding: 0.1rem 0.1rem 0.3rem 0.15rem;
              border-radius: 4px;
              > p:nth-child(1) {
                width: 100%;
                color: #666666;
                padding: 0.2rem 0.1rem 0.33rem 0;
                box-sizing: border-box;
              }
              > p:nth-of-type(2) {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 24px;
              }
            }
          }
          @media screen and (max-width: 650px) {
            > li:nth-child(3n + 1) {
              margin-left: 0rem;
            }
          }
          @media screen and (min-width: 650px) {
            >li {
              margin-left: 0.2rem;
            }
          }
        }
      }
      .my_posted {
        width: 85%;
        > p:first-child {
          width: 100%;
          color: #666666;
          box-sizing: border-box;
          padding: 0.2rem 0.1rem 0.33rem 0;
          margin-top: 0.1rem;
          > span:nth-of-type(2) {
            float: right;
          }
        }
        > ul:nth-of-type(1) {
          > li {
            width: 1.7rem;
            height: 1.7rem;
            // border: 1px solid #ccc;
            margin-top: 0.2rem;
            overflow: hidden;
            > img {
              // width: 100%;
              // height: 100%;
            }
          }
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
            width: 100%;
            margin-top: 0.2rem;
            margin-left: 0.2rem;
            overflow: hidden;
            > div:nth-child(1) {
              width: 1.7rem;
              height: 1.7rem;
              // border: 1px solid #ccc;
              margin-top: 0.2rem;
              overflow: hidden;
              > img {
                height: 100%;
                width: 100%;
              }
            }
          }
          > li:nth-child(3n + 1) {
            margin-left: 0;
          }
        }
        > div:nth-of-type(2) {
          margin-top: 0.1rem;
          overflow: hidden;
          > span:nth-of-type(1) {
            float: left;
          }
          > span:nth-of-type(2) {
            float: right;
          }
        }
        > div:nth-of-type(3) {
          margin-top: 0.3rem;
          background-color: #f4f4f4;
          padding: 0.1rem 0.1rem 0.3rem 0.15rem;
          border-radius: 4px;
          > p:nth-child(1) {
            width: 100%;
            color: #666666;
            padding: 0.2rem 0.1rem 0.33rem 0;
            box-sizing: border-box;
          }
          > p:nth-of-type(2) {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 24px;
          }
        }
      }
    }
  }
  .ready_status {
    color: green;
  }
  .error_status {
    color: #f41a14;
  }
  .newsMessage_content {
    background-color: #f6f6f6 !important;
    .newsMessage_list {
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      > li {
        border-bottom: 2px solid #eeeeee;
        .new_span_a {
          float: left;
          color: #007aff;
        }
        .new_span {
          float: left;
          text-align: left;
          // margin-left: 0.3rem;
        }
        .new_span_color {
          color: #999999;
          margin-right: 6px;
        }
        .new_date_span {
          width: 100%;
          display: block;
          padding: 0.3rem 0;
          text-align: center;
        }
        .new_date_con {
          padding: 0 0.3rem;
          text-align: center;
          line-height: 0.9rem;
          overflow: hidden;
          border-radius: 0.1rem;
          background: #ffffff;
        }
      }
    }
    .newsMessage_notime {
      display: block;
      width: 100%;
      padding-top: 1rem;
      text-align: center;
    }
  }
  .feedback {
    .newsMessage_list {
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 15px;
      font-size: 0.28rem;
      > li {
        width: 94%;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        padding: 0.05rem 3%;
        border-bottom: 0.02rem solid #eee;
      }
      .feedback_con {
        width: 100%;
        overflow: hidden;
        box-flex: 1;
        -webkit-box-flex: 1;
        word-break: break-all;
        word-warp: break-word;
        display: block;
        line-height: 0.4rem;
        text-align: left;
      }
      .feedback-time {
        display: block;
        width: 100%;
        text-align: right;
        margin-top: 8px;
      }
      .my-comment {
        width: 100%;
      }
      .my-info {
        -webkit-box-align: center;
        align-items: center;
        margin-bottom: 0.2rem;
      }
      .reply-wrap {
        background: #f2f2f2;
        padding: 0.2rem 0.3rem;
        margin-bottom: 0.35rem;
      }
      .comment-text {
        margin-bottom: 0.1rem;
        .my-time {
          float: right;
        }
      }
    }
    .newsMessage_notime {
      display: block;
      width: 100%;
      padding-top: 1rem;
      text-align: center;
    }
  }
  .newslist {
    height: 1.44rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
    .vux-transfer{
      .weui-mask{
        background-color: #000;
      }
    }
    // .dplayer-controller-mask{
    //   height: .98rem !important;
    // }
    // .dplayer-controller{
    //   height: .41rem !important;
    //   padding: 0 .2rem !important;
    //   .dplayer-bar-wrap{
    //     height: .04rem !important;
    //     bottom: .33rem !important;
    //     padding: .05rem 0 !important;
    //     width: calc(100% - .4rem) !important;
    //   }
    //   .dplayer-bar{
    //     height: .04rem;
    //   }
    //   .dplayer-icons-left{
    //     height: .38rem !important;
    //     .dplayer-play-icon{
    //       padding: .07rem !important;
    //       width: .4rem !important;
    //       margin: 0 -.03rem !important;
    //     }
    //   }
    //   .dplayer-time{
    //     line-height: .38rem !important;
    //     font-size: .28rem !important;

    //   }
    //   .dplayer-icons-right{
    //     right: .2rem !important;
    //     height: .38rem !important;
    //     .dplayer-setting{
    //       display: none !important;
    //     }
    //     .dplayer-full-icon{
    //       .dplayer-icon-content{
    //         display: none !important;
    //       }
    //     }
    //     .dplayer-icon:last-child{
    //       display: none !important;
    //     }
    //     .dplayer-full-in-icon{
    //       top: -.3rem !important;
    //       padding: .08rem !important;
    //       width: .4rem !important;
    //       margin: 0 -.03rem !important;
    //     }
    //   }
    //   .dplayer-loaded, .dplayer-played{
    //     height: .03rem !important;
    //   }
    // }
    #my-player{
      z-index: 5500 !important;
    }
}
 .myphoto-video{
    top: 0 !important;
    bottom: 0 !important;
    margin: auto !important;
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
</style>

