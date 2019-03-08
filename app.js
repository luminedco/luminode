const config = require("./config.json"),
    express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

app.listen((config.port || ))