import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

import store from "@/store"

//保存原版push
let originPush = VueRouter.prototype.push
//重写原型上的push方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

//实例化路由
let router = new VueRouter({
    routes: [
        {
            path: "/home",
            //路由懒加载，使用组件时才引入，减少代码运行负担
            component: () => import("@/pages/Home"),
            meta: { show: true }
        },
        {
            name: 'search',
            path: "/search/:keyword?",
            //路由懒加载，使用组件时才引入，减少代码运行负担
            component: () => import("@/pages/Search"),
            meta: { show: true }
        },
        {
            path: "/register",
            component: () => import("@/pages/Register"),
            meta: { show: false }
        },
        {
            path: "/login",
            component: () => import("@/pages/Login"),
            meta: { show: false }
        },
        {
            path: "/detail/:skuId",
            component: () => import("@/pages/Detail"),
            meta: { show: false }
        },
        {
            name: "shopcart",
            path: "/shopcart",
            component: () => import("@/pages/ShopCart"),
            meta: { show: false }
        },
        {
            name: "trade",
            path: "/trade",
            component: () => import("@/pages/Trade"),
            meta: { show: false },
            //独享路由守卫 必须从shopcart跳转
            beforeEnter: (to, from, next) => {
                if (from.path == "/shopcart") {
                    next()
                } else {
                    //返回来的地址
                    next(false)
                }
            }
        },
        {
            path: "/pay",
            component: () => import("@/pages/Pay"),
            meta: { show: false }
        },
        {
            path: "/paysuccess",
            component: () => import("@/pages/PaySuccess"),
            meta: { show: false }
        },
        {
            path: "/center",
            component: () => import("@/pages/Center"),
            meta: { show: false },
            children: [
                {
                    path: "grouporder",
                    component: () => import("@/pages/Center/groupOrder")
                },
                {
                    path: "myorder",
                    component: () => import("@/pages/Center/myOrder")
                },
                //重定向 设定初始二级组件
                {
                    path: "/center",
                    redirect: "/center/myorder"
                }
            ]
        },
        {
            name: "addcartsuccess",
            path: "/addcartsuccess",
            component: () => import("@/pages/AddCartSuccess"),
            meta: { Show: false }
        },
        // 重定向，在项目跑起来的时候，用户访问 /（根目录），立马跳转到主页
        {
            path: "/",
            redirect: "/home"
        }
    ],

    //滚动行为 使页面跳转时滚动条保持在最顶端
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }

})

//路由全局前置守卫
//判断是否跳转
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let userName = store.state.user.userInfo.name
    //token存在 说明已登录
    if (token) {
        //已登录时 无法跳转到登录界面
        if (to.path == "/login") {
            next("/")
        } else {
            //已存在用户信息  则直接跳转
            if (userName) {
                next()
            } else {
                try {
                    //无信息 则发送请求获取信息
                    await store.dispatch("getUserInfo")
                    next()
                } catch (error) {
                    //token失效 需重新登录
                    //先退出登录 清空之前登录带的信息
                    await store.dispatch("logout")
                    //跳转到登录界面
                    next("/login")
                }
            }
        }
    } else {
        //未登录
        let toPath = to.path
        if (toPath.indexOf("/trade") != -1 ||
            toPath.indexOf("/pay") != -1 ||
            toPath.indexOf("cart") != -1 ||
            toPath.indexOf("/center") != -1) {
            //需要登录的组件  附带去往地址的query参数
            next("/login?redirect=" + toPath)
        } else {
            //不需要登录的组件
            next()
        }
    }
})

export default router
