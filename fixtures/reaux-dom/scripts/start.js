const chalk = require("chalk");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.dev");
const DevServer = require("webpack-dev-server");

function devServer(compiler) {
  return new DevServer(compiler, {
    contentBase: "./src/static",
    historyApiFallback: true,
    hot: true,
    compress: true,
    overlay: {
      warnings: true,
      errors: true
    },
    stats: {
      colors: true
    }
  });
}

function start() {
  const compiler = webpack(webpackConfig);
  const server = devServer(compiler);
  server.listen(8080, "0.0.0.0", error => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.info(
      chalk`starting dev server on {green http://localhost:8080/} \n`
    );
    return null;
  });

  ["SIGINT", "SIGTERM"].forEach(signal => {
    process.on(signal, () => {
      server.close();
      process.exit();
    });
  });
}

start();
