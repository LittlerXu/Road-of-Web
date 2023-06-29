import Vue from "vue";
import App from "./App.vue";
//引入路由器
import router from "@/router";
//引入store
import store from "@/store";
//引入MockServe.js---mock数据
import "@/mock/mockServe";
//引入swiper中的样式
import "swiper/css/swiper.css";
//统一引入api文件中的全部接口
import * as API from "@/api";
//element-ui按需引入
import { MessageBox } from "element-ui";
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入图片懒加载插件
import Vuelazyload from 'vue-lazyload';
//引入图片懒加载时的默认图片
import atm from '@/assets/lazyload.gif'
//使用插件
Vue.use(Vuelazyload, {
  loading: atm
});

//引入三级联动组件
import TypeNav from "@/components/TypeNav";
//将其注册为全局组件
Vue.component("TypeNav", TypeNav);
//将轮播图组件注册为全局组件
import Carousel from "@/components/Carousel";
Vue.component("Carousel", Carousel);
//将分页器组件注册为全局组件
import Pagination from "@/components/Pagination";
Vue.component("Pagination", Pagination);

Vue.config.productionTip = false;

const vm = new Vue({
  render: (h) => h(App),
  //注册路由
  router,
  //注册仓库
  store,
  beforeCreate() {
    //安装全局事件总线
    Vue.prototype.$bus = this;
    //将api中的全部接口全局注册
    Vue.prototype.$API = API;
  },
}).$mount("#app");
