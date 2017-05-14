# How to Run the Application

## Config

In the /config/default.json file, you can change the address, port and password in order to set the right configuration.

## Requirements

You must have running all applications listed below:

* NodeJS v6.10.2;
* MongoDB v3.4.4;
* RabbitMQ v3.6.9;
* Elasticsearch v5.4.0

## Running the application

```
npm install
npm start
```

It will run the jshint and start the server with nodemon, so it restarts on every file change.

## Running tests

```
npm test
```

This is the integrated test and it uses a diferent database that are defined in the /config/test.json file.
