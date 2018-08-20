<template>
    <div class="myPhotoIndex">
        <div class="logoApp" v-if="!isWebviewapp">
            <div>
                <img src="../../../static/imgs/logo.png" alt="">
                <strong>云南手机台</strong>
            </div>
        </div>
        <router-view :style="!isWebviewapp?'margin-bottom: 1.2rem':''"></router-view>
        <div class="downloadApp" v-if="!isWebviewapp" style="z-index: 2;">
            <div>
                <img src="../../../static/imgs/openApp.png" alt="">
                <input type="button" value="打开APP" @click="openApp">
               
            </div>
            
        </div>
    </div>
</template>
<script>
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
                if(openInWebview()){
                    this.isWebviewapp = true;
                }else{
                    this.isWebviewapp = false;
                }   
            }
        }
    }
</script>
<style lang="less">
	.myPhotoIndex{
		height: 100%;
        display: flex;
        flex-direction: column;
        .logoApp{
            height: 1rem;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 2;
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
                >input{
                    position: absolute;
                    right: 3%;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    width: 1.6rem;
                    height: .6rem;
                    line-height: .6rem;
                    background-color: #E84A50;
                    border: 1px solid #E84A50;
                    font-size: .28rem;
                    color: #fff;
                    border-radius: 5%; 
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
	}
</style>
