const path = require("path");

function resolve(relativePath) {
    return path.resolve(__dirname, `./${relativePath}`);
}

module.exports= {
    compileConfig: {
        "isSSR":true,
    },

    runtimeConfig: {},

    baseConfig:function (config) {
      config.outputPath = resolve("dist/client");
      config.publicPath = "/client/";

      config.clientTSConfig = resolve("config/client.tsconfig.json");
      config.serverTSConfig = resolve("config/server.tsconfig.json");
      return config;
    },

    devServerConfig:function (config) {
      return config;
    },

    webpackDevConfig:function (config) {
      return config
    },
    
    webpackProdConfig:function (config) {
      const alias = {
        "reaux": resolve( "../../packages/reaux"),
        "reaux-dom": resolve( "../../packages/reaux-dom")
      }
      config[0].resolve.alias = alias;
      config[1].resolve.alias = alias;
      return config
    }
  }