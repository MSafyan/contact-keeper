const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const config = require("config");
const db = config.get("mongoURI");

// mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("connected to database");
  } catch (err) {
    console.error(err.message);
    // process.exit(1);
  }
  mongoose.connection.on("error", function(error) {
    console.error("Database connection error:", error);
  });

  mongoose.connection.once("open", function() {
    console.log("Database connected");
  });
};

module.exports = connectDB;
