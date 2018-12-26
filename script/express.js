const createServer = require("../core/server/express");
const env = require("../config/env");
createServer(env.output, env.port);
