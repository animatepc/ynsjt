<template>
    <div class="forgetpass">
        <div class="login_msg _cus_flexContent _cus_fleAlignCen">
            <i class="login_back" @click="login_back"></i>
            <span class="colorfff _cus_posAbsolute login_sign">忘记密码</span>
        </div>
        <div class="login_content _cus_overHidden">
            <div class="login_box">
                <div class="" v-if="!signin_mode">
                    <div class="login_phone">
                        <group class="_cus_flexContent _cus_fleAlignCen perH100 ">
                            <x-input mask="999 9999 9999" keyboard="number" :max="13" is-type="china-mobile" :should-toast-error="false" required v-model="idCode.phone" placeholder="请输入手机号码"></x-input>
                        </group>
                    </div>
                    <div class="login_code _cus_flexContent _cus_jusContent">
                        <div class="login_pass ">
                            <group class="_wangjcus_flexContent _cus_fleAlignCen perH100 ">
                                <x-input  title="" required v-model="idCode.code" placeholder="请输入验证码"></x-input>
                            </group>
                        </div>
                        <x-Button :disabled="xbuttondis" :class="!xbuttondis?'login_xbtn':'login_disabled'" @click.native="xbtn_setinter">{{xbtn_msg}}</x-Button>
                    </div>
                    <x-Button :disabled="xbuttondis2" class="login_sub" @click.native="Submission">下一步</x-Button>

                </div>
            </div>
        </div>
         <alert
            class="login_alert"
            :value="hide_alert"
            button-text="确认"
            @on-show="alertShow"
            @on-hide="alertHide">
            <span>{{test_mag}}</span>
        </alert>
    </div>
</template>
<script>
import { forgetApi } from "../../services/forgetApi.js";
export default {
  data() {
    return {
      xbuttondis: false,
      xbuttondis2: false,
      xbtn_msg: "点击发送验证码",
      setinterlval: 60,
      selected: true,
      signin_mode: false,
      hidePass: false,
      hide_alert: false,
      valphone: false, //手机号是否通过
      timeout: null,
      test_mag: "点击发送验证码",
      idCode: {
        phone: "",
        code: ""
      }
    };
  },
  methods: {
    login_back() {
      this.$router.go(-1);
    },
    selected_mask() {
      this.selected = !this.selected;
      this.selected ? (this.xbuttondis2 = false) : (this.xbuttondis2 = true);
    },
    signin() {
      this.signin_mode = !this.signin_mode;
    },
    handle_hidePass() {
      this.hidePass = !this.hidePass;
    },
    xbtn_setinter() {
      let phone = this.idCode.phone.replace(/\s+/g, ""),
        reg1 = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.idCode.phone == "") {
        this.hide_alert = true;
        this.test_mag = "请输入手机号！";
      } else if (!reg1.test(phone)) {
        this.hide_alert = true;
        this.test_mag = "请输入正确的手机号!";
        this.valphone = true;
      } else {
        this.xbuttondis = true;
        this.getLoginCode();
        this.setInterval();
      }
    },
    //发送验证码
    getLoginCode() {
      // 请求data
      let bodys = {
        mobile: this.idCode.phone.replace(/\s+/g, ""),
        _json: false, //参数类型 formdata/json
        _jsonp: true, //dataType: jsonp true/false
        _jsonpCallback: "onBack" //请求接口返回的callback
      };
      // 调用gloabApi的api 参数是bodys r 接口返回的数据对象
      forgetApi.returnForgetCode(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          // 暂无提示
        } else {
          this.hide_alert = true;
          this.test_mag = r.errorMessage;
        }
      });
    },
    setInterval() {
      this.xbtn_msg = "重新发送" + this.setinterlval;
      if (this.setinterlval != 0) {
        this.timeout = window.setTimeout(() => {
          this.setinterlval--;
          this.setInterval();
        }, 1000);
      }

      if (this.setinterlval == 0) {
        window.clearTimeout(this.timeout);
        this.setinterlval = 60;
        this.xbuttondis = false;
        this.xbtn_msg = "点击发送验证码";
      }
    },
    Submission() {
      let phone = this.idCode.phone.replace(/\s+/g, ""),
        reg1 = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.idCode.phone == "") {
        this.hide_alert = true;
        this.test_mag = "请输入手机号！";
      } else if (!reg1.test(phone)) {
        this.hide_alert =  true;
        this.test_mag = "请输入正确的手机号!";
        this.valphone = true;
      } else if (this.idCode.code == "") {
        this.hide_alert = true;
        this.test_mag = "请输入短信验证码！";
      } else {
        // this.hide_alert = false;
        // this.$router.push({
        //   path: "/login/modifypass"
        // });
        this.validataInfo();
      }
    },
    alertShow() {},
    alertHide() {
      this.hide_alert = false;
    },
    validataInfo() {
      // 请求data
      let bodys = {
        mobile: this.idCode.phone.replace(/\s+/g, ""),
        shortMessageCode: this.idCode.code,
        _json: false, //参数类型 formdata/json
        _jsonp: true, //dataType: jsonp true/false
        _jsonpCallback: "onBack" //请求接口返回的callback
      };
      // 调用gloabApi的api 参数是bodys r 接口返回的数据对象
      forgetApi.validataInfo(bodys).then(r => {
        if (r.statusCode == "200" && r.status) {
          // 暂无提示
          this.$router.replace({
            path: `/login/modifyPass`
          });
        } else {
          this.hide_alert = true;
          this.test_mag = "验证码错误";
        }
      });
    }
  },
  destroyed() {
    clearTimeout(this.timeout);
  }
};
</script>
<style lang="less">
.forgetpass {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  font-size: 0.28rem;
  .login_msg {
    width: 100vw;
    height: 1rem;
    line-height: 1rem;
    overflow: hidden;
    background-color: #f41a14;
    .login_back {
      width: 0.22rem;
      height: 1rem;
      margin-left: 0.2rem;
      background: url("../../../static/imgs/back.png") center center no-repeat;
      background-size: contain;
      z-index: 10;
    }
    .login_sign {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0;
      top: 0;
      margin: auto;
      text-align: center;
      font-size: 0.32rem;
    }
  }
  .login_content {
    .login_logo {
      text-align: center;
      > img {
        width: 1.33rem;
        margin: 0.75rem auto 0.7rem;
      }
    }
    .login_box {
      margin-top: 0.4rem;
      overflow: hidden;
      font-size: 0.28rem;
      .login_phone {
        margin: 0 0.3rem;
        height: 0.8rem;
        border: 1px solid #999;
        border-radius: 5px;
        padding-left: 10px;
        box-sizing: border-box;
        margin-bottom: 0.4rem;
        .weui-cells {
          width: 100%;
          height: 100%;
          margin-top: 0;
        }
        .weui-cell {
          padding: 0 15px;
        }
        .weui-icon-clear {
          font-size: 0.28rem;
        }
        .vux-input-icon.weui-icon-warn:before,
        .vux-input-icon.weui-icon-success:before {
          font-size: 0.42rem;
        }
        input {
          height: 0.8rem;
          outline: none;
          border: none;
          line-height: 100%;
          font-size: 0.28rem;
        }
      }
      .login_code {
        margin: 0 0.3rem;
        .login_pass {
          width: 3.1rem;
          height: 0.8rem;
          line-height: 0.8rem;
          border: 1px solid #999;
          border-radius: 5px;
          padding-left: 10px;
          box-sizing: border-box;
          margin-bottom: 0.4rem;
          .weui-cells {
            width: 100%;
            height: 100%;
            line-height: 100%;
            display: flex;
            margin-top: 0;
          }
          .weui-cell {
            flex: 1;
            padding: 0 15px;
          }
          .weui-icon-clear {
            font-size: 0.28rem;
          }
          .vux-input-icon.weui-icon-warn:before,
          .vux-input-icon.weui-icon-success:before {
            font-size: 0.42rem;
          }
          input {
            height: 0.8rem;
            outline: none;
            border: none;
            /*height: .8rem;*/
            line-height: 100%;
            font-size: 0.28rem;
          }
          .show_pass {
            display: block;
            width: 20%;
            height: 100%;
            background: url(../../../static/imgs/eye.png) no-repeat center
              center;
            background-size: 0.5rem;
          }
          .hide_pass {
            display: block;
            width: 20%;
            height: 100%;
            background: url(../../../static/imgs/y_pwd.png) no-repeat center
              center;
            background-size: 0.5rem;
          }
        }
        .login_xbtn {
          width: 3rem;
          height: 0.8rem;
          margin: 0;
          border-radius: 0.1rem;
          font-size: 0.32rem;
          background: #f41a14;
          border-color: #eee;
          color: #fff;
        }
      }
      .forgot_Pass {
        overflow: hidden;
        margin-bottom: 0.5rem;
        color: #f41a14;
      }
    }
    .login_sub {
      margin: 0 auto;
      margin-top: 0.3rem;
      margin-bottom: 0.2rem;
      width: 4.9rem;
      height: 0.96rem;
      line-height: 0.96rem;
      font-size: 0.32rem;
      color: #fff;
      background: #f41a14;
      border-radius: 10px;
    }
    .login_ {
      font-size: 0.24rem;
      line-height: 18px;
      color: #282828;
      margin-top: 0.3rem;
      text-align: center;
      .login_select {
        display: inline-block;
        width: 0.32rem;
        height: 0.32rem;
        vertical-align: -15%;
        margin-right: 5px;
        background: url(../../../static/imgs/selected.png) no-repeat center;
        background-size: 100% 100%;
      }
      .login_cancel {
        display: inline-block;
        width: 0.32rem;
        height: 0.32rem;
        vertical-align: -15%;
        margin-right: 5px;
        background-color: #f41a14;
        background: #f41a14;
        border-radius: 0.03rem;
      }
      .login_agreement {
        color: #f41a14;
        text-decoration: underline;
      }
    }
    .login_userpass {
      margin: 0.8rem 0 0.4rem;
      text-align: center;
      color: #fca806;
    }
    .login_footer {
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
      .login_ways {
        width: 90%;
        margin: 0 auto;
        margin-top: 0.44rem;
        color: #999;
        font-size: 0.26rem;
        .third_party_img {
          text-align: center;
          > img {
            width: 0.87rem;
          }
        }
      }
    }
  }
}
</style>

