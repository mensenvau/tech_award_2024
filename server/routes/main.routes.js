const express = require("express");
const app = express();

require("./jobs.routes")(app);
require("./auth.routes")(app);

module.exports = app;
