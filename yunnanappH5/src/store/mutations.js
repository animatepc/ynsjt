export default {
  saveImgInfo:(state,imgObject)=>{
  	Array.prototype.imgObject = imgObject
    imgObject?state.imgObj=Array.prototype.imgObject:[]
  },
  saveSearchPath:(state,PathObject)=>{
    PathObject || PathObject.path?state.PathObject=Object.assign(state.PathObject,PathObject):{}
    PathObject || PathObject.path?localStorage.setItem('PathObj',JSON.stringify(PathObject)):{}
  },
  // 城市列表
  saveCityObj:(state,cityObject)=>{
    cityObject?state.cityObj=cityObject:{}
    cityObject?localStorage.setItem('cityObj',JSON.stringify(cityObject)):{}
  },
  clearCityObj(state) {
      if (state.cityObj.areaCode !='') {
        localStorage.removeItem('cityObj')
        state.cityObj = {}
      }
  },
  // 图集推荐
  saveExtendObj:(state,extendObject)=>{
    extendObject?state.extendArr = extendObject:[]
    extendObject?localStorage.setItem('extendObj',JSON.stringify(extendObject)):{}
  },
  clearExtendObj(state) {
    if (state.extendObj && state.extendObj.length > 0) {
        localStorage.removeItem('extendObj')
        state.extendObj = []
    }
  },
  // tab切换状态
  saveTabObj:(state,tabObject)=>{
    tabObject?state.tabObj = Object.assign(state.tabObj,tabObject):{}
    tabObject?localStorage.setItem('tabObj',JSON.stringify(tabObject)):{}
  },
  // 记住用户登录状态
  savelogin:(state,loginObject)=>{
    loginObject?state.loginMsg = Object.assign(state.loginMsg,loginObject):{}
  },
  // 获取用户界面主题色
  saveColor:(state,colorObject)=>{
    colorObject?state.colorMsg = Object.assign(state.colorMsg,colorObject):{}
  }
}
