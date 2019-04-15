const chalk = require("chalk");
const childProcess = require("child_process");
const fs = require("fs-extra");

function spawn(command, args, errorMessage) {
    const isWindows = process.platform === "win32"; // spawn with {shell: true} can solve .cmd resolving, but prettier doesn't run correctly on mac/linux
    const result = childProcess.spawnSync(isWindows ? command + ".cmd" : command, args, {stdio: "inherit"});
    if (result.error) {
        console.error(result.error);
        process.exit(1);
    }
    if (result.status !== 0) {
        console.error(chalk`{red.bold ${errorMessage}}`);
        console.error(`non-zero exit code returned, code=${result.status}, command=${command} ${args.join(" ")}`);
        process.exit(1);
    }
}

function checkCodeStyle() {
    console.info(chalk`{green.bold [task]} {white.bold check code style}`);
    return spawn("prettier", ["--config", "config/prettier.json", "--list-different", "package/doReact/**/*.{ts,tsx,js}"], "check code style failed, please format above files");
}

// function test() {
//     console.info(chalk`{green.bold [task]} {white.bold test}`);
//     return spawn("jest", ["--config", "config/jest.json"], "test failed, please fix");
// }

function lint() {
    console.info(chalk`{green.bold [task]} {white.bold lint}`);
    return spawn("tslint", ["-c", "config/tslint.json", "{package/doReact,test}/**/*.{ts,tsx}"], "lint failed, please fix");
}

function cleanup() {
    console.info(chalk`{green.bold [task]} output/doReact {white.bold cleanup}`);
    fs.emptyDirSync("output/doReact");
}

function compile() {
    console.info(chalk`{green.bold [task]} {white.bold compile}`);
    return spawn("tsc", ["-p", "config/tsconfig.react.json"], "compile failed, please fix");
}

function distribute() {
    console.info(chalk`{green.bold [task]} {white.bold distribute}`);
    fs.mkdirsSync("output/doReact/dist/lib");
    fs.copySync("output/doReact/out/framework", "output/doReact/dist/lib/", {dereference: true});
    fs.copySync("package/doReact/package.json", "output/doReact/dist/package.json", {dereference: true});
}

function output() {
    cleanup();
    checkCodeStyle();
    // test();
    lint();
    compile();
    distribute();
}

output();
