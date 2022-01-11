const express = require("express");
const bodyParser = require("body-parser");
//const fs = require("fs");
//const path = require("path");
const app = express();
const userRoutes = require('./routes/route.user');

require("dotenv/config");
require("./database/connection");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', userRoutes);

module.exports = app;
