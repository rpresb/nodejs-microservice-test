'use strict';

let router = require('express').Router(),
    controller = require('../controller/PeopleController');

router.get('/', controller.listAll);
router.get('/:_id', controller.getById);
router.post('/', controller.save);

module.exports = router;
