module.exports = {
  lintOnSave: false,
  outputDir: "dist",
  assetsDir: "assets",
  devServer: {
    /*port: 8080, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}*/
    open: true, //配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://api.jisuapi.com/', // 你请求的第三方接口
        ws:false, // 为true表示可以给webscoket使用
        secure: false, //如果是https接口需要配置这个参数
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {  // 路径重写，
          '^/api': '/api'  // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可。
        },
      }
    }
  }
}
