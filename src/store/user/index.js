import { reqGetCode, reqGetUserInfo, reqLogout, reqUserLogin, reqUserRegister } from "@/api"

//登录 注册 退出登录三个模块  共用一个仓库

const actions = {
    //获取验证码
    async getCode(context, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            context.commit("GETCAODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    //用户注册
    async UserRegister(context, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(result.message)
        }
    },
    //登录
    async userLogin(context, user) {
        let result = await reqUserLogin(user)
        if (result.code == 200) {
            context.commit("USERLOGIN", result.data.token)
            //将token持久存储
            localStorage.setItem("TOKEN", result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    //获取用户信息
    async getUserInfo(context) {
        let result = await reqGetUserInfo()
        if (result.code == 200) {
            context.commit("GETUSERINFO", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    //退出登录
    async logout(context) {
        let result = await reqLogout()
        if (result.code == 200) {
            context.commit("CLEAR")
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    GETCAODE(state, value) {
        state.code = value
    },
    USERLOGIN(state, value) {
        state.token = value
    },
    GETUSERINFO(state, value) {
        state.userInfo = value
    },
    //清空登录所带来的数据
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
        //本地存储清空
        localStorage.removeItem("TOKEN")
    }
}
const state = {
    code: "",
    token: localStorage.getItem("TOKEN"),
    userInfo: {},
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}