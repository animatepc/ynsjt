import { BrowserInfo } from './browserInfo.js';
export const openApp = function(openUrl, callback, model) {
    //检查app是否打开
    function checkOpen(cb){
        var _clickTime = +(new Date());
        function check(elsTime) {
            if ( elsTime > 3000 || document.hidden || document.webkitHidden) {
                cb(1);
            } else {
                cb(0);
            }
        }
        //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
        var _count = 0, intHandle;
        intHandle = setInterval(function(){
            _count++;        
            var elsTime = +(new Date()) - _clickTime;
            if (_count>=100 || elsTime > 3000 ) {
                clearInterval(intHandle);
                check(elsTime);
            }
        }, 20);
    }

    //在iframe 中打开APP
    var ifr = document.createElement('iframe');
    ifr.src = openUrl;
    ifr.style.display = 'none';

    if (callback) {
      //客户端检测微信直接跳应用宝链接
      var browser = BrowserInfo();
      //使用微链接
      var encodeUri = encodeURIComponent(openUrl);

      if (browser.isWeixin) {
        // http://android.myapp.com/myapp/detail.htm?apkName=sjt.yntv.com.yntv&ADTAG=mobile
        if(model =='android'){
            window.location.href = 'http://android.myapp.com/myapp/detail.htm?apkName=sjt.yntv.com.yntv&ADTAG=mobile';
        }else if(model == 'ios'){
            // window.location.href = ''; 暂无
        }
        
      }else{
        checkOpen(function(opened){
            callback && callback(opened);
        });

      }
    }

    document.body.appendChild(ifr);      
    setTimeout(function() {
        document.body.removeChild(ifr);
    }, 2000);  

}