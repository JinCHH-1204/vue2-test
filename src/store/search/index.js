import { reqGetSearchInfo } from "@/api"

const actions = {
    //必须传入params, 给一个默认的空对象 params = {}
    async getSearchInfo(context, params = {}) {
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            context.commit("GETSEARCHINFO", result.data)
        }
    }
}
const mutations = {
    GETSEARCHINFO(state, value) {
        state.getSearchInfo = value
    }
}
const state = {
    //得到的数据为对象
    getSearchInfo: {},
}

//简化state中数据的获取
//便于组件中数据的获取
const getters = {
    //state表示当前仓库(search)中的state
    goodsList(state) {
        //防止无数据传入（网络不给力等问题），返回undefind  加入判断[]
        return state.getSearchInfo.goodsList || []
    },
    attrsList(state) {
        return state.getSearchInfo.attrsList
    },
    trademarkList(state) {
        return state.getSearchInfo.trademarkList
    },
}

export default {
    actions,
    mutations,
    state,
    getters,
}