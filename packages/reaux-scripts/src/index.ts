import process from "process";
import commander from "commander";
import {errorIntercept} from "./kits";
import start from "./commandActions/start";
import devSPA from "./commandActions/dev-spa";
import devSSR from "./commandActions/dev-ssr";
import buildClient from "./commandActions/build-client";
import buildServer from "./commandActions/build-server";
import build from "./commandActions/build";
const pkgInfo = require("../package.json");

commander.version(pkgInfo.version);

commander
    .command("dev:spa")
    .description("start develop spa app")
    .action(async (modulePath, cmd) => {
        errorIntercept(async () => {
            await devSPA();
        });
    });

commander
    .command("dev:ssr")
    .description("start develop ssr app")
    .action(async (modulePath, cmd) => {
        errorIntercept(async () => {
            await devSSR();
        });
    });

commander
    .command("build:client")
    .description("build client app")
    .action(async (modulePath, cmd) => {
        errorIntercept(async () => {
            await buildClient();
        });
    });

commander
    .command("build:server")
    .description("build server app")
    .action(async (modulePath, cmd) => {
        errorIntercept(async () => {
            await buildServer();
        });
    });

commander
    .command("build")
    .description("build client&server app")
    .action(async (modulePath, cmd) => {
        errorIntercept(async () => {
            await build();
        });
    });

commander
    .command("start")
    .description("start production's app")
    .action(async (modulePath, cmd) => {
        errorIntercept(async () => {
            await start();
        });
    });

commander.parse(process.argv);
