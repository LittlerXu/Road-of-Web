<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //派发action请求三级联动的数据,放在app组件中只会派发一次
    this.$store.dispatch('home/getCategoryList');
  }
};
</script>

<style>
</style>
