<template>
    <div class="userSet">
        <div class="searchVal _cus_flexContent _cus_fleAlignCen">
            <span class="search_back" @click="city_back"></span>
            <span class="colorfff city_text">账号设置</span>
        </div>
        <ul class="userinfo_content bgfff">
            <li @click="SetUserhead">
                <span>手机号</span>
                <span class="inlineBlock perW86 _cus_textRight">
                    <span v-if="data.mobile != ''">{{data.mobile}}</span>
                    <span v-else style="color:#f41a14">未绑定</span>
                    <i class="_cus_icoago"></i>
                </span>
                
            </li>
            <li @click="SetUserPassword">
                <span>修改密码</span>
                <i class="_cus_icoago"></i>
            </li>
            <!-- <li class="userset_mode">
                <span>绑定账号</span>
            </li>
            <li class="_cus_flexContent _cus_jusContent" @click="bindWx">
                <span>微信</span>
                <div>
                    <span :class="this.loginStatus.loginwx?'bind':'nobind'">{{this.loginStatus.loginwx?'已绑定':'未绑定'}}</span>
                    <i class="_cus_icoago"></i>
                </div>
            </li>
             <li class="_cus_flexContent _cus_jusContent" @click="bindWb">
                <span>微博</span>
                <div>  
                    <span :class="this.loginStatus.loginwb?'bind':'nobind'">{{this.loginStatus.loginwb?'已绑定':'未绑定'}}</span>
                    <i class="_cus_icoago"></i>
                </div>
            </li>
             <li class="_cus_flexContent _cus_jusContent" @click="bindTx">
                <span>腾讯</span>
                <div>  
                    <span :class="this.loginStatus.logintx?'bind':'nobind'">{{this.loginStatus.logintx?'已绑定':'未绑定'}}</span>
                    <i class="_cus_icoago"></i>
                </div>
            </li>
             <li class="_cus_flexContent _cus_jusContent" @click="bindZfb">
                <span>支付宝</span>
                <div>  
                    <span :class="this.loginStatus.loginzfb?'bind':'nobind'">{{this.loginStatus.loginzfb?'已绑定':'未绑定'}}</span>
                    <i class="_cus_icoago"></i>
                </div>
            </li> -->
        </ul>
         <x-Button :disabled="xbuttondis2" type="button" class="login_sub" @click.native="Signout">退出登录</x-Button>
         <confirm
            class="confirm_alert"
            :value="hide_alert"
            button-text="确认"
            @on-confirm="onConfirm">
            <span>{{test_mag}}</span>
        </confirm>
    </div>
</template>
<script>
    import { HttpService } from '../../services/http.js';
    import { coreApi} from '../../services/coreApi.js';
    import { loginService } from '../../common/js/bridgeLogin.js';
    import { UserService } from '../../services/user.js';
    import { Cookie } from "../../common/js/base.js";
    import { adapted } from "../../common/js/adapted.js";
    export default {
        data(){
            return {
                hide_alert:false,
                test_mag:'',
                xbuttondis2:false,
                data:'',
                Model:'',
                loginStatus:{
                    loginwx: false,
                    logintx: false,
                    loginzfb: false,
                    loginwb: false
                }
            }
        },
        computed:{
          phone(){
            return this.data.mobile
          }
        },
        mounted(){
            this.getUserInfo();
            this.Model = adapted.browser().versions.ios?'ios':adapted.browser().versions.android?'android':''
        },
        methods:{
          bindWx() {
                if(!this.loginStatus.loginwx){
                    loginService.loginWX(this.Model, this.$router, 'userset');
                }
            },
            bindWb() {
                if(!this.loginStatus.loginwb){
                    loginService.loginWB(this.Model, this.$router, 'userset')
                }
            },
            bindTx() {
                if(!this.loginStatus.logintx){
                    loginService.loginQQ(this.Model, this.$router, 'userset')
                }
            },
            bindZfb() {
                if(!this.loginStatus.loginzfb){
                    loginService.loginZFB(this.Model, this.$router, 'userset')
                }
            },
            getUserInfo(){
                var bodys = {}
                coreApi.userSetIndex(bodys).then( r =>{
                    //   alert(r)
                    if(r.statusCode == '200' && r.status){
                        // 接口访问成功，执行
                        this.data = r.data;//数据  
                        if(!this.data.thirdQqAccount && this.data.thirdQqAccount == ''){
                            this.loginStatus.logintx = false;
                        }else{
                            this.loginStatus.logintx = true;
                        }
                        if(!this.data.thirdAlipayAccount && this.data.thirdAlipayAccount == ''){
                            this.loginStatus.loginzfb = false;
                        }else{
                            this.loginStatus.loginzfb = true;
                        }
                        if(!this.data.thirdWechatAccount && this.data.thirdWechatAccount == ''){
                            this.loginStatus.loginwx = false;
                        }else{
                            this.loginStatus.loginwx = true;
                        }
                        if(!this.data.thirdSinaAccount && this.data.thirdSinaAccount == ''){
                            this.loginStatus.loginwb = false;
                        }else{
                            this.loginStatus.loginwb = true;
                        }
                    }else if(!r.status){
                        // 返回错误信息
                        this.hide_alert = ! this.hide_alert;
                        this.test_mag = r.errorMessage;
                    }
                })
            }, 
            city_back(){
                this.$router.go(-1)
            },
            Signout(){
                var bodys = {
                    _jsonp:true,
                    _jsonpCallback:"onBack"
                }
                coreApi.logOff(bodys).then( r =>{
                    if(r.statusCode == '200' && r.status){
                        // 接口访问成功，执行;
                        this.$router.replace({
                            'path':'/login/login'
                        });
                        // 删除掉用户信息;
                        UserService.clear();
                    }else if(!r.status){
                        // 返回错误信息 
                        this.hide_alert = ! this.hide_alert;
                        this.test_mag = r.errorMessage;
                    }
                })
            },
            SetUserhead(){
                if(this.data.mobile ==''){
                    this.hide_alert = !this.hide_alert
                    this.test_mag = '请您先绑定手机号'
                }else{
                     this.$router.push({
                        'path': '/login/setphone',
                        query:{'mobile':this.data.mobile}
                    })
                }
            },
            SetUserPassword(){
                if(this.data.mobile == "" || this.data.mobile == undefined || this.data.mobile == null){
                    this.hide_alert = ! this.hide_alert;
                    this.test_mag = '请您先绑定手机号!'; 
                }else{
                    this.$router.push({
                        'path':'/login/modifypasscode',
                        query:{'mobile':this.data.mobile}
                    })
                }
            },
            alertShow(){
                // 弹窗显示
            },
            onConfirm(){
                // 弹窗隐藏
                // alert(1)
                if(!this.data.mobile && this.data.mobile == ''){
                  this.$router.push({
                    'path':'/login/setphone'
                  })
                }
            }
        }
    }
</script>
<style lang="less">
    .userSet{
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
            margin-bottom: .84rem;
            >li{
                height: 0.9rem;
                line-height: 0.9rem;
                padding: 0 0.3rem;
                border-bottom: 2px solid #eeeeee;
                >div{
                    >.nobind{
                        color: #f41a14;
                    }
                }
            }
            .userset_mode{
                background-color: #f4f4f4;
            }
            ._cus_textRight{
                float: right;
            }
        }
        .login_sub{
            margin: 0 auto;
            margin-top: 0.3rem;
            margin-bottom: 0.2rem;
            width: 4.9rem;
            height: 0.96rem;
            line-height: 0.96rem;
            font-size: .32rem;
            color: #fff;
            background: #f41a14;
            border-radius: 10px;
        }
        .bind{
            color: #76EE00;
        }
    }    
</style>
