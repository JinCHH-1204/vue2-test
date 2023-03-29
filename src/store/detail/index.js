import { reqAddOrUpdateShopcart, reqGetGoodsInfo } from "@/api"
import { getUUID } from "@/utils/uuid_token"
const actions = {
    async getGoodsInfo(context, skuId) {
        let result = await reqGetGoodsInfo(skuId)
        if (result.code == 200) {
            context.commit("GETGOODSINFO", result.data)
        }
    },
    //发送请求 添加购物车
    async addOrUpdateShopcart(context, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopcart(skuId, skuNum)
        if (result.code == 200) {
            //请求发送成功
            //请求返回结果为promis函数
            //添加返回值 便于index中做相应的处理
            //返回值为非空字符串（非promise类型）时，函数返回promise的成功结果
            return "ok"
        } else {
            //请求失败 返回失败回调
            return Promise.reject(new Error("fail"))
        }
    }
}
const mutations = {
    GETGOODSINFO(state, value) {
        state.goodsInfo = value
    }
}
const state = {
    goodsInfo: {},
    //生成临时身份
    uuid_token: getUUID()
}
//简化数据获取
const getters = {
    categoryView(state) {
        /* 
        state中的categoryView默认为空对象，空对象的categoryView属性就是undefined
        返回undefined会导致 categoryView.属性（undefined.属性） 报错(假报错，能运行)
        因此 不能写 return state.goodsInfo.categoryView

        至少返回一个空对象
        */

        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    skuSaleAttr(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }

}

export default {
    actions,
    mutations,
    state,
    getters
}