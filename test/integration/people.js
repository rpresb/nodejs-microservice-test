'use strict';

process.env.NODE_ENV = 'test';

let assert = require('chai').assert,
    request = require('supertest-as-promised'),
    app = require('../../app'),
    PeopleRepository = require('../../repository/PeopleRepository.js');

var _id = "";

describe('People Controller', () => {
    before(() => {
        PeopleRepository.collection.drop();
    });

    it('should return null when there is no data', () => {
        return request(app)
            .get('/people')
            .expect(200)
            .then((data) => {
                assert.isNull(data.body);
            });
    });

    it('should register a new people', () => {
        return request(app)
            .post('/people')
            .send({
                name: "User Test " + Math.floor(Date.now() / 1000),
                email: 'integration_test_' + Math.floor(Date.now() / 1000) + '@test.com'
            })
            .expect(200)
            .then((data) => {
                _id = data.body._id
            });
    });

    it('should return a single people', () => {
        request(app)
            .get(`/people/${_id}`)
            .expect(200)
            .then((data) => {
                assert.equal(_id, data.body._id);
            });
    });

    it('should return bad request when an invalid field is specified', () => {
        return request(app)
            .post('/people')
            .send({
                name: "User Test " + Math.floor(Date.now() / 1000),
                email: 'integration_test_' + Math.floor(Date.now() / 1000) + '@test.com',
                notInSchema: true
            })
            .expect(400);
    });

    it('should return all people', () => {
        PeopleRepository.create([
            {
                name: "User Test " + Math.floor(Date.now() / 1000),
                email: 'integration_test_' + Math.floor(Date.now() / 1000) + '@test.com'
            },
            {
                name: "User Test " + Math.floor(Date.now() / 1000),
                email: 'integration_test_' + Math.floor(Date.now() / 1000) + '@test.com'
            }
        ], function (err, res) {
            return request(app)
                .get('/people')
                .expect(200)
                .then((data) => {
                    assert.equal(2, data.body.length);
                });
        });
    });
});
