module.exports= {
    compileConfig:{
        "isSSR":true,
    },
    runtimeConfig:{},
    baseConfig:function (config) {
      return config;
    },
    devServerConfig:function (config) {
      return config;
    },
    webpackDevConfig:function (config){
      return config
    },
    webpackProdConfig:function (config){
      return config
    }
  }