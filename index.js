'use strict';

//initialization and setup the app and package
//dotenv
require('dotenv').config();
//mongoose
const mongoose = require('mongoose');
//express
const express = require('express');
const app = express();
//require the server file
const server = require('./src/server.js');
//base the .env file
//PORT
const PORT = process.env.PORT || 3030;
//MONGODB-URL
const MONGODB_URL = process.env.MONGODB_URL;
//start the server running
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => {
    app.listen(PORT, () => console.log('server up'));
}).catch(error =>
    console.error('Could not start server', error.message));