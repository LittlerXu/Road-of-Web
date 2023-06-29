//search模块仓库

import { reqGetSearchInfo } from "@/api";

export default {
  namespaced: true, //开启命名空间
  state: {
    searchList: {},
  },
  mutations: {
    GETSEARCHLIST(state, searchList) {
      state.searchList = searchList;
    },
  },
  actions: {
    async getSearchList({ commit }, params = {}) {
      let result = await reqGetSearchInfo(params);
      if (result.code == 200) {
        commit("GETSEARCHLIST", result.data);
      }
    },
  },
  getters: {
    goodsList(state) {
      return state.searchList.goodsList || [];
    },
    trademarkList(state) {
      return state.searchList.trademarkList;
    },
    attrsList(state) {
      return state.searchList.attrsList;
    },
    total(state) {
      return state.searchList.total;
    }
  },
};
