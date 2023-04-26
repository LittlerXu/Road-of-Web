const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pages: {
    index: {
      //入口
      entry: 'src_编程式路由导航/main.js',
    },
  },
  transpileDependencies: true,
  lintOnSave: false,
})
