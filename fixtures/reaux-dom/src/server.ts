import routes from "./route";
import start from "./index";
const server = require("../../../build/reaux-scripts/dist/src/server");

server.default({isSSR: true, routes, startApp: start});
