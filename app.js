const express = require("express");
const path = require("path");
const db = require("./knex.js");
const cors = require("cors");
const knex = require("knex");
const { resourceLimits } = require("worker_threads");

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
  // console.log(req.params.uid);
  try {
    const username = await db("users").where("uid", req.params.uid);
    // console.log(username);
    res.json(username);
  } catch (err) {
    console.error("Error getting username uid", err);
    res.send(err);
  }
});

app.post("/signup", async (req, res) => {
  // console.log(req.body.uid, "uid");
  return db("users")
    .insert({ uid: req.body.uid })
    .then(() => {
      res.status(201).send(req.body.uid);
    });
});

app.put("/username", async (req, res) => {
  // console.log(req.body.username, req.body.uid);
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
    const targetClinic = await db("reviews")
      .select(
        "users.user_name",
        "reviews.text",
        "reviews.date",
        "reviews.approved"
      )
      .leftJoin("users", "reviews.user_id", "users.uid")
      .where({ clinic_id: targetId })
      .orderBy("reviews.date", "desc");
    res.json(targetClinic);
  } catch (err) {
    console.error("Error loading reviews id!", err);
    res.sendStatus(500);
  }
});

// POST approved_clinics
app.post("/approved", async (req, res) => {
  let clinicId; // [ { id: 8 } ]が代入されることを想定
  try {
    try {
      clinicId = await db
        .select("id")
        .from("clinics")
        .where({ clinic_name: req.body.clinic_name });
      // console.log(clinicId);
    } catch (err) {
      console.error("Error loading reviews!", err);
      res.sendStatus(500);
    }
    const newData = await db
      .insert({
        clinic_id: clinicId[0].id,
        user_id: req.body.uid,
        photo_uri: req.body.photo_uri,
      })
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

app.get("/approvedclinics/:uid", async (req, res) => {
  try {
    const approvedClinics = await db("approved_clinics")
      .join("clinics", "approved_clinics.clinic_id", "clinics.id")
      .select("clinics.clinic_name", "clinics.id")
      .where({ "approved_clinics.user_id": req.params.uid });
    res.json(approvedClinics);
  } catch (err) {
    console.error("Error loading approved clinics!", err);
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

// GET saved clinics
app.get("/saved/:uid", async (req, res) => {
  try {
    const savedList = await db("saved")
      .select(
        "clinics.clinic_name",
        "clinics.image",
        "clinics.tokyo_ward_id",
        "clinics.doctor",
        "clinics.id"
      )
      .rightJoin("clinics", "clinics.id", "saved.clinic_id")
      .where({ user_id: req.params.uid });
    res.json(savedList);
  } catch (err) {
    console.error("Error loading saved!", err);
    res.sendStatus(500);
  }
});

// POST a clinic to save
app.post("/saved", async (req, res) => {
  try {
    const newData = await db
      .insert({ clinic_id: req.body.clinic_id, user_id: req.body.uid })
      .into("saved");
    res.status(201).send.json(newData);
  } catch (err) {
    console.error("Error inserting clinic_id and user_id", err);
    res.send(err);
  }
});

// DELETE a clinic to unsave
app.delete("/saved", async (req, res) => {
  try {
    await db("saved")
      .where({ user_id: req.body.uid, clinic_id: req.body.clinic_id })
      .del();
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// GET distinct types from treatments table
app.get("/types", async (req, res) => {
  try {
    const allTypes = await db("treatments").distinct("type");
    res.json(allTypes);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// GET types from treatments by ids
// req.params.ids は { ids : [1, 2...]} な形
// {1 :  [ "生理痛", "PMS" ], 2 : ["性感染症", "避妊"]}的なものが返る
app.get("/types/ids", async (req, res) => {
  const ids = req.query.ids.map((e) => Number(e));
  const obj = {};
  try {
    const allTypes = await db("treatments").select().whereIn("clinic_id", ids);
    for (const item of allTypes) {
      let key = item.clinic_id;
      if (obj.hasOwnProperty(`${key}`)) {
        obj[key].push(item.type);
      } else {
        const arr = [];
        arr.push(item.type);
        obj[key] = arr;
      }
    }
    console.log(allTypes);
    res.json(obj);
  } catch (err) {
    console.error(err, "ids");
    res.sendStatus(500);
  }
});

// GET clinic_id from treatments table
app.get("/searched-clinics", async (req, res) => {
  let clinicAndTypes;
  let input = req.query;

  for (const key in req.query) {
    if (key === "ward") {
      input[key] = Number(input[key]);
    } else if (input[key] === "true") {
      input[key] = true;
    } else {
      input[key] = false;
    }
  }
  console.log("2", input);
  const result = [];
  const selectedTypes = [];
  const isAllIncludes = (arr, target) => arr.every((el) => target.includes(el));
  for (const key in input) {
    if (key !== "ward" && key !== "女医" && input[key] === true) {
      selectedTypes.push(key);
    }
  }
  // console.log("selectedTypes:::::::::", selectedTypes);

  try {
    if (input.女医) {
      // 女医true
      clinicAndTypes = await db("clinics")
        .join("treatments", "clinics.id", "treatments.clinic_id")
        .select({
          clinic_id: "treatments.clinic_id",
          types: db.raw("array_agg(treatments.type)"),
        })
        .groupBy("clinic_id")
        .where({
          "clinics.tokyo_ward_id": input.ward,
          "clinics.doctor": input.女医,
        });
      // console.log(clinicAndTypes);
    } else {
      // 女医false
      clinicAndTypes = await db("clinics")
        .join("treatments", "clinics.id", "treatments.clinic_id")
        .select({
          clinic_id: "treatments.clinic_id",
          types: db.raw("array_agg(treatments.type)"),
        })
        .groupBy("clinic_id")
        .where({
          "clinics.tokyo_ward_id": input.ward,
        });
      // console.log(clinicAndTypes);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }

  for (const clinicObj of clinicAndTypes) {
    if (isAllIncludes(selectedTypes, clinicObj.types)) {
      result.push(clinicObj.clinic_id);
    }
  }

  // console.log("result:::::::::::::", result);
  // res.json({ clinicIds: result });
  // 戻り値の形 女医true　{"clinicIds":[1,4,5,7,8]}
  // 戻り値の形 女医false　{"clinicIds":[1,2,4,5,7,8,9,11]}
  try {
    const clinics = await db("clinics").select().whereIn("id", result);
    res.json(clinics);
  } catch (err) {
    console.error("Error getting searched clinics", err);
    res.sendStatus(500);
  }
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
