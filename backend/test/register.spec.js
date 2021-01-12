const { expect } = require('chai');
const sinon = require('sinon');
const registrationService = require('../services/registrationService');
const mongoUtil = require('../services/dbService/dbConnection');
const dbStubs = require('./dbStubs');
let findStub, getdbStub, insertStub;

describe('Testing Registration service', () => {
    beforeEach(() => {
        getdbStub = sinon.stub(mongoUtil, 'getDb');
        findStub = sinon.stub(dbStubs, 'find');
        insertStub = sinon.stub(dbStubs, 'insert');
        getdbStub.returns({
            collection: function () {
                return { find: dbStubs.find, insert: dbStubs.insert };
            }
        })
    });
    afterEach(() => {
        getdbStub.restore();
        findStub.restore();
        insertStub.restore();
    });

    it('should cover success scenario for invoke method', function (done) {
        let registrationData = {
            'firstName': 'dummy',
            'lastName': 'dummy',
            'userName': 'dummy',
            'password': 'dummy'
        }
        findStub.returns(dbStubs.findInvalid);
        insertStub.yields(undefined, { firstName: 'dummy', lastName: 'dummy', userName: 'dummy' });
        registrationService.invoke({ body: registrationData }).then((userResponse) => {
            expect(userResponse).not.to.be.undefined;
            expect(userResponse.status).to.be.equal(200);
            expect(userResponse.message).to.be.equal('Signup successfully');
            done();
        });
    });

    it('should cover failure scenario for invoke method', function (done) {
        findStub.returns(dbStubs.findError);
        registrationService.invoke({ body: { firstName: 'dummy', lastName: 'dummy', userName: 'dummy', password: 'dummy' } }).catch((err) => {
            expect(err).not.to.be.undefined;
            expect(err.status).to.be.equal(400);
            expect(err.message).to.be.equal('Registration unsuccessfull');
            done();
        })
    });
    it('should cover failure scenario for invalid userName', function (done) {
        let registrationData = {
            'firstName': 'dummy',
            'lastName': 'dummy',
            'userName': 'dummy',
            'password': 'dummy'
        }
        findStub.returns(dbStubs.findSuccess);
        registrationService.invoke({ body: registrationData }).catch((err) => {
            expect(err).not.to.be.undefined;
            expect(err.status).to.be.equal(400);
            expect(err.message).to.be.equal('Username already taken, Please try with different userName');
            done();
        });
    });

    it('should get error while inserting data', function (done) {
        let registrationData = {
            'firstName': 'dummy',
            'lastName': 'dummy',
            'userName': 'dummy',
            'password': 'dummy'
        }
        findStub.returns(dbStubs.findInvalid);
        insertStub.yields('registration unsuccessfull', undefined);
        registrationService.invoke({ body: registrationData }).catch((err) => {
            expect(err).not.to.be.undefined;
            expect(err.status).to.be.equal(400);
            expect(err.message).to.be.equal('Registration unsuccessfull');
            done();
        });
    });
});
