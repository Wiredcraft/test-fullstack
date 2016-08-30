var supertest = require("supertest");
var should = require("should");
var httpStatus = require('http-status-codes');
var config = require('../config/main')

var request = supertest.agent(config.host);
var randomNumber = Math.floor(Math.random() * 1000) + 1000;
var token;
var talkId;

describe("/user API", function () {
    it("should able to register", function (done) {
        request
            .post("/user")
            .send({ username: 'user' + randomNumber, password: 'pass' + randomNumber })
            .expect("Content-type", /json/)
            .expect(httpStatus.CREATED, done);
    });

    it("should not able to register with existing username", function (done) {
        request
            .post("/user")
            .send({ username: 'user' + randomNumber, password: 'pass' + randomNumber })
            .expect("Content-type", /json/)
            .expect(httpStatus.UNPROCESSABLE_ENTITY, done);
    });

    it("should not able to register with missing fields", function (done) {
        request
            .post("/user")
            .send({ username: 'user' + randomNumber })
            .expect("Content-type", /json/)
            .expect(httpStatus.BAD_REQUEST, done);
    });
});

describe("/session API", function () {
    it("should able to login", function (done) {
        request
            .post("/session")
            .send({ username: 'user' + randomNumber, password: 'pass' + randomNumber })
            .expect("Content-type", /json/)
            .expect(httpStatus.OK)
            .end(function (err, res) {
                token = res.body.token;
                done();
            });
    });

    it("should not able to login with non-existing username", function (done) {
        request
            .post("/session")
            .send({ username: 'nouser' + randomNumber, password: 'pass' + randomNumber })
            .expect("Content-type", /json/)
            .expect(httpStatus.UNPROCESSABLE_ENTITY, done);
    });

    it("should not able to login with wrong password", function (done) {
        request
            .post("/session")
            .send({ username: 'nouser' + randomNumber, password: 'nopass' + randomNumber })
            .expect("Content-type", /json/)
            .expect(httpStatus.UNPROCESSABLE_ENTITY, done);
    });

    it("should not able to login with missing fields", function (done) {
        request
            .post("/session")
            .send({ username: 'user' + randomNumber })
            .expect("Content-type", /json/)
            .expect(httpStatus.BAD_REQUEST, done);
    });
});

describe("/talk API", function () {
    // Talk read, create
    it("should able to create a talk", function (done) {
        request
            .post("/talk")
            .set('Authorization', token)
            .send({ title: "title" + randomNumber, description: "description" + randomNumber })
            .expect("Content-type", /json/)
            .expect(httpStatus.CREATED)
            .end(function (err, res) {
                talkId = res.body._id;
                done();
            });
    });

    it("should able to get talks", function (done) {
        request
            .get("/talk")
            .set('Authorization', token)
            .expect("Content-type", /json/)
            .expect(httpStatus.OK, done);
    });

    it("should not able to create a talk with missing fields", function (done) {
        request
            .post("/talk")
            .set('Authorization', token)
            .send({ title: "title" + randomNumber })
            .expect("Content-type", /json/)
            .expect(httpStatus.BAD_REQUEST, done);
    });

    // Talk Rating
    it("should able to rate a talk", function (done) {
        request
            .post("/talk/" + talkId + '/rating')
            .set('Authorization', token)
            .send({ rating: 1 })
            .expect("Content-type", /json/)
            .expect(httpStatus.CREATED, done);
    });

    it("should not able to rate a talk if rated before", function (done) {
        request
            .post("/talk/" + talkId + '/rating')
            .set('Authorization', token)
            .send({ rating: 1 })
            .expect("Content-type", /json/)
            .expect(httpStatus.UNPROCESSABLE_ENTITY, done);
    });

    it("should not able to rate a talk with missing fields", function (done) {
        request
            .post("/talk/" + talkId + '/rating')
            .set('Authorization', token)
            .send({})
            .expect("Content-type", /json/)
            .expect(httpStatus.BAD_REQUEST, done);
    });

    // Missing authorization
    it("should not able to get talks without authorization header", function (done) {
        request
            .get("/talk")
            .expect(httpStatus.UNAUTHORIZED, done);
    });

    it("should not able to create a talk without authorization header", function (done) {
        request
            .post("/talk")
            .send({ title: "title" + randomNumber, description: "description" + randomNumber })
            .expect(httpStatus.UNAUTHORIZED, done);
    });

    it("should not able to rate a talk without authorization header", function (done) {
        request
            .post("/talk/" + talkId + '/rating')
            .send({})
            .expect(httpStatus.UNAUTHORIZED, done);
    });
});