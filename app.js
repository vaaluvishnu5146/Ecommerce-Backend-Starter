const express = require("express");
const bodyparser = require("body-parser");
const AuthMiddleware = require("./Middleware/Auth.middleware");
const APP_SERVER = express();

// CONFIGURING BODYPARSER
APP_SERVER.use(bodyparser.json());

APP_SERVER.use("/products", require("./controllers/products.controller"));
APP_SERVER.use("/auth", require("./controllers/Authentication.controller"));
APP_SERVER.use(
  "/cart",
  AuthMiddleware,
  require("./controllers/Cart.controller")
);

module.exports = APP_SERVER;
