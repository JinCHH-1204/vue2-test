import { reqAddressInfo, reqOrderInfo } from "@/api"

const actions = {
    //获取用户地址信息
    async getAddressInfo(context) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            context.commit("ADDRESSINFO", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //获取用户订单商品信息
    async getOrderInfo(context) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            context.commit("ORDERINFO", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    ADDRESSINFO(state, value) {
        state.address = value
    },
    ORDERINFO(state, value) {
        state.orderInfo = value
    }
}
const state = {
    address: [],
    orderInfo: {}
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}