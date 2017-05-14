'use strict';

let PeopleRepository = require('../repository/PeopleRepository'),
  bluebird = require('bluebird');

let PeopleController = {

  save: function (request, response, next) {
    PeopleRepository.create(request.body)
      .then(function (result) {

        // Check if there is a queue defined
        if (global.peopleQueue) {

          // identify if the result is not an array
          if (Object.prototype.toString.call(result) !== '[object Array]') {
            result = [].concat(result);
          }

          // Promisify and parallelize the message enqueuing
          bluebird.all(result.map(function (item) {
            peopleQueue.publish(Object.assign({}, item));
          })).then(function (results) {
            response.status(200).json(result);
          });

        } else {

          // in the case that a queue is not defined
          response.status(200).json(result);

        }

      })
      .catch(function (err) {
        err.status = 400;
        next(err);
      });

  },

  listAll: function (request, response, next) {
    PeopleRepository.find()
      .then(function (result) {

        // return null when there is no record to return
        if (result.length == 0) {
          result = null;
        }

        response.status(200).json(result);

      }).catch(function (err) {
        err.status = 400;
        next(err);
      });
  },

  getById: function (request, response, next) {

    let _id = request.params._id;

    PeopleRepository.findOne({ _id: _id })
      .then(function (result) {

        // When the search criteria did not find a record, return 404
        if (!result) {
          let err = new Error('people not found');
          err.status = 404;
          throw err;
        }

        response.status(200).json(result);
      }).catch(function (err) {
        err.status = 400;
        next(err);
      });
  }

};

module.exports = PeopleController;
