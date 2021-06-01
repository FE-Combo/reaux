import path from "path";
import chalk from "chalk";
import nodemon from "nodemon";

const createConfig = require("../../config");
const customNodemonConfigFile = path.join(process.cwd(), "nodemon.json");

export default async () => {
    const config = createConfig();
    nodemon({
        watch: ["src"],
        ext: "ts, tsx",
        ignore: ["src/**/*.test.ts"],
        // TODO: hmr
        exec: `yarn build:client && ts-node --project ${config.baseConfig.serverTSConfig} ${config.baseConfig.serverEntry}`,
    });

    nodemon
        .on("start", function() {
            console.log(`> App started, port: ${config.baseConfig.port}`);
        })
        .on("quit", function() {
            console.log("App has quit");
            process.exit();
        })
        .on("restart", function(files) {
            console.log("App restarted due to: ", files);
        });
};
