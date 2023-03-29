import requests from "./request";
import mockRequests from "./mockAjax"

//三级联动接口
//请求地址：/api/product/getBaseCategoryList
export const reqCategoryList = () => requests({ method: 'GET', url: '/product/getBaseCategoryList' })


//假数据 mock
//轮播图mock数据请求接口
export const reqGetBannerList = () => mockRequests.get('/banners')

// 获取首页楼层列表
export const reqGetFloorsList = () => mockRequests.get('/floors')

//请求获取搜索模块数据 地址:/api/list
// 要带参数
/* {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
//data接收数据 
//函数调用时，data中的params必须传入数据（起码得是空对象）
export const reqGetSearchInfo = (params) => requests({ method: "POST", url: "/list", data: params })

//获取商品详细信息请求接口
export const reqGetGoodsInfo = (skuId) => requests({ method: "GET", url: `/item/${skuId}` })

//添加商品或更新商品到购物车
export const reqAddOrUpdateShopcart = (skuId, skuNum) => requests({ method: "POST", url: `/cart/addToCart/${skuId}/${skuNum}` })

//获取购物车信息
export const reqGetShopCartList = () => requests.get("/cart/cartList")

//删除商品
export const reqDeleteCart = (skuId) => requests({ method: "DELETE", url: `/cart/deleteCart/${skuId}` })

//修改商品的选中情况
export const reqUpdateChecked = (skuId, isChecked) => requests({ method: "GET", url: `/cart/checkCart/${skuId}/${isChecked}` })

//获取验证码
export const reqGetCode = (phone) => requests({ method: "GET", url: `/user/passport/sendCode/${phone}` })

//注册用户
export const reqUserRegister = (data) => requests({ method: "POST", url: "/user/passport/register", data })

//登录
export const reqUserLogin = (data) => requests({ method: "POST", url: "/user/passport/login", data })

//token身份验证
export const reqGetUserInfo = () => requests({ method: "GET", url: "/user/passport/auth/getUserInfo" })

//退出登录
export const reqLogout = () => requests({ method: "GET", url: "/user/passport/logout" })

//获取用户地址信息
export const reqAddressInfo = () => requests({ method: "GET", url: "/user/userAddress/auth/findUserAddressList" })

//获取订单交易页信息
export const reqOrderInfo = () => requests({ method: 'GET', url: "/order/auth/trade" })

//发送订单请求
export const reqSubmitOrder = (tradeNo, data) => requests({ method: "POST", url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data })

//获取支付信息
export const reqPayInfo = (orderId) => requests({ method: "GET", url: `/payment/weixin/createNative/${orderId}` })

//获取订单支付状态
export const reqPayStatus = (orderId) => requests({ method: "GET", url: `/payment/weixin/queryPayStatus/${orderId}` })

//获取个人中心信息(我的订单)
export const reqMyOrderInfo = (page, limit) => requests({ method: "GET", url: `/order/auth/${page}/${limit}` })