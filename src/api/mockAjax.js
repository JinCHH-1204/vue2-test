import axios from "axios"

//发送请求时的进度条
import nProgress from "nprogress"
import 'nprogress/nprogress.css'

const requests = axios.create({
    //基础路径，默认自带
    baseURL: "/mock",
    //超时时间
    timeout: 5000
})

requests.interceptors.request.use(function (config) {
    nProgress.start()
    return config
}, function (error) {
    return Promise.reject(error)
})

requests.interceptors.response.use(function (response) {
    nProgress.done()
    return response.data
}, function (error) {
    return Promise.reject(error)
})

export default requests