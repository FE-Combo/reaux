const fs = require("fs-extra");
const webpackConfig = require("../core/webpack/webpack.config.prod");
const webpack = require("webpack");
const complier = webpack(webpackConfig);
const WebpackDevServer = require("webpack-dev-server");
const env = require("../config/env");
const {renderToString} = "react-dom/server";
const htmlTpl = fs.readFileSync("./src/index.html", "utf8");

const devServer = new WebpackDevServer(complier, {
    contentBase: env.contentBase,
    watchContentBase: true,
    host: env.host,
    https: true,
    historyApiFallback: true,
    hot: true,
    compress: true,
    overlay: {
        warnings: true,
        errors: true,
    },
    before: function(app) {
        app.get("/", function(req, res) {
            const Module = module.constructor;
            const a = new Module();
            console.log(a);
            res.end(htmlTpl);
        });
    },
});

devServer.listen(env.port, env.host, error => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.info(`starting dev server on {green https://localhost:${env.port}/} \n`);
    return null;
});

/* [中断进程, 软件终止信号]监听 ref：https://blog.csdn.net/sufwei/article/details/51610676 */
["SIGINT", "SIGTERM"].forEach(signal => {
    process.on(signal, () => {
        devServer.close();
        process.exit();
    });
});
