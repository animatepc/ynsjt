import { JsBridge } from './bridge.js'
export class upload {
    static bridgeUpload( equipment, data, types ){
        
        if (equipment == 'ios') {
            JsBridge.callHandler(types, data, (response)=> {
              // 处理返回数据

            });
          } else if (equipment == 'android') {
              if(types == 'uploadPic'){
                //   上传图片的方法
                    JsBridge.callHandler('uploadPic', data, (response)=> {
                        // 处理返回数据
        
                    });
              }else if(types =='uploadVideo'){
                //   上传视频的方法
                JsBridge.callHandler('uploadVideo', data, (response)=> {
                    // 处理返回数据
    
                });
              }
            
        }
    }
}