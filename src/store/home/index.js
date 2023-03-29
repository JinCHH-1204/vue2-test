
import { reqCategoryList, reqGetBannerList, reqGetFloorsList } from '@/api'

const actions = {
    //传入成功的返回值
    async categoryList(context) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            context.commit('CATEGORYLIST', result.data)
        }
    },
    async getBannerList(context) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            context.commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList(context) {
        let result = await reqGetFloorsList();
        if (result.code == 200) {
            context.commit('GETFLOORLIST', result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state, value) {
        state.categoryList = value
    },
    GETBANNERLIST(state, value) {
        state.getBannerList = value
    },
    GETFLOORLIST(state, value) {
        state.getFloorList = value
    }
}
const state = {
    categoryList: [],
    getBannerList: [],
    getFloorList: []
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters,
}