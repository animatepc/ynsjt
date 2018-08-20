import { HttpService } from './http';
import { sms } from './commonApi.js';
export const colorApi = {
    api: {
        bColor:sms + 'colour/list.do'
    },
    bColor(){
        return HttpService.post(this.api.bColor,{},false,false);
    }
}