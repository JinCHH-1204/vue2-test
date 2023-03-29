import { reqDeleteCart, reqGetShopCartList, reqUpdateChecked } from "@/api"

let actions = {
    async getShopCartList(context) {
        let result = await reqGetShopCartList()
        if (result.code == 200) {
            context.commit("GETSHOPCARTLIST", result.data)
        }
    },
    //删除单个商品
    async deleteCart(context, skuId) {
        let result = await reqDeleteCart(skuId)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    //单选
    async updateChecked(context, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //删除选中的全部商品
    deleteAllChecked(context) {
        let promiseAll = []
        //context 上下文 包含actions(dispach) mutations(commit) getters(getters) state(state)
        //读取getter中的商品id 遍历删除
        context.getters.shopCartList.cartInfoList.forEach(cart => {
            //调用actions里定义的单个商品删除
            if (cart.isChecked == 1) {
                let result = context.dispatch("deleteCart", cart.skuId)
                promiseAll.push(result)
            }
        });
        //用于判断是否每次删除都成功
        //Promise.all  每次成功，则返回成功结果  有一次失败，则返回失败结果
        return Promise.all(promiseAll)
    },
    //全选
    updateAllChecked(context, isChecked) {
        let promiseAll = []
        context.getters.shopCartList.cartInfoList.forEach(item => {
            let promise = context.dispatch("updateChecked", {
                skuId: item.skuId,
                isChecked
            })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
let mutations = {
    GETSHOPCARTLIST(state, value) {
        state.shopCartList = value
    }
}
let state = {
    shopCartList: {}
}
let getters = {
    shopCartList(state) {
        return state.shopCartList[0] || {}
    }
}

export default {
    actions,
    mutations,
    state,
    getters,
}