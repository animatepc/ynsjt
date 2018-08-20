import { JsBridge } from './bridge.js'
export class Share {
    static bridgeShart( Data, equipment, types ){
        
        if (equipment == 'ios') {
            JsBridge.callHandler(types, Data, (response)=> {
              // 处理返回数据

            });
          } else if (equipment == 'android') {
            if(types == 'qqZoneShare'){
              JsBridge.callHandler('qqZoneShare', Data, (response)=> {
                // 处理返回数据
              });
            }else if(types == 'qqFirendShare'){
              JsBridge.callHandler('qqFirendShare', Data, (response)=> {
                // 处理返回数据
              });
            }else if(types == 'weiXinFriendShare'){
              JsBridge.callHandler('weiXinFriendShare', Data, (response)=> {
                // 处理返回数据
              });
            }else if(types == 'weiXinCircleShare'){
              JsBridge.callHandler('weiXinCircleShare', Data, (response)=> {
                // 处理返回数据
              });
            }else if(types == 'weiboShare'){
              JsBridge.callHandler('weiboShare', Data, (response)=> {
                // 处理返回数据
              });
            }else if(types == 'OpenShareMenu'){
              // alert(JSON.stringify(Data))
              // alert(types)
              JsBridge.callHandler('OpenShareMenu', Data, (response)=> {
                // 处理返回数据
              });
            }
          };
    }
}