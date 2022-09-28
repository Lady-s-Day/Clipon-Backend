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

app.get("/wards/:id", async (req, res) => {
  const targetId = req.params.id;
  try {
    const targetClinic = await db
      .select()
      .table("clinics")
      .where({ tokyo_ward_id: targetId });
    res.json(targetClinic);
  } catch (err) {
    console.error("Error loading wards id!", err);
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

app.get("/username/:uid", async (req, res) => {
  console.log(req.params.uid);
  try {
    const username = await db("users").where("uid", req.params.uid);
    console.log(username);
    res.json(username);
  } catch (err) {
    console.error("Error getting username uid", err);
    res.send(err);
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body.uid, "uid");
  return db("users")
    .insert({ uid: req.body.uid })
    .then(() => {
      res.status(201).send(req.body.uid);
    });
});

app.put("/username", async (req, res) => {
  console.log(req.body.username, req.body.uid);
  return db("users")
    .where("uid", req.body.uid)
    .update({
      user_name: req.body.username,
    })
    .then(() => res.status(204).send(req.body.username));
  // try {
  //   const updatedUName =
  //     await db.insert({ username: req.body.username }).into("users").where('uid', req.body.uid);
  //   res.json(updatedUName);
  // } catch (err) {
  //   console.error("Error inserting username", err);
  //   res.send(err);
  // }
});

app.post("/username", async (req, res) => {
  try {
    const updatedUName = await db
      .insert({ username: req.body.username })
      .into("users")
      .where({ uid: req.body.uid })
      .returning("username");
    res.json(updatedUName);
  } catch (err) {
    console.error("Error inserting username", err);
    res.send(err);
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
    console.error("Error loading clinics id!", err);
    res.sendStatus(500);
  }
});

// reviews
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await db.select().table("reviews");
    res.json(reviews);
  } catch (err) {
    console.error("Error loading reviews!", err);
    res.sendStatus(500);
  }
});

app.get("/reviews/:id", async (req, res) => {
  const targetId = req.params.id;
  try {
    const targetClinic = await db
      .select()
      .table("reviews")
      .where({ clinic_id: targetId });
    res.json(targetClinic);
  } catch (err) {
    console.error("Error loading reviews id!", err);
    res.sendStatus(500);
  }
});

// POST approved_clinics
app.post("/approved", async (req, res) => {
  let clinicId;
  try {
    try {
      clinicId = await db
        .select("id")
        .from("clinics")
        .where({ clinic_name: req.body.clinic_name });
    } catch (err) {
      console.error("Error loading reviews!", err);
      res.sendStatus(500);
    }
    const newData = await db
      .insert({ clinic_id: clinicId, user_id: req.body.uid })
      .into("approved_clinics");
    res.status(201).send.json(newData);
  } catch (err) {
    console.error("Error inserting clinic_id and user_id", err);
    res.send(err);
  }
});

// app.get("/approved", async (req, res) => {
//   try {
//     const clinics = await db.select().table("approved_clinics");
//     res.json(clinics);
//   } catch (err) {
//     console.error("Error loading clinics!", err);
//     res.sendStatus(500);
//   }
// });

// GET approved_clinics by id
app.get("/approved/:id", async (req, res) => {
  try {
    const targetClinics = await db
      .select()
      .table("approved_clinics")
      .where({ clinic_id: req.params.id });
    res.json(targetClinics);
  } catch (err) {
    console.error("Error loading clinics!", err);
    res.sendStatus(500);
  }
});

app.post("/reviews", async (req, res) => {
  return db("reviews")
    .insert({
      date: req.body.date,
      text: req.body.text,
      clinic_id: req.body.clinic_id,
      user_id: req.body.user_id,
      approved: req.body.approved,
    })
    .then(() => {
      res.status(201).send(req.body);
    })
    .catch((err) => console.log(err, "review err"));
});

app.get("/", async (req, res) => {
  try {
    res.json({
      endpoints: {
        "GET Tokyo's wards list": "/wards",
        "GET Clinic's list": "/clinics",
        "GET a clinic by id": "/clinics/:id",
      },
    });
    console.log("Succeeeeeeeeeeeeeeeeeeeeeed");
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = app;
