import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const state={
  imgObj:[],
  cityObj:{
    areaName: '云南省'
  },
  extendObj:[],
  // 切换城市
  PathObject:{},
  // 切换tab记住
  tabObj:{
    tabindex: 0,
    contentType:''
  },
  // 主题修改
  colorMsg:{
    'color': '#f41a14'
  },
  // 登录信息
  loginMsg:{
    status:''
  }
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
