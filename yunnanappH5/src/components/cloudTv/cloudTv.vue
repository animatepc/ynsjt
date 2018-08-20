<template>
  <div class="cloudtv">
    <div class="cloudtv_head">
      <div class="video" id="isVideo">
        <playDiv :playInfo="playInfo" :radioMsg="radioMsg"></playDiv>
      </div>
    </div>
    <div class="cloudtv_content">
      <p class="cloudtv_tab">
        <span class="" @click="actionClick('off')" :class="isMsg == 'off'?'tab_active':''">
            <i class="" :class="isMsg == 'off'?'live_active':''"></i>
            切换频道
        </span>
        <span  class="" @click="actionClick('no')" :class="isMsg == 'no'?'tab_active':''">
            <i class="" :class="isMsg == 'no'?'look_active':''"></i>
            回看
        </span>
      </p>
      <div class="cloudtv_fun" v-show="isMsg == 'off'">
        <p class="">
          <span @click="getDate('0')"  :class="type=='0'?'cloudtv_active':''">看电视</span>
          <span @click="getDate('10')" :class="type=='10'?'cloudtv_active':''">听广播</span>
        </p>
        <!-- 看视频列表 -->
        <ul v-show="!isAction" class="listtv"> 
          <li v-for="(item,index) in tvArray" :key="item.id" @click="changeActive(index,item.id,item.repositoryUrl)" :class="[icon_supp==index? 'active':'']">{{item.title}}</li>
        </ul>
        <!-- 听广播列表 -->        
      </div>
      <div v-show="isMsg == 'no'" class="lookBack _cus_flexContent">
        <ul class="_cus_flexContent _cus_direction">
          <li v-for="(item,keys) in detaArray" :key="keys" @click="lookBackActive(item,keys)"
              :class="keys == indexs?'lookBack_active':''">{{item.name}}
          </li>
        </ul>
        <scroller class="_cus_flex1 scrollBox"  :lockX="true" :scrollbarY="true">
          <div class="">
            <ul class="liveList" v-for="(tab,num) in cloudArr" :key="num" v-show="indexs == num" v-if="cloudArr[indexs].cloud.length > 0">
              <li v-for="(item,keys) in tab.cloud" :key="keys" @click="livePlay(item,keys)" :style="liveIndex == keys?color.color:''">
                <span :style="liveIndex == keys?color.bgColor:''"></span>
                <span>{{item.startTimeStr}}</span>
                <span>{{item.name}}</span>
                <span :class="item.playStatus == '0'?'live_str':'live_load'">{{item.playStatus == '0'?'未开播':item.playStatus == '1'?'回看':'直播中'}}</span>
                
              </li>
            </ul>
            <div class="_cus_flex1 _cus_flexContent _cus_justifyCen _cus_fleAlignCen"  v-else>
                 <span v-if="num == 0 && cloudArr[indexs].cloud.length == 0">暂无数据~</span>
            </div>
          </div>
          
        </scroller>

      </div>
    </div>
  </div>
</template>
<script>
import playDiv from "../playmodule/playmodule.vue";
import { sms } from "../../services/commonApi.js";
import { newsApi } from "../../services/newsapi.js";
import { HttpService } from "../../services/http";
import { cloudTvApi } from "../../services/cloudTvApi.js";
import { network } from '../../common/js/bridgeNetwork.js';
import { adapted } from "../../common/js/adapted.js";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      isAction: false,
      iscloudtv: false,
      tvArray: [],
      radioArray: [],
      icon_supp: "-1",
      url: sms,
      detaArray: [],
      days:'',
      indexs: 0,
      type: "0",
      id: "",
      playInfo: {},
      radioMsg:{
        thumbnail:''
      },
      isMsg: "off",
      liveList: [],
      weekIndexs:'',
      cloudArr:[],
      Model:'',
      networkMsg:null,
      liveIndex: 0
    };
  },
  watch: {
    weekIndexs(newVal,old){
      this.cloudtv_live()
      // console.log(newVal)
    }
  },
  methods: {
    actionClick(msg) {
      this.isMsg = msg;
      if (this.type == "10") {
        this.isMsg = "off";
      }
      if(this.type == "0"){
        this.getWeekList();
        this.indexs = 0;
      }
    },
    livePlay(item,keys) {
      this.liveIndex = keys;
      let bodys = {};
      bodys.channelId = item.channelId;
      bodys.startTimestampe = item.startTime;
      bodys.endTimestampe = item.endTime;
      if (item.playStatus != "0") {
        cloudTvApi.livePlay(bodys).then(r => {
          if (r.status && r.statusCode == "200") {
            this.playInfo = {
              url: r.data,
              type: 90,
              id: 0,
              pindao: true
            };
          }
        });
      }
    },
    cloudtv_live() {
      let bodys = {};
      bodys.channelId = this.id;
      bodys.day = this.weekIndexs;
      // console.log(bodys)
      this.cloudArr[this.indexs]['cloud'] = [];
      cloudTvApi.livePrograms(bodys).then(r => {
        let liveList = r.list;
        this.cloudArr[this.indexs]['cloud'] = liveList;
      });
    },
    changeActive(index, id, url) {
      this.icon_supp = index;
      this.id = id;
      this.url = url;
      
      //检测当前网络
      // this.$bridge.callhandler('changeNetwork', (data) => {
		  //       // 处理返回数据
		  //     //  alert(data)
      //  });
        if(this.type == '10'){
          this.radioMsg = {
            thumbnail:'',
            programName:''
          }
          let bodys = {};
          bodys.channelId = id;
          cloudTvApi.radioDetails(bodys).then(r=>{
            if(r.statusCode == '200'){
              if(r.status){
                this.radioMsg = r.data;
              }else{
                this.radioMsg = {
                  thumbnail:'',
                  programName:''
                }
              }
              
            }
             this.playInfo = {
              url: this.url,
              type: 90,
              id: this.id,
              pindao: true,
            };
          })
        }else{
           this.playInfo = {
            url: this.url,
            type: 90,
            id: this.id,
            pindao: true,
          };
          this.radioMsg = {
            thumbnail:'',
            programName:''
          };
        }
    },
    lookBackActive(item,keys) {
      this.indexs = keys;
      this.weekIndexs = item.day;
      this.liveIndex = 0;
    },
    getDate(type) {
      this.type = type;
      let bodys = {
        columnId: "YNSJTPDZBZB1",
        type: this.type
        // day: this.days
      };
      this.$nextTick(()=>{
        HttpService.post(newsApi.api.livelist, bodys, false, true).then(r => {
          if(r.status && r.statusCode == '200'){
            this.tvArray = r.list;
            if(this.tvArray.length > 0){
              this.changeActive(0,r.list[0].id,r.list[0].repositoryUrl);
            }
          }
        });
      })
    },
    getWeekList() {
      cloudTvApi.liveWeekList().then(r => {
        if (r.status && r.statusCode == "200") {
          this.detaArray = r.list;
          // console.log(r)
          this.weekIndexs = r.list[0].day;
          let arr = {'cloud':[]};
          this.detaArray.map(()=>{
            this.cloudArr.push(arr)
          })
          // console.log(this.cloudArr)
          this.cloudtv_live()
        }
      });
    }
  },
  components: {
    playDiv
  },
  computed:{
    ...mapState(['colorMsg']),
    color(){
      return {
        color:`color:${this.colorMsg.color}`,
        bgColor:`backgroundColor: ${this.colorMsg.color}`
      }
    }
  },
  mounted() {
  	this.Model = adapted.browser().versions.ios?'ios':adapted.browser().versions.android?'android':''
    this.type = 0;
    this.playInfo = {
      url: this.url,
      type: 90,
      id: this.id,
      pindao: true
    };
    this.$nextTick(()=>{
      this.getDate("0");
    })
  }
};
</script>


<style lang="less">
.cloudtv {
  background-color: #fff;
  .cloudtv_head {
    width: 100%;
    height: 4.2rem;
    z-index: 200;
    padding-top: 1px;
  }

  .live-broadcast .video {
    height: 4.2rem;
  }
  .week.active {
    background: #f41a14;
    color: #fff;
  }
  .news-container {
    padding-top: 7.18rem !important;
  }
/*    .video{
        position: fixed;
        top: 0.88rem;
        left: 0;
        width: 100%;
        height: 5.7rem;
        z-index: 99;
      }*/
  .tabBtn {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .programCon {
    flex: 1;
    // box-flex: 1;
    // -webkit-box-flex: 1;
    display: flex;
    padding: 0 0.3rem 1rem;
  }
  .video {
    padding: 0;
    margin-top: 0.5rem;
    height: 3rem;
  }
  .video-dialog {
    display: none !important;
  }
  .video-js {
    width: 100%;
    height: auto;
  }

  .cloudtv_content {
    padding-top: 0.2rem;
    margin-top: 0.4rem;
    .cloudtv_tab {
      display: flex;
      background-color: #fff;
      display: flex;
      height: 0.9rem;
      border-bottom: 1px solid #eee;
      > span {
        flex: 1;
        color: #999;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }
      > span:nth-of-type(1) {
        > i {
          width: 0.3rem;
          height: 0.3rem;
          display: inline-block;
          margin-right: 0.1rem;
          background: url("../../../static/imgs/tab.png") no-repeat;
          background-size: contain;
        }
        .live_active{
            width: 0.3rem;
            height: 0.3rem;
            display: inline-block;
            margin-right: 0.1rem;
            background: url("../../../static/imgs/tab_check.png") no-repeat;
            background-size: contain;
        }
      }
      > span:nth-of-type(2) {
        > i {
          width: 0.3rem;
          height: 0.3rem;
          display: inline-block;
          margin-right: 0.1rem;
          background: url("../../../static/imgs/menu.png") no-repeat;
          background-size: contain;
        }
        .look_active{
          width: 0.3rem;
          height: 0.3rem;
          display: inline-block;
          margin-right: 0.1rem;
          background: url("../../../static/imgs/menu_check.png") no-repeat;
          background-size: contain;
        }
      }
    }
    .tab_active {
      color: #ef131c !important;
    }
    .listtv {
      width: auto;
      clear: both;
      overflow: hidden;
      li {
        float: left;
        width: 25%;
        height: 0.7rem;
        line-height: 0.7rem;
        background-color: #f7f7f7;
        margin-bottom: 0.3rem;
        margin-right: 6.2%;
        border-radius: 5px;
        text-align: center;
      }
      li:nth-child(3n+1){
        margin-left: 6.2%;
      }
      .active {
        color: #fff;
        background-color: #fe2902;
      }
    }
    .cloudtv_fun {
      background-color: #fff;
      padding: 0.4rem 0.3rem 0.98rem;
      height: calc(100vh - 4.2rem - 0.9rem - 0.6rem - 1rem);
      overflow: auto;
      > p:nth-of-type(1) {
        width: 3.4rem;
        height: 0.6rem;
        line-height: 0.6rem;
        border: 2px solid #ef131c;
        color: #ef131c;
        display: flex;
        margin: 0 auto;
        border-radius: 0.1rem;
        overflow: hidden;
        margin-bottom: 0.5rem;
        > span {
          text-align: center;
          flex: 1;
        }
        .cloudtv_active {
          background: #ef131c;
          color: #fff;
        }
      }
    }
  }
  .lookBack {
    background-color: #fff;
    > ul:nth-of-type(1) {
      height: calc(100vh - 4.2rem - 0.9rem - 0.6rem - 1rem);
      width: 2rem;
      font-size: 0.28rem;
      > li {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        margin-bottom: 0.02rem;
        background-color: #f5f5f5;
      }
      .lookBack_active {
        background-color: #fd2703;
        color: #fff;
      }
    }
  }
  .liveList {
    padding: 0 0.6rem;
    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 0.7rem;
      position: relative;
      border-left: 1px solid #e0dede;
      position: relative;
      > span:nth-of-type(1) {
        position: absolute;
        display: inline-block;
        width: 0.1rem;
        height: 0.1rem;
        background-color: #e0dede;
        border-radius: .05rem;
        left: -0.05rem;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      > span:nth-of-type(2) {
      }
      > span:nth-of-type(3) {
        width: 2rem;
        margin-left: 0.35rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      > span:nth-of-type(4) {
        // width: 0.9rem;
        height: 0.34rem;
        padding: 0 .2rem;
        text-align: center;
        display: inline-block;
        line-height: 0.34rem;
        font-size: 0.20rem;
        border-radius: 3px;
      }
      .live_str {
        border: 1px solid #999;
        color: #999;
      }
      .live_load {
        margin-left: .1rem;
        border: 2px solid #ef131c;
        color: #ef131c;
      }
    }
  }
  .scrollBox {
    height: calc(100vh - 4.2rem - 0.9rem - 0.6rem - 1rem) !important;
  }
}
</style>

