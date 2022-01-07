const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config'); 

const app = express();

const userRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/auth', userRoutes);

module.exports = app;
