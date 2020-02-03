const express = require("express");

const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");
const path = require("path");
const mongoose = require("mongoose");

const connectDB = require("./config/db");

app.use(bodyParser.json());

app.use(express.json({ extended: false }));

connectDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,PATCH");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Authorization,x-token-auth,x-auth-token"
  );
  next();
});

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  // console.log(`URI ${process.env.MONGO_URI}`);
});
