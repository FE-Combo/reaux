const chalk = require("chalk");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const DevServer = require("webpack-dev-server");

function devServer(compiler) {
  return new DevServer(compiler, {
    static: "./src/static",
    historyApiFallback: true,
    compress: true,
    headers: {"Access-Control-Allow-Origin": "*"},
    client: {
      overlay: {
        warnings: true,
        errors: true
      },
    },
  });
}

function start() {
  const compiler = webpack(webpackConfig);
  const server = devServer(compiler);
  server.listen(3000, "0.0.0.0", error => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.info(
      chalk`starting dev server on {green http://localhost:3000/} \n`
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
