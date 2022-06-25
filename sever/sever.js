const express = require("express");

const app = express();

const bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.static("public"));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require("./api/routes"); //importing route
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("RESTful API server started on: " + port);
