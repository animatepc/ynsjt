import {HttpService} from './http';
import { sms } from './commonApi.js'
/**
 * 封装登录相关的请求及数据处理
 */

export const forgetApi = {
  api: {
    returnForgetCode:sms+'sms/forget.do',
    validataInfo:sms+'forget/validateInfo.do',
    changePass:sms+'sms/changePassword.do',
    forgetNewPass:sms+'forget/newPassword.do',
    historyNewPass:sms+'userSet/newPassword.do'
  },
  returnForgetCode(body){ //忘记密码-->输入手机号获取验证码
    return HttpService.post(this.api.returnForgetCode, body, false, false)
  },
  validataInfo(body){ //忘记密码--手机号+验证码验证
    return HttpService.post(this.api.validataInfo, body, false, false)
  },
  changePass(body){ //忘记密码--设置密码
    return HttpService.post(this.api.changePass, body, false, false)
  },
  forgetNewPass(body){
    return HttpService.post(this.api.forgetNewPass, body, false, false)
  },
  historyNewPass(body){
    return HttpService.post(this.api.historyNewPass, body, false, false)
  }
}