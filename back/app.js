const express = require('express');
require('dotenv/config'); 

const app = express();

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

module.exports = app;
