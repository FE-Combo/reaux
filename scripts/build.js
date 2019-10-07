const chalk = require("chalk");
const childProcess = require("child_process");
const fs = require("fs-extra");
const targetPath = "packages/**/src/*.{ts,tsx,js}";
const jestConfig = "config/jest.json";
const tsLintConfig = "config/tslint.json";
const prettierConfig = "config/prettier.json";
const reauxTSConfig = "config/tsconfig.reaux.json";
const reauxDOMTSConfig = "config/tsconfig.reaux-dom.json";

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
    return spawn("prettier", ["--config", prettierConfig, "--list-different", targetPath], "check code style failed, please format above files");
}

function test() {
    console.info(chalk`{green.bold [task]} {white.bold test}`);
    return spawn("jest", ["--config", jestConfig], "test failed, please fix");
}

function lint() {
    console.info(chalk`{green.bold [task]} {white.bold lint}`);
    return spawn("tslint", ["-c", tsLintConfig, targetPath], "lint failed, please fix");
}

function cleanup() {
    console.info(chalk`{green.bold [task]} build {white.bold cleanup}`);
    fs.emptyDirSync("build");
}

function compile() {
    console.info(chalk`{green.bold [task]} {white.bold compile reaux}`);
    spawn("tsc", ["-p", reauxTSConfig], "compile failed, please fix");

    console.info(chalk`{green.bold [task]} {white.bold compile reaux-dom}`);
    spawn("tsc", ["-p", reauxDOMTSConfig], "compile failed, please fix");
}

function distribute() {
    console.info(chalk`{green.bold [task]} {white.bold distribute reaux}`);
    fs.mkdirsSync("build/reaux/dist");
    fs.copySync("build/reaux/output", "build/reaux/dist", {dereference: true});
    fs.copySync("packages/reaux/package.json", "build/reaux/dist/package.json", {dereference: true});

    console.info(chalk`{green.bold [task]} {white.bold distribute reaux-dom}`);
    fs.mkdirsSync("build/reaux-dom/dist");
    fs.copySync("build/reaux-dom/output", "build/reaux-dom/dist", {dereference: true});
    fs.copySync("packages/reaux-dom/package.json", "build/reaux-dom/dist/package.json", {dereference: true});
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
