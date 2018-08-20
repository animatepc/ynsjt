import {HttpService} from './http';
import { sms } from './commonApi.js'
/**
 * 封装登录相关的请求及数据处理
 */

export const loginApi = {
  api: {
    loginOrReg: sms+ 'sms/loginOrReg.do',
    valiloginCode: sms+ 'register.do',
    valiLoginUser: sms+ 'accountLogin.do',
    returnLoginwx: sms+ 'thirdParty/bindWeChat.do',
    returnLoginqq: sms+ 'thirdParty/bindQqAccount.do',
    returnLoginzfb: sms+ 'thirdParty/bindAlipayAccount.do',
    returnLoginwb: sms+ 'thirdParty/bindSinaAccount.do'
  },
  getloginCode(body){ //输入手机号获取验证码
    return HttpService.post(this.api.loginOrReg, body, false, false)
  },
  valiloginCode(body){ //输入手机号与验证码进行验证
    return HttpService.post(this.api.valiloginCode, body, false, false)
  },
   valiLoginUser(body){ //输入手机号与密码进行验证
    return HttpService.post(this.api.valiLoginUser, body, false,false)
  },
  returnLoginwx(body){
    return HttpService.post(this.api.returnLoginwx, body, false, false)
  },
  returnLoginqq(body){
    return HttpService.post(this.api.returnLoginqq, body, false, false)
  },
  returnLoginzfb(body){
    return HttpService.post(this.api.returnLoginzfb, body, false, false)
  },
  returnLoginwb(body){
    return HttpService.post(this.returnLoginwb, body, false, false)
  }
}