import { HttpService } from '../../services/http.js';
import { localhost } from '../../services/commonLocalhost.js';
export class shareWx {
    static share(shareApi, params, data, handler){
        // http
        HttpService.http(shareApi, params, false, true, '' ).then( res => {
            // console.log(res);
            wx.config({
                debug: false, //调试模式 
                appId: res.appId, 
                timestamp:res.timestamp, 
                nonceStr:res.nonceStr, 
                signature:res.signature, 
                jsApiList: [ 
                'onMenuShareTimeline', 
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'] 
            }); 
        });
        wx.ready(function () {
            // alert(JSON.stringify(data))
            wx.onMenuShareAppMessage(data); 
            wx.onMenuShareTimeline(data); 
            wx.onMenuShareQQ(data);
            wx.onMenuShareWeibo(data);
            wx.onMenuShareQZone(data);
            wx.error(function (res) {
              console.log(res.errMsg+"错误信息"); 
            });
        });
    }
    
    // 微信去除from等字段
    static getQueryString(types,route){
        function _getQueryString(name) {//根据字段看网址是否拼接&字符串
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return null;
        };
        var from = _getQueryString('from');
        var appinstall = _getQueryString('appinstall');
        var sec = _getQueryString('sec');
        var timekey = _getQueryString('timekey');
      
        if(from || appinstall || sec || timekey){//假如拼接上了
            if(types == 'newsdetails'){
                // http://yntvapph5.4kb.cn 测试环境
                //http://ynapp.yntv.cn 正式url
                window.location.href =`http://ynapp.yntv.cn/dist/#/public/newsdetails/${route.query.id}?refType=${route.query.refType}&id=${route.query.id}&columnCode=${route.query.columnCode}`;
            }else if(types == 'videodetails'){
                window.location.href =`http://ynapp.yntv.cn/dist/#/public/videodetails/${route.query.id}?refType=${route.query.refType}&id=${route.query.id}&columnCode=${route.query.columnCode}&videoLabel=${route.query.videoLabel}`;
            }else if(types == 'shootlist'){
                window.location.href = `http://ynapp.yntv.cn/dist/#/myphoto/shootlist`;
            }
        }
    }
}