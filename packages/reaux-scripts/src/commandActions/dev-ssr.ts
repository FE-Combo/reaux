/// <reference path="./reference.d.ts" />
import Koa from "koa";
import koaRouter from "koa-router";
import koaStatic from "koa-static";
import path from "path";
import chalk from "chalk";
import nodemon from "nodemon";
import webpack from "webpack";
import webpackDevMiddleware from "koa-webpack-dev-middleware";
import webpackHotMiddleware from "koa-webpack-hot-middleware";
import server from "../server";

const createConfig = require("../../config");
const customNodemonConfigFile = path.join(process.cwd(), "nodemon.json");

export default async () => {
    const config = createConfig();
    nodemon({
        watch: ["src"],
        ext: "ts, tsx",
        ignore: ["src/**/*.test.ts"],
        // TODO: hmr
        exec: `ts-node --project ${config.baseConfig.serverTSConfig} ${config.baseConfig.serverEntry}`,
    });

    nodemon
        .on("start", function() {
            console.log(chalk`> App started, port: ${config.baseConfig.port}`);
        })
        .on("quit", function() {
            console.log(chalk`App has quit`);
            process.exit();
        })
        .on("restart", function(files) {
            console.log(chalk`App restarted due to: ${files}`);
        });
};
