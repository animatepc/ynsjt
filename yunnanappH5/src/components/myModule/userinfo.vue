<template>
    <div class="userinfo">
        <div class="searchVal _cus_flexContent _cus_fleAlignCen">
            <span class="search_back" @click="city_back"></span>
            <span class="colorfff city_text">个人信息</span>
        </div>
        <ul class="userinfo_content">
            <li @click="SetUserhead">
                <span>头像</span>
                <div class="user_div">
                    <img :src="userAvatar !=''?userAvatar:'../../../static/imgs/normal_avatar.png'" alt="">
                    <i class="_cus_icoago"></i>
                </div>
            </li>
            <li @click="SetUsername">
                <span >用户名</span>
                <i style="float:right" class="_cus_icoago"></i>
                <span style="float:right">{{nickName}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import { UserService } from '../../services/user.js'
    export default {
        data(){
            return {
                userInfo:{},
                nickName:'',
                userAvatar:''
            }
        },
        mounted(){
            this.userInfo = Object.assign(this.userInfo,UserService.get())
            this.getInfoUser();
        },
        methods:{
            getInfoUser(){
                let nickName = this.$router.currentRoute.query.nickName; 
                let userAvatar = this.$router.currentRoute.query.userAvatar; 
                // console.log(this.$router);
                this.nickName = nickName; 
                this.userAvatar = userAvatar; 
            },
            city_back(){
                this.$router.go(-1)
            },
            SetUserhead(){
                this.$router.push({
                    'path': '/mymodule/setheadphoto',
                    query:{img:this.$router.currentRoute.query.userAvatar},
                })
            },
            SetUsername(){
                this.$router.push({
                    'path':'/mymodule/setusername',
                    query:{nickName:this.$router.currentRoute.query.nickName},
                })
            }
        }
    }
</script>
<style lang="less">
    .userinfo{
        background-color: #fff;
        margin-top: 1rem;
        font-size: 0.28rem;
        .searchVal{
            width: 100%;
            height: 1rem;
            color: #fff;
            position: fixed;
            top: 0;
            z-index: 1;
            display: flex;
            line-height: 1rem;
            text-align: center;
            background: #f41a14;
            z-index: 2;
            .search_back{
                width: 0.22rem;
                height: 0.4rem;
                margin-left: 0.3rem;
                display: inline-block;
                background: url('../../../static/imgs/back.png') center center no-repeat;
                background-size: contain;
                z-index: 10;
            }
            .search_box{
                height:.6rem;
                color: #fff;
                flex: 1;
                position: relative;
                overflow: hidden;
                border: 2px solid #fff;
                border-radius: .1rem;
                .search_icon{
                    width: .3rem;
                    height: .3rem;
                    background: url('../../../static/imgs/search.png') center center no-repeat;
                    background-size: .3rem .3rem;
                    z-index: 1;
                    top: 0;
                    left: 1.5rem;
                    bottom: 0;
                    margin: auto;
                }
                .search_mode{
                    width: 100%;
                    height: .6rem;
                    line-height: .6rem;
                    padding-left: 2rem;
                    outline: 0;
                    text-align: left;
                    box-sizing: border-box;
                    display: block;
                    font-size: 0.24rem;
                    background-color: #f41a14;
                    color: #fff;
                    &::-webkit-input-placeholder{ /*WebKit browsers*/
                        color: #fff;
                    }
                    &::-moz-input-placeholder{ /*Mozilla Firefox*/
                        color: #fff;
                    }
                    &::-ms-input-placeholder{ /*Internet Explorer*/ 
                        color: #fff;
                    }
                }
            }
            .search_city{
                height: .5rem;
                line-height: .5rem;
//              margin: 0 0.3rem;
                margin-right: 0.3rem;
            }
            .city_text{
                position: absolute;
                left: 0;
                width: 100vw;
                text-align: center;
                height: 1rem;
                line-height: 1rem;
                font-size: .32rem;
            }
        }
        .userinfo_content{
            font-size: .28rem;
            >li{
                >.user_div{
                    float: right;
                    font-size: 0.3rem;
                    height: 100%;
                    >img{
                        width: 0.7rem;
                        height: 0.7rem;
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                }
                height: 0.9rem;
                line-height: 0.9rem;
                padding: 0 0.3rem;
                border-bottom: 2px solid #eeeeee;
                >span{
                    float:left;
                }
            }
        }
    }    
</style>
