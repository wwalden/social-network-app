const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session")
const cors = require('cors');

const app = express();
const userRoutes = require('./routes/route.user');
const messRoutes = require('./routes/route.mess');

require("dotenv/config");
require("./database/connection");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true
}));

app.use(
  session({
    key: "userId",
    secret: `${process.env.TOKEN_KEY}`,
    resave: false,
    cookie: { maxAge: 1 },
    saveUninitialized: false,
  })
);

app.use('/api/auth', userRoutes);
app.use('/api/mess', messRoutes);

module.exports = app;
