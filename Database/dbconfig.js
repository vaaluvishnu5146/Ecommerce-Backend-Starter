const mongoose = require("mongoose");
const DB_URI = "mongodb://localhost:27017/ecommerce";

async function initiate_db_connection() {
  try {
    const response = await mongoose.connect(DB_URI);
    if (response.connections.length > 0) {
      console.log("Database connection successful");
    } else {
      console.log("Could not establish connection");
    }
  } catch (error) {
    console.log("Error connecting to database");
    console.error(error);
  }
}

module.exports = {
  initiate_db_connection,
};
