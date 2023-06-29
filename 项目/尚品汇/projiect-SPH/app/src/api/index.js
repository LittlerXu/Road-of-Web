//对项目中要用到的API进行统一管理
//即把项目中要用到的网络请求封装成函数,在需要时只需要引入并调用即可

import requests from "./request";
import mockRequests from "./mockAjax";

//获取三级联动菜单数据
//reqCategoryList函数返回的Promise的resolve函数的参数为response.data,即请求体,因为设置了响应拦截器
export const reqCategoryList = () =>
  requests.get("/product/getBaseCategoryList"); //由于在创建requests时设置了baseURL:'/api',所以url可以省去'/api'

//获取banner轮播图图片
export const reqGetBannerList = () => mockRequests.get("/banner"); //设置了baseURL:'/mock'

//获取floor轮播图图片
export const reqFloorList = () => mockRequests.get("/floor");

//获取搜索模块数据 路径: /api/list 请求方式: post  参数: 需要带参数,至少是个空对象
export const reqGetSearchInfo = (params) => requests.post("/list", params);

//获取商品详情页信息 URL:/api/item/[skuId] 请求方式: get
export const reqGoodsInfo = (skuId) => requests.get(`/item/${skuId}`);

//将产品添加到购物车中/更新购物车中商品的购数量
// api/cart/addToCart/{skuId}/{skuNum}  POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests.post(`/cart/addToCart/${skuId}/${skuNum}`);

//获取购物车列表数据/将游客购物车合并到用户购物车(有token后)
// /api/cart/cartList GET 无参
export const reqCartList = () => requests.get("/cart/cartList");

//从购物车中删除商品
// /api/cart/deleteCart/{skuId}  DELETE
export const reqDeleteCartById = (skuId) =>
  requests.delete(`/cart/deleteCart/${skuId}`);

//修改商品的选中状态
// /api/cart/checkCart/{skuId}/{isChecked}  GET
export const reqUpdateCheckedById = (skuId, isChecked) =>
  requests.get(`/cart/checkCart/${skuId}/${isChecked}`);

//获取验证码
// /api/user/passport/sendCode/{phone} GET
export const reqGetCode = (phone) =>
  requests.get(`/user/passport/sendCode/${phone}`);

//注册
// /api/user/passport/register POST
export const reqUserRegister = (data) =>
  requests.post(`/user/passport/register`, data);

//登录
// /api/user/passport/login POST
export const reqUserLogin = (data) =>
  requests.post(`/user/passport/login`, data);

//获取用户信息(需要在请求头中携带上本地存储的token向服务器要用户信息)
// /api/user/passport/auth/getUserInfo GET
export const reqUserInfo = () =>
  requests.get("/user/passport/auth/getUserInfo");

//退出登录
// /api/user/passport/logout GET
export const reqLogout = () => requests.get("/user/passport/logout");

//获取用户地址
// /api/user/userAddress/auth/findUserAddressList GET
//凭借token识别用户
export const reqGetUserAddress = () =>
  requests.get("/user/userAddress/auth/findUserAddressList");

//获取结算页面的商品清单
// /api/order/auth/trade GET
//凭借token识别用户
export const reqOrderInfo = () => requests.get("/order/auth/trade");

//提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo} POST
export const reqSubmitOrder = (tradeNo, data) =>
  requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data);

//获取支付信息
// /api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = (orderId) =>
  requests.get(`/payment/weixin/createNative/${orderId}`);

//获取支付状态
// /api/payment/weixin/queryPayStatus/{orderId} GET
export const reqPayStatus = (orderId) =>
  requests.get(`/payment/weixin/queryPayStatus/${orderId}`);

//获取个人中心页面的数据
// /api/order/auth/{page}/{limit} GET
export const reqMyOrderList = (page, limit) =>
  requests.get(`/order/auth/${page}/${limit}`);
