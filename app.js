const express = require("express");
const path = require("path");
const db = require("./knex.js");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

// Serve static assets
// app.use(express.static(path.resolve(__dirname, "..", "build")));

// app.use("/", (req, res) => {
//     res.send("hello world!");
//   });

app.get("/", async (req, res) => {
  try {
    res.json({ apple: "apple" });
    console.log("Succeeeeeeeeeeeeeeeeeeeeeed");
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = app;
