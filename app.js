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

// app.get("/username/:uid", async (req, res) => {
//   try {
//     const username = await db.select("username").table("users").wherer({uid: req.params.uid});
//     res.json(username);
//   } catch (err) {
//     console.error("Error getting username", err);
//     res.send(err);
//   }
// });

app.post("/username", async (req, res) => {
  try {
    const updatedUName = await db.insert({username: req.body.username}).into("users").where({uid: req.body.uid}).returning("username");
    res.json(updatedUName);
  } catch (err) {
    console.error("Error inserting username", err);
    res.send(err);
  }
})

module.exports = app;
