const childProcess = require("child_process");
const fs = require("fs-extra");

function spawn(command, args) {
    const isWindows = process.platform === "win32";
    const result = childProcess.spawnSync(isWindows ? command + ".cmd" : command, args, {stdio: "inherit"});
    if (result.error) {
        console.error(result.error);
        process.exit(1);
    }
    if (result.status !== 0) {
        console.error(`non-zero exit code returned, code=${result.status}, command=${command} ${args.join(" ")}`);
        process.exit(1);
    }
}

function generate() {
    const packageBuffer = fs.readFileSync("./package/doReact/package.json");
    const targetPackageBuffer = fs.readFileSync("./package.json");
    const packageJSON = JSON.parse(packageBuffer);
    const targetPackageJSON = JSON.parse(targetPackageBuffer.toString());

    targetPackageJSON.devDependencies = packageJSON.devDependencies;
    targetPackageJSON.dependencies = packageJSON.dependencies;
    packageJSON.peerDependencies = packageJSON.dependencies;

    fs.writeFileSync("./package/doReact/package.json", JSON.stringify(packageJSON));
    fs.writeFileSync("./package.json", JSON.stringify(targetPackageJSON));

    spawn("prettier", ["--config", "config/prettier.json", "--write", "{package/doReact/package.json,package.json}"]);
}

generate();
