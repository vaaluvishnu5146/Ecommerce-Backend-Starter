const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const APP_SERVER = require("./app");
const { initiate_db_connection } = require("./Database/dbconfig");
const HTTP_SERVER = express();
const PORT = 5000;

// Configure the DOTENV in your project
dotenv.config();

// INITIAING DB CONNECTION
initiate_db_connection();

HTTP_SERVER.use(cors());

// INJECT THE APP SERVER
HTTP_SERVER.use("/api", APP_SERVER);

HTTP_SERVER.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started successfully at ${PORT}`);
});
