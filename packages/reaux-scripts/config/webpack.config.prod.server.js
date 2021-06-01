const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

function resolve(relativePath) {
    return path.resolve(__dirname, `../${relativePath}`);
}

function createConfig (config) {
  return {
    target: 'node',
    entry: {
      index: config.serverEntry,
    },
    output: {
      path: config.serverOutputPath,
      filename: config.serverOutputFilename,
      publicPath: config.serverOutputPublicPath,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".scss"],
      modules: [config.baseUrl, "node_modules"],
      alias: {},
      plugins:[new TsconfigPathsPlugin({
        extensions: [".js", ".jsx",".ts", ".tsx"],
        configFile: config.serverTSConfig
    })]
    },
    module: {
      rules: [
        {
          test: /(\.tsx|\.ts)$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            configFile: config.serverTSConfig
          },
        }
      ]
    },
  }
}

module.exports = createConfig;


