const fs = require("fs-extra");
const webpackConfig = require("../core/webpack/webpack.config.prod");
const webpack = require("webpack");
const complier = webpack(webpackConfig);
const WebpackDevServer = require("webpack-dev-server");
const env = require("../config/env");
const {renderToString} = "react-dom/server";
const axios = require("axios");
const Agent = require("https").Agent;
const htmlTpl = fs.readFileSync("./src/index.html", "utf8");

const devServer = new WebpackDevServer(complier, {
    contentBase: env.contentBase,
    watchContentBase: true,
    host: env.host,
    historyApiFallback: true,
    hot: true,
    compress: true,
    quiet: true,
    overlay: {
        warnings: true,
        errors: true,
    },
    before: function(app) {
        // 开启https时 需要使用http Agent代理获取数据
        app.use((req, res, next) => {
            if (/^\/client/.test(req.path) || /^\/index.html/.test(req.path)) {
                next();
            } else {
                try {
                    Promise.all([axios.get(`http://localhost:3000/client/main.js`, {httpsAgent: new Agent({rejectUnauthorized: false})}), axios.get(`http://localhost:3000/index.html`, {httpsAgent: new Agent({rejectUnauthorized: false})})]).then(([main, tpl]) => {
                        const Module = module.constructor;
                        const mainModule = new Module();
                        console.log(mainModule._compile(main.data, "main.js"));
                        res.end(tpl.data);
                    });
                } catch (e) {
                    next();
                }
            }

            // next();
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
