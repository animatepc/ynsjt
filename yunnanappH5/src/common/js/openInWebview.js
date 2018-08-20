export const openInWebview = () =>{
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') { // 微信浏览器判断
      return false
  } else if (ua.match(/QQ/i) == 'qq') { // QQ浏览器判断
      return false
  } else if (ua.match(/WeiBo/i) == "weibo") {
      return false
  } else {
      if (ua.match(/Android/i) != null) {
          return ua.match(/browser/i) == null
      } else if (ua.match(/iPhone/i) != null) {
          return ua.match(/safari/i) == null
      } else {
          return (ua.match(/macintosh/i) == null && ua.match(/windows/i) == null)
      }
  }
};