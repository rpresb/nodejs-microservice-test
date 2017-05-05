# NodeJS microservices PoC

The goal of this test is to apply some basic concepts of a microservice architecture using NodeJS stack.

## PoC Goal

Build a REST API that works with a resource called "people" and supports the following operations:
* POST /people
* GET /people
* GET /people/<id>
* GET /people/_search

As a data store the API must use MongoDB as a main datastore and an Elasticsearch instance for search support.
You are free to choose the NPM packages you'd like to use to build this application.

Before you start to work, it is strongly recommended to fork this repo. You are going to need that in order to send your code for analysis.

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

Creates one or more resources. Onf if receiving an object or many if receiving an array. When post data to this API the application the expectation is:
* application is going to validate the body payload and reply with errors when they do not respect the data schema;
* the data sent to the endpoint is going to be inserted into a mongodb collection.
* the inserted documents (with the generated IDs) must be queued in a AMQP message broker (like RabbitMQ, ActiveMQ, Kafka);



## Things you can't do when building your application

## Thing we would love to find in your project

## Releasing your PoC
* You need

## FAQ

In case of any question you need to open a Github issue on this repo with the label "question".
