'use strict';

//make the app 1.running
//2.handle all the router
//3.middleware for the all app

//initialization and setup the app and packages
//express
const express = require('express');
//app listen
const app = express();
// Process JSON input and output the data on req.body
app.use(express.json());
// Process FORM input and output the data on req.body
app.use(express.urlencoded({ extended: true }));

//middleware for the error page and router
//404
const errorPath = require('./middleware/404.js');
//500
const errorhandler = require('./middleware/500.js');
//router page
const user = require('./auth/router.js');

//route for the router page
app.use(user);

//router for the home page
app.get('/', (request, response) => {
    response.status(200).send('im the home page');
});

//router for the wrong path
app.get('/wrong-path', (request, response) => {
    throw new Error('there is wrong in the path');
});

//route for the Error pages
//404
app.use(errorPath);
//500
app.use('*', errorhandler);


module.exports = {
    app:app,
    start:port=> {
        app.listen(port,()=> {
            console.log('im listen for the port');
        });
    }
}