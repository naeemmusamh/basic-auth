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
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
router.post('/signup', async(request, response) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = new Users(req.body);
        const record = await user.save(req.body);
        res.status(200).json(record);
    } catch (e) { res.status(403).send("Error Creating User"); }
});

//router for the sign in page
// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', async(request, response) => {
    try {
        const user = await Users.findOne({ username: username })
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            res.status(200).json(user);
        } else {
            throw new Error('Invalid User')
        }
    } catch (error) { res.status(403).send("Invalid Login"); }
});

module.exports = router;