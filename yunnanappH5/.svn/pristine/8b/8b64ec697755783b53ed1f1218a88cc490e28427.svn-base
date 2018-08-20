<template>
    <div class="integrationRule">
        <div class="searchVal _cus_flexContent _cus_fleAlignCen">
            <span class="search_back" @click="city_back"></span>
            <span class="colorfff city_text">积分规则</span>
        </div>
        <ul class="userinfo_content">
            <li class="Signin_Fraction _cus_flexContent _cus_jusContent"  v-for="item in list">
                <div>
                    <i class="singnin_icon"></i>
                    <span>{{item.pointLable }}</span>
                </div>
                <span class="myIntegration_tip">{{item.point }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    import { HttpService } from '../../services/http.js'
    import { coreApi} from '../../services/coreApi.js'
    export default { 
        data(){
            return {
                list:[]
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            getList(){
                var bodys = {
                    _jsonp:true,
                    _jsonpCallback:'onBack'
                }
                coreApi.getPointList(bodys).then( r =>{
                       
                    if(r.statusCode == '200' && r.status){
                        // 接口访问成功，执行
                        this.list = r.list;//列表
                    }else if(!r.status){
                        // 返回错误信息
                        this.list = []
                    }
                })
            },
            city_back(){
                this.$router.go(-1)
            },
            SetUserhead(){
                this.$router.push({
                    'path': '/mymodule/setheadphoto'
                })
            },
            SetUsername(){
                this.$router.push({
                    'path':'/mymodule/setusername'
                })
            }
        }
    }
</script>
<style lang="less">
    .integrationRule{
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
            font-size: .32rem;
            >li{
                height: 0.9rem;
                line-height: 0.9rem;
                padding: 0 0.3rem;
                border-bottom: 2px solid #eeeeee;
            }
            >.Signin_Fraction{
                >div{
                    .singnin_icon{
                        display: inline-block;
                        width: 0.27rem;
                        height: 0.25rem;
                        margin-right: 0.1rem;
                        background:url('../../../static/imgs/rule_0.png') no-repeat;
                        background-size: contain;
                    }
                }
            }
            .register_Fraction{
                >div{
                    .singnin_icon{
                        display: inline-block;
                        width: 0.27rem;
                        height: 0.25rem;
                        margin-right: 0.1rem;
                        background:url('../../../static/imgs/rule_1.png') no-repeat;
                        background-size: contain;
                    }
                }
            }
            .myIntegration_tip{
                color: #fc5b45;
                text-align: center;
            }
        }
    }    
</style>
