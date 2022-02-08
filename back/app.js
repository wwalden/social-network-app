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
app.use(cors({ // CONFIG ++ ?
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],   // AJOUTER LES AUTRES METHODES !!
  credentials: true
}));

app.use(
  session({
    key: "userId",
    secret: `${process.env.TOKEN_KEY}`, // A METTRE A JOUR !!
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
      httpOnly: false
    }
  })
);


/*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
*/


app.use('/api/auth', userRoutes);
app.use('/api/mess', messRoutes);

module.exports = app;
