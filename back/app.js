const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require('./routes/route.user');

require("dotenv/config");
require("./database/connection");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', userRoutes);

module.exports = app;
