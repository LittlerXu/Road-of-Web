import {
  reqCartList,
  reqAddOrUpdateShopCart,
  reqDeleteCartById,
  reqUpdateCheckedById,
} from "@/api";

export default {
  namespaced: true,
  state: {
    cartList: [],
  },
  mutations: {
    GETCARTLIST(state, cartList) {
      state.cartList = cartList;
    },
  },
    actions: {
      //获取购物车数据
    async getCartList({ commit }) {
      let result = await reqCartList();
      if (result.code == 200) {
        commit("GETCARTLIST", result.data);
      }
    },
    //修改购物车中商品数量
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
      let result = await reqAddOrUpdateShopCart(skuId, skuNum);
      //async函数返回Promise
      return result.code;
    },
    //从购物车中删除商品
    async deleteCartById({ commit }, skuId) {
      let result = await reqDeleteCartById(skuId);
      //async函数返回Promise
      return result.code;
    },
    //修改商品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
      let result = await reqUpdateCheckedById(skuId, isChecked);
      //async函数返回Promise
      return result.code;
    },
    //删除所有选中商品
    deleteAllCheckedCart({ dispatch, getters }) {
      let PromiseAll = [];
      getters.cartList.cartInfoList.forEach((item) => {
        let result =
          item.isChecked == 1 ? dispatch("deleteCartById", item.skuId) : "";
        //将每一次返回的Promise添加至PromiseAll数组中
        PromiseAll.push(result);
      });
      return Promise.all(PromiseAll);
    },
    //修改所有商品的选中状态
    updateAllCartChecked({ dispatch, state }, isChecked) {
      let PromiseAll = [];
      state.cartList[0].cartInfoList.forEach((item) => {
        let result =
          item.isChecked != isChecked
            ? dispatch("updateCheckedById", { skuId: item.skuId, isChecked })
            : "";
        //将每一次返回的Promise添加至PromiseAll数组中
        PromiseAll.push(result);
      });
      return Promise.all(PromiseAll);
    },
  },
  getters: {
    cartList(state) {
      return state.cartList[0] || {};
    },
  },
};
