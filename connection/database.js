const mongoose = require("mongoose");
require("dotenv").config();

const { DATABASE_URL } = process.env;






const connectDatabase = (cb) => {
  mongoose
    .connect(DATABASE_URL, {
      useNewUrlParser: true,
      socketTimeoutMS: 30 * 1000
    })
    .then(cb?.())
    .catch((error) => {
      console.log("DATABASE ERROR:", error);
      process.exit(1);
    });
};

module.exports = connectDatabase;
