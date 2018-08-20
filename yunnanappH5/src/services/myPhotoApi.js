import {HttpService} from './http'
/*
    封装我拍相关的业务逻辑
*/ 
import { sms } from './commonApi.js'
   export const myPhotoApi= {
    api: {
      myPhotoList:sms+'myVideo/list.do',
      insertMyPhoto:sms+'myVideo/addToVue.do',
      uploadFactImage:sms+'home/fact/uploadFactImage.do'
    },
   
   //我拍-->列表
    getMyPhotoList(body){
      return HttpService.post(this.api.myPhotoList, body, false, true)
      }, 
    //我拍-->提交
    insertMyPhoto(body){
      return HttpService.post(this.api.insertMyPhoto, body, false)
    }, 
    //我拍-->提交图片
    uploadFactImage(body){
      return HttpService.postForm(this.api.uploadFactImage, body, false)
    }, 
  }
  