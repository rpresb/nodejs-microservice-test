'use strict';

let mongoose = require('../config/MongooseConfig');

let PeopleSchema = mongoose.Schema({
    guid: String,
    isActive: Boolean,
    balance: String,
    picture: String,
    age: Number,
    eyeColor: String,
    name: { type: String, required: true },
    gender: String,
    company: String,
    email: { type: String, required: true },
    phone: String,
    address: String,
    about: String,
    registered: String,
    latitude: Number,
    longitude: Number,
    tags: [String]
}, { strict: "throw" });

PeopleSchema.pre('save', function (next) {
    var people = this;

    // convert string date to the same pattern
    if (people.registered) {
        people.registered = new Date(Date.parse(people.registered.replace(' ', ''))).toLocaleString();
    }

    next();
});


module.exports = PeopleSchema;
