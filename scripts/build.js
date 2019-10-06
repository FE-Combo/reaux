const chalk = require("chalk");
const childProcess = require("child_process");
const fs = require("fs-extra");
const prettierPath = "config/prettier.json";
const tsLintPath = "config/tslint.json";
const tsConfigPath = "config/tsconfig.reaux.json";
const jestPath = "config/jest.json";
const targetPath = "packages/**/src/*.{ts,tsx,js}";

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
    return spawn("prettier", ["--config", prettierPath, "--list-different", targetPath], "check code style failed, please format above files");
}

function test() {
    console.info(chalk`{green.bold [task]} {white.bold test}`);
    return spawn("jest", ["--config", jestPath], "test failed, please fix");
}

function lint() {
    console.info(chalk`{green.bold [task]} {white.bold lint}`);
    return spawn("tslint", ["-c", tsLintPath, targetPath], "lint failed, please fix");
}

function cleanup() {
    console.info(chalk`{green.bold [task]} build {white.bold cleanup}`);
    fs.emptyDirSync("build");
}

function compile() {
    console.info(chalk`{green.bold [task]} {white.bold compile}`);
    return spawn("tsc", ["-p", tsConfigPath], "compile failed, please fix");
}

function distribute() {
    console.info(chalk`{green.bold [task]} {white.bold distribute}`);
    fs.mkdirsSync("build/reaux/dist");
    fs.copySync("build/reaux/output", "build/reaux/dist", {dereference: true});
    fs.copySync("packages/reaux/package.json", "build/reaux/dist/package.json", {dereference: true});
}

function build() {
    cleanup();
    checkCodeStyle();
    test();
    lint();
    compile();
    distribute();
}

build();
