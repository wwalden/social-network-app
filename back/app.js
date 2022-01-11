const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

require('dotenv/config'); 

const app = express();

const userRoutes = require('./routes/route.user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/auth', userRoutes);

module.exports = app;
