const express = require("express");
const path = require("path");
const db = require("./knex.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Serve static assets
// app.use(express.static(path.resolve(__dirname, "..", "build")));

// GET Tokyo's wards list
app.get("/wards", async (req, res) => {
  try {
    const wards = await db.select().table("tokyo");
    res.json(wards);
  } catch (err) {
    console.error("Error loading wards!", err);
    res.sendStatus(500);
  }
});

// GET Clinic's list
app.get("/clinics", async (req, res) => {
  try {
    const clinics = await db.select().table("clinics");
    res.json(clinics);
  } catch (err) {
    console.error("Error loading clinics!", err);
    res.sendStatus(500);
  }
});

// GET a clinic by id
app.get("/clinics/:id", async (req, res) => {
  const targetId = req.params.id;
  try {
    const targetClinic = await db
      .select()
      .table("clinics")
      .where({ id: targetId });
    res.json(targetClinic);
  } catch (err) {
    console.error("Error loading clinics!", err);
    res.sendStatus(500);
  }
});

// app.get("/", async (req, res) => {
//   try {
//     res.json({ apple: "apple" });
//     console.log("Succeeeeeeeeeeeeeeeeeeeeeed");
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// });

module.exports = app;
