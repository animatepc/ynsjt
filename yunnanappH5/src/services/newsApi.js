import { HttpService } from './http.js';
/**
 * 封装首页新闻相关的请求及数据处理
 */
import { sms } from './commonApi.js'
export const newsApi = {
  api: {
    columnList: sms+ 'content/columnList.do',
    newsList: sms+ 'content/list.do',
    newsDetails: sms+ 'content/details.do',
    search: sms+ 'content/search.do',
    hotwork: sms+ 'home/recom/hotwork.do',
    areaList: sms+ 'content/areaList.do',
    watchList: sms+ 'watch/programMessage.do',
    livelist: sms + 'live/list.do',
    watchPlay: sms + 'watch/play.do'
  },
  getColumnList(body){
    return HttpService.post(this.api.columnList, body, false, true)
  },
  getnewsList(body){
    return HttpService.post(this.api.newsList, body, false, true)
  },
  //查询新闻详情
  getNewsDetails(body){
    return HttpService.get(this.api.newsDetails, body, true, true)
  },
  //全局搜索
  search(body){
    return HttpService.post(this.api.search, body, false, true)
  },
  //推荐关键词查询
  hotwork(body){
    return HttpService.post(this.api.hotwork, body, false, true)
  },
  //地区列表
  areaList(body){
    return HttpService.get(this.api.areaList, body, false,true)
  },
  //专题内容列表
  watchList(body){
    return HttpService.get(this.api.watchList, body, false,true)
  },
  // 视频播放详情
  watchPlay(body){
    return HttpService.get(this.api.watchPlay, body, false,true)
  }
}
