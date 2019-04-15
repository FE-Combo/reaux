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

function generate() {
    const depNames = ["@types/node", "@types/react", "@types/react-dom", "@types/react-redux", "@types/react-router-dom", "axios", "connected-react-router", "react", "react-dom", "react-redux", "react-router-dom", "redux", "redux-saga"];
    const dependencies = {};

    const packageBuffer = fs.readFileSync("./package.json");
    const targetPackageBuffer = fs.readFileSync("./package/doReact/package.json");
    const packageJSON = JSON.parse(packageBuffer);
    const targetPackageJSON = JSON.parse(targetPackageBuffer.toString());

    Object.entries(packageJSON.dependencies).forEach(dep => {
        if (depNames.includes(dep[0])) {
            dependencies[dep[0]] = dep[1];
        }
    });

    targetPackageJSON.dependencies = dependencies;
    targetPackageJSON.peerDependencies = dependencies;

    fs.writeFileSync("./package/doReact/package.json", JSON.stringify(targetPackageJSON));
    spawn("prettier", ["--config", "config/prettier.json", "--write", "package/doReact/package.json"]);
}

generate();
