const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const userRoutes = require('./routes/route.user');
const messRoutes = require('./routes/route.mess');


require("dotenv/config");
require("./database/connection");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', userRoutes);
app.use('/api/mess', messRoutes);

module.exports = app;
