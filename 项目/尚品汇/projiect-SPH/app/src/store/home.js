//home模块仓库

//引入三级联动模块数据请求函数
import { reqCategoryList, reqGetBannerList, reqFloorList} from "@/api";

export default {
  namespaced: true, //开启命名空间
  state: {
    //数据的初始值不能乱写,要以请求到的数据为准,请求到的数据是数组,则初始值为[],请求到的是对象,则初始值为{}
    //三级联动菜单数据
    categoryList: [],
    //banner轮播图图片
    bannerList: [],
    //floor轮播图图片
    floorList: [],
  },
  mutations: {
    GETCATEGORYLIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
      state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
      state.floorList = floorList;
    },
  },
  actions: {
    //获取三级联动的数据
    async getCategoryList({ commit }) {
      let result = await reqCategoryList();
      if (result.code == 200) {
        commit("GETCATEGORYLIST", result.data);
      }
    },

    //获取首页轮播图图片
    async getBannerList({ commit }) {
      let result = await reqGetBannerList();
      if (result.code == 200) {
        commit("GETBANNERLIST", result.data);
      }
    },

    //获取floor组件数据
    async getFloorList({ commit }) {
      let result = await reqFloorList();
      if (result.code == 200) {
        commit("GETFLOORLIST", result.data);
      }
    },

  },
  getters: {},
};
