'use strict';

//initialization and setup the app and package
//expression
const express = require('express');
//bcrypt
const bcrypt = require('bcrypt');
//middleware for the page
//1.schema file
const UsersModule = require('./models/users-model.js');
//2.base-64 encoded
const basicUser = require('./middleware/basic.js');
//3.Router
const router = express.Router();


//router for the sign up page
// Signup Route -- create a new user
router.post('/signup', async(request, response) => {
    try {

        request.body.password = await bcrypt.hash(request.body.password, 10);
        const user = new UsersModule(request.body);
        const record = await user.save(request.body);
        response.status(200).json(record);
    } catch (e) {
        response.status(403).send("Error Creating User");
    }
});

//router for the sign in page
// Signin Route -- login with username and password
router.post('/signin', basicUser, (request, response) => {
    let data = request.userdata;
    response.status(200).json({ user: data });
});

module.exports = router;