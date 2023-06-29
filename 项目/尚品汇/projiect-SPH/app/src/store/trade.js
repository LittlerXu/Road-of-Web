import { reqGetUserAddress, reqOrderInfo } from "@/api";
export default {
  namespaced: true, //开启命名空间
  state: {
    address: [],
    orderInfo: {},
  },
  mutations: {
    GETUSERADDRESS(state, address) {
      state.address = address;
    },
    GETORDERINFO(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  actions: {
    //获取用户地址
    async getUserAddress({ commit }) {
      let result = await reqGetUserAddress();
      if (result.code == 200) {
        commit("GETUSERADDRESS", result.data);
      }
    },
    //获取结算页面的商品清单
    async getOrderInfo({ commit }) {
      let result = await reqOrderInfo();
      if (result.code == 200) {
        commit("GETORDERINFO", result.data);
      }
    },
  },
  getters: {},
};
