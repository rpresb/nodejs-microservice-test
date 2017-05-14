'use strict';

let amqp = require('amqp'),
    elastic = require('../search/elasticsearch');

let peopleQueue = {
    init: function (connection, exchange) {

        // Connect queue
        peopleQueue.queue = connection.queue('people.added', function (queue) {
            console.log(`Queue ${queue.name} is open`);

            // Bind queue to the exchange
            queue.bind(exchange, '*', function () {
                console.log(`Queue ${queue.name} is binded to exchange ${exchange}`);
            });

            // Start consumer
            queue.subscribe(function (message) {

                // Index document in the search engine
                elastic.addDocument('people', message.content ? message.content.toString() : message);
            });
        });
    },

    publish: function (message) {
        
        // Publish document to exchange
        queue.peopleExchange.publish('new', message, { contentType: 'application/json' }, function () {
            console.log('Message published to exchange');
        });
        
    }
};

module.exports = peopleQueue;
