export default {
    getCityObj(state) {
        if (!state.cityObj.areaCode && state.cityObj.areaName) {
            state.cityObj = JSON.parse(localStorage.getItem('cityObj'))
        }
        return state.cityObj
    },
    getExtendObj(state) {
        if (!state.extendObj.length > 0) {
            state.extendObj = JSON.parse(localStorage.getItem('extendObj'))
        }
        return state.extendObj
    },
    getPathObj(state) {
        if (!state.PathObject) {
            state.PathObject = JSON.parse(localStorage.getItem('PathObj'))
        }
        return state.PathObject
    },
    getTabindex(state) {
        if (!state.tabObj) {
            state.tabObj = JSON.parse(localStorage.getItem('tabObj'))
        }
        return state.tabObj
    }
}