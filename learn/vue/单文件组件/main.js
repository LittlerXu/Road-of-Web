//main.js最重要的作用是创建Vue实例,指明为哪个容器服务

//1. 导入App组件
import App from './App.vue'

new Vue({
    el: '#root',
    //在template中编写App组件的组件标签
    template: `<App></App>`,
    // 注册App组件
    components: {App}
});