const express = require("express");
const app = express();

require("./jobs.routes")(app);

module.exports = app;
