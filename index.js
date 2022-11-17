"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
var cors = require('cors')
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: "localhost",
  database: "bank",
  user: "root",
  password: "211101",
});

app.get("/api/login", function (req, res) {
  console.log("estem a login");

  connection.connect(function (err) {
    console.log(err);
    if (err) {
      console.log("Error connecting: " + err.stack);
      return;
    }
    console.log("Connexte as id " + connection.threadId);
  });

  connection.query("SELECT * FROM customers", function (error, results, field) {
    if (error) {
      res.status(400).send(null);
    } else {
      res.status(200).send( JSON.stringify(results));
    }
  });

  connection.end();
});
app.listen(3000, () =>
  console.log(
    "Aquesta es la nostra API-REST que corre en http://localhost:3000"
  )
);

