// load config
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  // method path - ip
  // eg. GET /json - ::ffff:127.0.0.1
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/echo/:word", (req, res) => {
  const { word } = req.params;
  res.json({ echo: word });
});

app.get("/name", (req, res) => {
  const { query } = req;
  res.json({ name: `${query.first} ${query.last}` });
});

const server = app.listen(process.env.PORT || 3000);

// -- DO NOT EDIT BELOW THIS LINE

module.exports = server;
