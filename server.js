const express = require("express");
const sqlite = require("sqlite3").verbose();
const dbPath = "./db/dua_main.sqlite";
const cors = require("cors");
const app = express();

app.use(cors());

//db connection
const db = new sqlite.Database(dbPath, sqlite.OPEN_READONLY, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("connected to db sqlite");
  }
});

//category
let category = [];

db.all("SELECT * from category", (err, rows) => {
  if (err) {
    console.log(err.message);
  } else {
    category = rows;
  }
});

//sub category

let dua = [];
dua = db.all("SELECT * from dua", (err, rows) => {
  if (err) {
    console.log(err.message);
  } else {
    dua = rows;
  }
});

//sub category

let subCategory = [];
subCategory = db.all("SELECT * from sub_category", (err, rows) => {
  if (err) {
    console.log(err.message);
  } else {
    subCategory = rows;
  }
});

app.get("/category", (req, res) => {
  res.json(category);
});
app.get("/dua", (req, res) => {
  res.json(dua);
});
app.get("/subcategory", (req, res) => {
  res.json(subCategory);
});

app.listen(4000, () => console.log("server in on"));
