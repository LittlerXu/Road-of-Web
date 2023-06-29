//登录与注册子仓库

import {
  reqGetCode,
  reqUserLogin,
  reqUserRegister,
  reqUserInfo,
  reqLogout,
} from "@/api";
//引入token持久化存储函数
import { setToken, getToken, removeToken } from "@/utils/token";
import { getUUID } from "@/utils/uuid_token";

export default {
  namespaced: true, //开启命名空间
  state: {
    //登录所需的验证码
    code: "",
    //游客id
    uuid_token: getUUID(),
    token: getToken(),
    userInfo:
      //给userInfo一个默认值{},防止sessionStorage中userInfo为空时访问它的属性从而报错
      JSON.parse(sessionStorage.getItem("USERINFO")) ?? {},
  },
  mutations: {
    GETCODE(state, code) {
      state.code = code;
    },
    USERLOGIN(state, token) {
      state.token = token;
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    CLEAR(state) {
      //把仓库中用户相关信息清空
      //清空本地存储的token
      removeToken();
      //清空sessionStorage中的userInfo
      sessionStorage.removeItem("USERINFO");
      //这两步是必需的,因为vuex无法检测到storage中数据的变化,只能在首次加载时读取storagezhogn
      state.token = "";
      state.userInfo = {};
    },
  },
  actions: {
    //获取验证码
    //获取验证码的这个接口直接将验证码返回了,但实际情况下后台会将验证码发到用户的手机或邮箱中,而不会返回给页面
    async getCode({ commit }, phone) {
      let result = await reqGetCode(phone);
      commit("GETCODE", result.data);
      return result.data;
    },
    //用户注册
    async userRegister({ commit }, user) {
      let result = await reqUserRegister(user);
      if (result.code != 200) {
        throw new Error(result.message);
      }
    },
    //用户登录
    async userLogin({ commit }, data) {
      //登录成功服务器返回token
      let result = await reqUserLogin(data);
      //登录成功则将token保存在仓库中
      if (result.code == 200) {
        //将token持久化存储: 存储在localStorage中
        setToken(result.data.token);
        //并且手动将state中token修改,因为vuex无法监测localStorage中数据的变化
        commit("USERLOGIN", result.data.token);
      } else {
        throw new Error(result.message);
      }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
      let result = await reqUserInfo();
      if (result.code == 200) {
        //成功则将用户信息保存在sessionStorage中
        sessionStorage.setItem("USERINFO", JSON.stringify(result.data));
        //并且手动将state中userInfo修改,因为vuex无法检测sessionStorage中数据的变化
        commit("GETUSERINFO", result.data);
      } else if (result.code == 208) {
        //此处应处理请求用户信息失败: token过期,result.code==208
        commit("CLEAR");
      }
    },
    //退出登录
    async userLogout({ commit }) {
      let result = await reqLogout();
      //退出登录成功则清空userInfo和token
      if (result.code == 200) {
        //注意: action里不能操作state
        commit("CLEAR");
      } else {
        throw new Error(result.message);
      }
    },
  },
  getters: {},
};
