import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//设置全局组件
import TypeNav from "@/components/TypeNav"  //三级路由跳转
import Pagination from "@/components/Pagination"  //分页器

Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

import router from "./router"
import store from '@/store'

//引入mockServe -- mock数据(无暴露)
import '@/mock/mockServe.js'
//轮播图
import 'swiper/css/swiper.css'

//element-ui 弹窗
import { MessageBox } from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//全局引入api
import * as API from "@/api"

//引入表单验证（已封装，也可以直接写在main中）
import '@/pages/Register/validate'

new Vue({
  render: h => h(App),
  beforeCreate() {
    this.prototype.$bus = this
    //全局引入api
    this.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
