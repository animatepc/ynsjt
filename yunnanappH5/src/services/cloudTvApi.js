import {HttpService} from './http'
/*
    封装云上TV相关的业务逻辑
    */ 
   import { sms } from './commonApi.js'
   
   export const cloudTvApi = {
       api:{
           liveWeekList: sms+'live/weekList.do',
           livePrograms:sms+'live/programs.do',
           radioDetails: sms+'radioProgram/details.do',
           livePlay: sms+'live/play.do'
       },
       liveWeekList(){
            return HttpService.get(this.api.liveWeekList,{},false,true)
       },
       livePrograms(bodys){
        return HttpService.get(this.api.livePrograms,bodys,false,true)
       },
       livePlay(bodys){
        return HttpService.get(this.api.livePlay,bodys,false,true)
       },
       radioDetails(bodys){
           return HttpService.post(this.api.radioDetails, bodys, false, true);
       }
   }