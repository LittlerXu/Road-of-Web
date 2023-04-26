//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入VueRouter,因为要显式use这个插件
import VueRouter from 'vue-router'
//引入路由器,因为要注入vm中
import router from './router'

//关闭Vue的生产提示
Vue.config.productionTip = false
//应用插件
Vue.use(VueRouter)

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	router //注入vm中
})
