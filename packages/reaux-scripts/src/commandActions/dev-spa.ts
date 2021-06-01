import webpack from "webpack";
import DevServer from "webpack-dev-server";
import {Signals} from "./type";
import chalk from "chalk";
const createConfig = require("../../config");

function devServer(compiler: webpack.Compiler | webpack.MultiCompiler, devServerConfig: DevServer.Configuration) {
    return new DevServer(compiler, devServerConfig);
}

export default async () => {
    const config = createConfig();
    const compiler = webpack(config.webpackDevConfig);
    const server = devServer(compiler, config.devServerConfig);
    server.listen(config.baseConfig.port, "0.0.0.0", (error?: Error) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.info(chalk`starting dev server on {green http://localhost:${config.baseConfig.port}/} \n`);
    });

    ["SIGINT", "SIGTERM"].forEach(signal => {
        process.on(signal as Signals, () => {
            server.close();
            process.exit();
        });
    });
};
