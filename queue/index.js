'use strict';

let amqp = require('amqp'),
    config = require('config');

global.peopleQueue = require('./people');

let queue = {
    peopleExchange: undefined,
    init: function () {
        console.log('Initializing queue...');
        let connection = amqp.createConnection(config.rabbitmq);

        connection.on('error', function (e) {
            console.log("Error from amqp: ", e);
        });

        connection.on('ready', function () {

            // Create/connect the exchange
            queue.peopleExchange = connection.exchange('people.topic', config.topic);

            queue.peopleExchange.on('open', function () {
                console.log(`Exchange ${queue.peopleExchange.name} is open`);

                // Bind queue to the exchange
                peopleQueue.init(connection, 'people.topic');
            });
        });
    }
};

module.exports = queue;
