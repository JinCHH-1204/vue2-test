import axios from "axios"

//发送请求时的进度条
import nProgress from "nprogress"
import 'nprogress/nprogress.css'
//引入store
import store from "@/store"

const requests = axios.create({
    //基础路径，默认自带
    baseURL: " http://gmall-h5-api.atguigu.cn/api",
    //超时时间
    timeout: 5000
})

//请求拦截器
requests.interceptors.request.use(function (config) {
    if (store.state.detail.uuid_token) {
        //新建一个请求头，通过该请求头传递身份ID
        //请求头名字 userTempID ,不能随意取，需要与后端人员协商
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //新建一个请求头，用于传递用户登录后传回的token（身份标识）
    //请求头名字token
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    nProgress.start()
    return config
}, function (error) {
    return Promise.reject(error)
})

//响应拦截器
requests.interceptors.response.use(function (response) {
    nProgress.done()
    return response.data
}, function (error) {
    return Promise.reject(error)
})

export default requests