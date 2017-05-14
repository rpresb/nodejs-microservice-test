'use strict';

let mongoose = require('mongoose'),
    config = require('config');

function _connection(vars) {
    let username = vars.MONGO_USERNAME || config.get('mongo.username'),
        password = vars.MONGO_PASSWORD || config.get('mongo.password'),
        host = vars.MONGO_HOST || config.get('mongo.host'),
        port = vars.MONGO_PORT || config.get('mongo.port'),
        database = vars.MONGO_DATABASE || config.get('mongo.database'),
        auth = username ? username + ':' + password + '@' : '';

    return 'mongodb://' + auth + host + ':' + port + '/' + database;
}

mongoose.Promise = require('bluebird');
mongoose.connect(_connection(process.env));
//mongoose.set('debug', true);

let db = mongoose.connection;

db.on('error', function (err) {
    //console.log(err);
});

db.once('open', function (callback) {
    //console.log('connected to mongodb');
});

module.exports = mongoose;
