<template>
    <div class="publicIndex" ref="publicIndex">
        <div class="logoApp" v-if="!isWebviewapp">
            <div>
                <img src="../../../static/imgs/logo.png" alt="">
                <strong>云南手机台</strong>
            </div>
        </div>
        <router-view :style="!isWebviewapp?'margin-bottom: 1.2rem':''"></router-view>
        <!-- <router-view></router-view> -->
        <div class="downloadApp" v-if="!isWebviewapp">
            <!-- <div>
                <img src="../../../static/imgs/live-logo.png" alt="">
                <div>
                    <strong>云南手机台</strong>
                    <span>Yunnan mobile phone station</span>
                </div>
                <input type="button" value="打开APP">
            </div> -->
            <div>
                <img src="../../../static/imgs/openApp.png" alt="">
                <span @click="openApp"></span>
            </div>
            
        </div>
    </div>
</template>
<script>
import { loginApi } from '../../services/loginApi.js';
import { coreApi } from '../../services/coreApi.js';
import { UserService } from '../../services/user.js';
import { mapState, mapMutations } from 'vuex';
import { adapted } from "../../common/js/adapted.js";
import { Share } from '../../common/js/bridgeShare.js';
import { openApp } from '../../common/js/openApp.js';
import { openInWebview } from '../../common/js/openInWebview.js';
    export default {
        data(){
            return {
                isWebviewapp: false
            }
        },
        mounted(){
            // this.getInfoUser();
            this.Model = adapted.browser().versions.ios?'ios':adapted.browser().versions.android?'android':''
            this.isWebview();
        },
        computed:{
            ...mapState(['loginMsg'])
        },
        methods:{
            openApp(){
                // alert('app://ynsjt:8888/newsHome');
                openApp("app://ynsjt:8888/newsHome",(opened)=>{
                    if(opened){
                        return
                    }else{
                        if(this.Model == 'android'){
                            window.location.href = 'http://android.myapp.com/myapp/detail.htm?apkName=sjt.yntv.com.yntv&ADTAG=mobile';
                        }else if(this.Model == 'ios'){
                            // 暂无
                        }
                    }
                },this.Model);
            },
            isWebview(){
                // 安卓使用方式
                // if(this.Model == 'android'){
                //     if (Share.bridgeShart({}, this.Model, 'qqZoneShare') != undefined) {
                //     // 在app内打开
                //     // to do something
                //         this.isWebviewapp = false;
                //         // alert('app打开')
                //     } else {
                //     // 其他地方
                //     // 发起微信授权
                //         this.isWebviewapp = true;
                //         // alert('网页打开')
                //     }
                //     // alert(Share.bridgeShart({}, this.Model, 'qqZoneShare'))
                // }else if(this.Model == 'ios'){
                    
                // }
                if(openInWebview()){
                    this.isWebviewapp = true;
                }else{
                    this.isWebviewapp = false;
                }
                
            },
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
                loginApi.valiLoginUser(bodys).then(r=>{

                });
            }
        }
    }
</script>
<style lang="less">
    .publicIndex{
        height: 100%;
        display: flex;
        flex-direction: column;
        .logoApp{
            height: 1rem;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 2000;
            background-color: #54595E;
            >div{
                height: 100%;
                position: relative;
                >img{
                    height: 80%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 5%;
                    margin: auto;
                }
                >strong{
                    position: absolute;
                    color: #fff;
                    font-size: .36rem;
                    line-height: 1rem;
                    font-weight: 400;
                    left: 20%;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }
            }
        }
		.downloadApp{
            height: 1.2rem;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            position: fixed;
            bottom: 0;
            left: 0;
            >div{
                position: relative;
                >img {
                    width: 100%;
                }
                >span{
                    display: block;
                    position: absolute;
                    right: 3%;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    width: 1.6rem;
                    height: .6rem;
                    font-size: .28rem;
                    color: #fff;
                }
            }
            
            
            // >div:nth-child(1){
            //     position: relative;
            //     height: 100%;
            //     >img:nth-child(1){
            //         position: absolute;
            //         top: 0;
            //         bottom: 0;
            //         left: 5%;
            //         margin: auto;
            //         width: 1rem;
            //     }
            //     >div:nth-child(2){
            //         height: 70%;
            //         position: absolute;
            //         top: 0;
            //         left: 20%;
            //         bottom: 0;
            //         margin: auto;
            //         color: #fff;
            //         font-size: .24rem;
            //         >strong{
            //             font-family: 'Courier New', Courier, monospace;
            //             font-size: .32rem;
            //         }
            //         >span{
            //             display: block;
            //         }
            //     }
            //     >input:nth-child(3){
            //         position: absolute;
            //         right: 5%;
            //         top: 0;
            //         bottom: 0;
            //         margin: auto;
            //         width: 1.6rem;
            //         height: .6rem;
            //         background-color: #E84A50;
            //         border: 1px solid #E84A50;
            //         color: #fff;
            //         border-radius: 5%; 
            //     }
            // }
        }
        .fatch_bridge{
            margin-left: 0.15rem;
            width: 0.4rem;
            height: 0.4rem;
            display: inline-block;
            background: url(../../../static/images/bridge.jpg) no-repeat;
            background-size: contain;
        }
        .popup_content{
        padding-top: .3rem;
        ul{
          overflow-y: scroll;
          padding: .3rem .3rem;
          li{
            margin-left: .3rem;
            >img{
              width: 80%;
            }
            >span{
              font-size: .24rem;
              white-space: nowrap;
            }
          }
          li:nth-of-type(1){
            margin-left: 0;
          }
        }
        .login_field {
          width: 90%;
          margin: 0 auto;
          border: none;
          border-top: 1px solid #eee;
          text-align: center;
          legend {
            display: inline-block;
            color: #999;
            font-size: 0.28rem;
            padding: 0 10px;
          }
        }
        .weui-btn_default{
          height: .8rem;
          font-size: .24rem;
        }
      }
}
</style>

