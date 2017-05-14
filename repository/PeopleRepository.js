'use strict';

let mongoose = require('../config/MongooseConfig'),
    schema = require('../schema/PeopleSchema');

let PeopleRepository  = mongoose.model('People', schema);

module.exports = PeopleRepository;
