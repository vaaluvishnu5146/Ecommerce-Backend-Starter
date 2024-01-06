const express = require("express");
const bodyparser = require("body-parser");
const APP_SERVER = express();

// CONFIGURING BODYPARSER
APP_SERVER.use(bodyparser.json());

APP_SERVER.use("/products", require("./controllers/products.controller"));
APP_SERVER.use("/auth", require("./controllers/Authentication.controller"));

module.exports = APP_SERVER;
