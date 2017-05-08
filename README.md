# NodeJS microservices Proof-Of-Concept (PoC)

The goal of this test is to apply some basic concepts of a microservice architecture using NodeJS stack.

## PoC Goal requirements

Build a REST API that works with a resource called "people" and supports the following operations:
* POST /people
* GET /people
* GET /people/:id

As a data store the API must use a NoSQL database as a main datastore and an Elasticsearch instance for search support. As a maind db you are free to choose anyone you are comfortable to work with. 

Before you start to work, it is strongly recommended to fork this repo. You are going to need that in order to send your code for analysis.

## Stack details
* NodeJS (choos any version);
* NPM packages (feel free to use those you like more);
* NoSQL database (just pick anyone);
* A message broker (RabbitMQ, ActiveMQ, ZeroMQ)
* Elasticsearch

## Application Architecture specifics

You are free to organize your project the way you like it and use the packages you want as soon as it attends the goals implementing exactly what we are describing on this doc.

### PEOPLE resource

The people resource is a JSON document because the entire API must support JSON. It contains exactly the same properties as the example below:
```
  {
    "guid": "b55ee146-217b-4696-b9ef-b61581dad7ef",
    "isActive": true,
    "balance": "$1,741.85",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "brown",
    "name": "Ruth Carney",
    "gender": "female",
    "company": "GYNK",
    "email": "ruthcarney@gynk.com",
    "phone": "+1 (925) 519-3849",
    "address": "715 Bayard Street, Roeville, Washington, 1836",
    "about": "Ullamco minim occaecat mollit ea incididunt commodo proident enim sit cillum quis. Aute proident officia labore irure. Esse id excepteur magna quis eu amet magna tempor duis laboris pariatur ad. Laborum ullamco consequat dolore aliquip laboris laborum occaecat nostrud anim enim ullamco labore irure voluptate. Nulla et deserunt quis amet voluptate anim irure.\r\n",
    "registered": "2016-01-25T12:53:26 +02:00",
    "latitude": 19.199843,
    "longitude": 129.606578,
    "tags": [
      "minim",
      "exercitation",
      "dolor",
      "magna",
      "cillum",
      "id",
      "ut"
    ]
  }
```

When creating documents you may have missing information, but you can't have properties that don't respect the schema above.

### POST /people

Creates one or more resources. One if receiving an object or many if receiving an array. When post data to this API the application the expectation is:
* application is going to validate the body payload and reply with errors when they do not respect the data schema;
* the data sent to the endpoint is going to be inserted into a mongodb collection;
* the inserted documents (with the generated IDs) must be queued in a AMQP message broker (like RabbitMQ, ActiveMQ, Kafka);
* the api returns HTTP 200 if having success;
* the api returns HTTP 400 if payload doesn't match with the schema;
* the api returns HTTP 500 in case of unexpected error.

### GET /people

Returns all people documents. When sending a GET request to this endpoint:
* the api returns all documents of people collection
* the api returns null if database is empty
* the api returns HTTP 200 if having success;
* the api returns HTTP 500 in case of unexpected error.

### GET /people/:id

Returns a single document by id. When sending a GET request to this endpoint:
* the api returns a single document matching with the id passed on the uri;
* the api returns HTTP 200 if having success;
* the api returns HTTP 404 if no document is found;
* the api returns HTTP 500 in case of unexpected error.

## Things you can't do when building your application
* We don't want additional features. Plese, stay focused on what is being requested;
* If you are not able to implement all features, please implement what you can. Few features with quality are more valuable than all features with failures.
* We want a human readable code. No need to have a full documentation, but some comments and clear coding are good practices;

## Thing we would love to find in your project (aka - plus features)
* Some ES6;
* The expected node version specified at some place (package.json, .nvmrc file);
* Some unit or functional test (but only if you have time);
* Some lint check to show use you are worried with standards;
* App running inside a docker container OR a docker-compose file containing the dependencies to run it.

## Releasing your PoC
* This task should not take more than 3 days (but in case of issues or taking more time than usual, send that adding your comments about what happened);
* The release is simple. You just need to submit a PULL REQUEST (PR) to this repo with your changes and add a comment telling us you are done;
* Some comments may be added to your PR. Please stay tuned to reply them as needed.

## FAQ

In case of any question you need to open a Github issue on this repo with the label "question".
