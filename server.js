const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 7000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const databaseUrl = process.env.MONGODB_URI || "budget";
const collections = ["budget"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`Application running on PORT ${PORT}`);
});