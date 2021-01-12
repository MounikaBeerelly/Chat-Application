const { expect } = require('chai');
const sinon = require('sinon');
const loginService = require('../services/loginService');
const mongoUtil = require('../services/dbService/dbConnection');
const jwt = require('jsonwebtoken');
const dbStubs = require('./dbStubs');
const bcrypt = require('bcryptjs');
let findStub, getdbStub, bcryptStub;
global.JWT_ALGO = 'RS256';

describe('Testcases for Login service', () => {
    beforeEach(() => {
        getdbStub = sinon.stub(mongoUtil, 'getDb');
        findStub = sinon.stub(dbStubs, 'find');
        bcryptStub = sinon.stub(bcrypt, 'compareSync');
        bcryptStub.returns(true);
        getdbStub.returns({
            collection: function () {
                return { find: dbStubs.find };
            }
        })
    });
    afterEach(() => {
        findStub.restore();
        getdbStub.restore();
        bcryptStub.restore();
    });

    it('Should cover success scenario for invoke method', function (done) {
        findStub.returns(dbStubs.findSuccess);
        loginService.invoke({ body: { userName: 'dummy', password: 'dummy' } }).then((userResponse) => {
            expect(userResponse).not.to.be.undefined;
            expect(userResponse.status).to.be.equal(200);
            expect(userResponse.message).to.be.equal('login success');
            done()
        }).catch((err) => {
            console.log(err)
        })
    });

    it('should cover failure scenario for invoke method', function (done) {
        let jwtStub = sinon.stub(jwt, 'sign');
        jwtStub.throws('Jwt sign failed');
        findStub.returns(dbStubs.findSuccess);
        loginService.invoke({ body: { userName: 'dummy', password: 'dummy' } }).catch((err) => {
            expect(err).not.to.be.undefined;
            expect(err.name).to.be.equal('Jwt sign failed');
            done();
        })
    });

    it('Should get error from db', function (done) {
        findStub.returns(dbStubs.findError);
        loginService.invoke({ body: { userName: 'dummy', password: 'dummy' } }).catch((err) => {
            expect(err).not.to.be.undefined;
            expect(err).to.be.equal('Connection timedout');
            done();
        })
    });

    it('Should get invalid username', function (done) {
        findStub.returns(dbStubs.findInvalid);
        loginService.invoke({ body: { userName: 'dummy', password: 'dummy' } }).then((err) => {
            expect(err).not.to.be.undefined;
            expect(err.message).to.be.equal('Invalid userName or password');
            expect(err.status).to.be.equal(400);
            done();
        })
    })
})