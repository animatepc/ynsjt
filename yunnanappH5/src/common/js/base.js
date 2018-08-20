export class Cookie{
    static addCookie(name, value, options) {
        if (arguments.length > 1 && name != null) {
        if (options == null) {
        options = {};
        }
        if (value == null) {
        options.expires = -1;
        }
        if (typeof options.expires == "number") {
        var time = options.expires;
        var expires = options.expires = new Date();
        expires.setTime(expires.getTime() + time * 1000);
        }
        document.cookie = encodeURIComponent(String(name)) + "=" + encodeURIComponent(String(value)) + (options.expires ? "; expires=" + options.expires.toUTCString() : "") + (options.path ? "; path=" + options.path : "") + (options.domain ? "; domain=" + options.domain : ""), (options.secure ? "; secure" : "");
    }
    }
    
    // 获取Cookie
    static getCookie(name) {
    if (name != null) {
        var value = new RegExp("(?:^|; )" + encodeURIComponent(String(name)) + "=([^;]*)").exec(document.cookie);
        return value ? decodeURIComponent(value[1]) : null;
    }
    }
 
    // 移除Cookie
    static removeCookie(name, options) {
    addCookie(name, "", {expires:-1,path:"/"});
    }
    //修改cookie
    static editCookie(name,value,expiresHours){
        var cookieString=name+"="+escape(value); 
        if(expiresHours>0){ 
        var date=new Date(); 
        date.setTime(date.getTime()+expiresHours*1000); //单位是毫秒
        cookieString=cookieString+";expires=" + date.toGMTString(); 
        } 
        document.cookie=cookieString; 
    }
}