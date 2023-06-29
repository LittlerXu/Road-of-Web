//新建一个Axios实例并给其添加请求和响应拦截器

import axios from "axios";
//引入进度条
import nProgress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";

//引入store,为了获取uuid
import store from '@/store'

//新建一个Axios实例对象
const requests = axios.create({
  baseURL: "api/",
  timeout: 5000,
});

//给requests添加请求拦截器
requests.interceptors.request.use((config) => {
  //未启用游客模式
  // //在请求头中添加uuid
  // if (store.state.user?.uuid_token) {
  //   //uuid字段名为:userTempId
  //   config.headers.userTempId = store.state.user.uuid_token;
  // }
  //在请求头中添加token
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  //进度条开始动
  nProgress.start();
  //config: 配置对象,里面有一个属性很重要: headers请求头
  return config;
});

//给requests添加响应拦截器
requests.interceptors.response.use(
  (res) => {
    //进度条结束
    nProgress.done();

    //设置requests请求直接返回响应体,即数据
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//对外暴露requests
export default requests;
