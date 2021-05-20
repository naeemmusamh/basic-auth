'use strict';

//create mongoose schema with noSQL

//require the mongoose package
const mongoose = require('mongoose');

// Create a mongoose model
const usersSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('users', usersSchema);