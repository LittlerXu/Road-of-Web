//detail模块仓库

import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
export default {
  namespaced: true, //开启命名空间
  state: {
      goodInfo: {},
  },
  mutations: {
    GETGOODINFO(state, goodInfo) {
      state.goodInfo = goodInfo;
    },
  },
  actions: {
    //获取产品信息
    async getGoodInfo({ commit }, skuid) {
      let result = await reqGoodsInfo(skuid);
      if (result.code == 200) {
        commit("GETGOODINFO", result.data);
      }
    },
    //将产品添加到购物车中
    //使用对象形式参数的原因: 传入参数可以无序,便于后续添加参数(比如商品的属性等)
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);

        //async函数返回Promise
        return result.code;
    },
  },
  getters: {
    //路径导航
    categoryView(state) {
      //如果在发送请求之前就使用store中的数据,此时数据还未存在,此时返回空对象或数组可以防止报错
      return state.goodInfo.categoryView || {};
    },
    //产品信息
    skuInfo(state) {
      return state.goodInfo.skuInfo || {};
    },
    //产品属性
    spuSaleAttrList(state) {
      return state.goodInfo.spuSaleAttrList || [];
    },
  },
};
