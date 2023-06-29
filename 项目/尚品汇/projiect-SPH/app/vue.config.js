const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap:false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn", //目标服务器ip和端口
        //由于真实路径就是以'/api'开头,所以不需要路径重写
        //pathRewrite: { "^/api": "" },
      },
    },
  },
});
