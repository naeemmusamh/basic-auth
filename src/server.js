'use strict';

//initialization and setup the app and packages
//express
const express = require('express');
//cors
const cors = require('cors');
//express app
const app = express();

//middleware for the error page and router
//404
const errorPath = require('./middleware/404.js');
//500
const errorhandler = require('./middleware/500.js');
//router page
const user = require('./auth/router.js');

// Use cors
app.use(cors());
// Process JSON input and output the data on req.body
app.use(express.json());
// Process FORM input and output the data on req.body
app.use(express.urlencoded({ extended: true }));


// Home Page
app.get('/', (req, res) => {
  res.status(200).send('Welcome!');
});

//route for the router page
app.use(user);


//route for the Error pages
//404
app.use(errorPath);
//500
app.use('*', errorhandler);

//prepare the app for listen for the port
module.exports = {
    server: app,
    start: (port) => {
        app.listen(port, () => {
            console.log(`Server Up on ${port}`);
        });
    },
};