import { HttpService } from '../../services/http.js'
import { loginApi } from '../../services/loginApi.js'
import { coreApi } from '../../services/coreApi.js';
import { Cookie } from "./base.js";
import { JsBridge } from './bridge.js'
export class loginService {
  static loginQQ(equipment, router, types) {
    if (equipment == 'ios') {
      JsBridge.callHandler("logqq", data => {
        // 处理返回数据
      });
    } else if (equipment == 'android') {
      JsBridge.callHandler("androidLogQq", data => {
        // 处理返回数据
      });
    }
    JsBridge.registerHandler('returnlogqq', (data, responseCallback) => {
      let bodys = JSON.parse(data);
      bodys = Object.assign({},{
        userId: null,
        qqAccount: bodys.openId
      })
      loginApi.returnLoginqq(bodys).then(r => {
        if(types == 'login'){
          if (r.status) {
            Cookie.addCookie("mobile", "   ", {
              expires: 10 * 365 * 24 * 60 * 60,
              path: "/"
            }); //用户实体的account
            Cookie.addCookie("userAvatar", r.user.userAvatar, {
              expires: 10 * 365 * 24 * 60 * 60,
              path: "/"
            }); //用头像
            Cookie.addCookie("nickName", r.user.nickName, {
              expires: 10 * 365 * 24 * 60 * 60,
              path: "/"
            }); //昵称
            Cookie.addCookie("online", r.user.online, {
              expires: 10 * 365 * 24 * 60 * 60,
              path: "/"
            }); //是否在线 0不在，1在线
            Cookie.addCookie("acountType", r.user.accountType, {
              expires: 10 * 365 * 24 * 60 * 60,
              path: "/"
            }); //登陆账号类型 0手机号 1qq 2支付宝 3微信 4新浪
            if (r.user.nickName == "") {
              router.push({
                path: "/mymodule/setusername"
              });
            } else {
              router.push({
                path: "/mymodule/signin"
              });
            }
          }
        } else if(types == 'userset'){
          coreApi.userSetIndex({}).then( r =>{})
        }
        
      });
      responseCallback(data)
    })
  }

  static loginWX(equipment, router, types) {
    if (equipment == 'ios') {
      JsBridge.callHandler("logwx", data => {
        // 处理返回数据
      });
    } else if (equipment == 'android') {
      JsBridge.callHandler("androidLogWx", data => {
        // 处理返回数据
      });
    };
    JsBridge.registerHandler('returnlogwx', (data, responseCallback) => {
      var bodys = JSON.parse(data);
      // bodys.code = data.code;
      loginApi.returnLoginwx(bodys).then(r => {
        if(types == 'login'){
        if (r.status) {
          Cookie.addCookie("mobile", "   ", {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //用户实体的account
          Cookie.addCookie("userAvatar", r.user.userAvatar, {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //用头像
          Cookie.addCookie("nickName", r.user.nickName, {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //昵称
          Cookie.addCookie("online", r.user.online, {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //是否在线 0不在，1在线
          Cookie.addCookie("acountType", r.user.accountType, {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //登陆账号类型 0手机号 1qq 2支付宝 3微信 4新浪
          if (r.user.nickName == "") {
            router.push({
              path: "/mymodule/setusername"
            });
          } else {
            router.push({
              path: "/mymodule/signin"
            });
          }
        }
      } else if(types == 'userset'){
        coreApi.userSetIndex({}).then( r =>{})
      }
      });
      responseCallback(data);
    })
  }
  static loginZFB(equipment, router, types) {
    if (equipment == 'ios') {
      JsBridge.callHandler("logzfb", data => {
        // 处理返回数据
      });
    } else if (equipment == 'android') {
      JsBridge.callHandler("androidLogZfb", data => {
        // 处理返回数据
      });
    }
    JsBridge.registerHandler('returnlogzfb', (data, responseCallback) => {
      var bodys = JSON.parse(data);
      // bodys.code = data.code;
      // alert(JSON.stringify(bodys))
      loginApi.returnLoginzfb(bodys).then(r => {
        // alert(JSON.stringify(r))
        if(types == 'login'){
        if (r.status) {
          Cookie.addCookie("mobile", "   ", {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //用户实体的account
          Cookie.addCookie("userAvatar", r.user.userAvatar, {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //用头像
          Cookie.addCookie("nickName", r.user.nickName, {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //昵称
          Cookie.addCookie("online", r.user.online, {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //是否在线 0不在，1在线
          Cookie.addCookie("acountType", r.user.accountType, {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //登陆账号类型 0手机号 1qq 2支付宝 3微信 4新浪
          if (r.user.nickName == "") {
            router.push({
              path: "/mymodule/setusername"
            });
          } else {
            router.push({
              path: "/mymodule/signin"
            });
          }
        }
      } else if(types == 'userset'){
        coreApi.userSetIndex({}).then( r =>{})
      }
      });
      responseCallback(data);
    })
  }
  static loginWB(equipment, router ,types) {
    if (equipment == 'ios') {
      JsBridge.callHandler("logwb", data => {
        // 处理返回数据
      });
    } else if (equipment == 'android') {
      JsBridge.callHandler("androidLogWb", data => {
        // 处理返回数据
      });
    };
    JsBridge.registerHandler('returnlogwb', (data, responseCallback) => {
      var bodys = JSON.parse(data);
      // bodys.token = data.token;
      // bodys.uid = data.uid;
      loginApi.returnLoginwb(bodys).then(r => {
        if(types == 'login'){
        if (r.status) {
          Cookie.addCookie("mobile", "   ", {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //用户实体的account
          Cookie.addCookie("userAvatar", r.user.userAvatar, {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //用头像
          Cookie.addCookie("nickName", r.user.nickName, {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //昵称
          Cookie.addCookie("online", r.user.online, {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //是否在线 0不在，1在线
          Cookie.addCookie("acountType", r.user.accountType, {
            expires: 10 * 365 * 24 * 60 * 60,
            path: "/"
          }); //登陆账号类型 0手机号 1qq 2支付宝 3微信 4新浪
          if (r.user.nickName == "") {
            router.push({
              path: "/mymodule/setusername"
            });
          } else {
            router.push({
              path: "/mymodule/signin"
            });
          }
        }
      } else if (types == 'userset'){
        coreApi.userSetIndex({}).then( r =>{})
      }
      });
      responseCallback(data);
    })
  }
}

