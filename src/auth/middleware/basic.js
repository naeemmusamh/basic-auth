'use strict';

//authentication for the sign in user new account

//initialization and setup the app and package
//base-64
const base64 = require('base-64');
//bcrypt
const bcrypt = require('bcrypt');
//middleware for schema database
const Users = require('../models/users-model.js');

module.exports = async(request, response, next) => {

    let basicHeaderParts = req.headers.authorization.split(' '); // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop(); // sdkjdsljd=
    let decodedString = base64.decode(encodedString); // "username:password"
    let [username, password] = decodedString.split(':'); // username, password

    try {
        const user = await Users.findOne({ username: username })
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            res.status(200).json(user);
        } else {
            throw new Error('Invalid User')
        }
    } catch (error) {
        res.status(403).send("Invalid Login");
    }
};