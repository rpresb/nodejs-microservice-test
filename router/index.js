'use strict';

let router = require('express').Router();

router.get('/', function (request, response, next) {
    response.send('PONG');
});

router.use('/people', require('./people'));

module.exports = router;
