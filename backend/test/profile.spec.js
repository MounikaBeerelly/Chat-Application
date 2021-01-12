const { expect } = require('chai');
const sinon = require('sinon');
const profileService = require('../services/profilePageService');
const mongoUtil = require('../services/dbService/dbConnection');
const dbStubs = require('./dbStubs')
let findStub, updateOneStub, deleteOneStub, getdbStub;


describe('Testing Profile Service', () => {
    beforeEach(() => {
        getdbStub = sinon.stub(mongoUtil, 'getDb');
        findStub = sinon.stub(dbStubs, 'find');
        updateOneStub = sinon.stub(dbStubs, 'updateOne');
        deleteOneStub = sinon.stub(dbStubs, 'deleteOne');
        getdbStub.returns({
            collection: function () {
                return { find: dbStubs.find, updateOne: dbStubs.updateOne, deleteOne: dbStubs.deleteOne };
            }
        })
    });
    afterEach(() => {
        getdbStub.restore();
        findStub.restore();
        updateOneStub.restore();
        deleteOneStub.restore();
    });

    it('Should cover success scenario for invoke method', function (done) {
        findStub.returns(dbStubs.findSuccess);
        profileService.invoke({ query: { userName: 'dummyUserName' } }).then((userResponse) => {
            expect(userResponse).not.to.be.undefined;
            expect(userResponse.status).to.be.equal(200);
            expect(userResponse.profileInfo.firstname).to.be.equal('dummy');
            expect(userResponse.profileInfo.lastname).to.be.equal('dummy');
            expect(userResponse.profileInfo.userName).to.be.equal('dummy');
            expect(userResponse.profileInfo.password).to.be.undefined;
            done();
        }).catch((err) => {
            console.log(err)
        })
    });

    it('Should cover failure scenario for invoke method', function (done) {
        findStub.returns(dbStubs.findError);
        profileService.invoke({ query: { userName: 'dummyUserName' } }).then((userResponse) => {
            console.log(userResponse);
        }).catch((err) => {
            expect(err.status).to.be.equal(400);
            expect(err.message).to.be.equal('DB connection failed');
            done()
        })
    });

    it('Username should be invalid', function (done) {
        findStub.returns(dbStubs.findInvalid);
        profileService.invoke({ query: { userName: 'dummyUserName' } }).then((userResponse) => {
            expect(userResponse).not.to.be.undefined;
            expect(userResponse.status).to.be.equal(404);
            expect(userResponse.message).to.be.equal('Invalid username');
            done();
        }).catch((err) => {
            console.log(err)
        })
    });

    it('should cover success scenario for updateProfile', function (done) {
        findStub.returns(dbStubs.findSuccess);
        updateOneStub.yields(undefined, [])
        profileService.updateProfile({ body: { firstName: 'ddd', lastName: 'ss', userName: 'dummyUserName' } }).then((userResponse) => {
            expect(userResponse).not.to.be.undefined;
            expect(userResponse.status).to.be.equal(200);
            expect(userResponse.message).to.be.equal('Profile updated successfully');
            done();
        }).catch((err) => {
            console.log(err)
        })
    });

    it('should cover updaate failure scenario of updateprofle', function (done) {
        findStub.returns(dbStubs.findSuccess);
        updateOneStub.yields('connsction timeout', undefined)
        profileService.updateProfile({ body: { firstName: 'ddd', lastName: 'ss', userName: 'dummyUserName' } }).then((userResponse) => {

        }).catch((userResponse) => {
            expect(userResponse).not.to.be.undefined;
            expect(userResponse.status).to.be.equal(400);
            expect(userResponse.message).to.be.equal('Db error');
            done();
        })
    });


    it('should cover update invalid userName scenario of updateprofle', function (done) {
        findStub.returns(dbStubs.findInvalid);
        profileService.updateProfile({ body: { firstName: 'ddd', lastName: 'ss', userName: 'dummyUserName' } }).then((userResponse) => {
            expect(userResponse).not.to.be.undefined;
            expect(userResponse.status).to.be.equal(404);
            expect(userResponse.message).to.be.equal('Invalid userName');
            done();
        }).catch((userResponse) => {

        })
    });

    it('should cover update failure in find scenario of updateprofle', function (done) {
        findStub.returns(dbStubs.findError);
        profileService.updateProfile({ body: { firstName: 'ddd', lastName: 'ss', userName: 'dummyUserName' } }).then((userResponse) => {

        }).catch((userResponse) => {
            expect(userResponse).not.to.be.undefined;
            expect(userResponse.status).to.be.equal(400);
            expect(userResponse.message).to.be.equal('DB connection failed');
            done();
        })
    });

    it('should cover failure scenario for deleteProfile', function (done) {
        findStub.returns(dbStubs.findError);
        profileService.deleteProfile({ body: { userName: 'dummyUserName' } }).catch((err) => {
            expect(err).not.to.be.undefined;
            expect(err.status).to.be.equal(400);
            expect(err.message).to.be.equal('DB connection failed');
            done();
        })
    });

    it('Should cover success scenario for deleteProfile', function (done) {
        findStub.returns(dbStubs.findSuccess);
        deleteOneStub.yields(undefined, { firstName: 'dummy', lastName: 'dummy', userName: 'dummy' });
        profileService.deleteProfile({ body: { userName: 'dummyUserName' } }).then((userResponse) => {
            expect(userResponse).not.to.be.undefined;
            expect(userResponse.status).to.be.equal(200);
            expect(userResponse.message).to.be.equal('Profile deleted successfully');
            done();
        })
    });

    it('should cover invalid user scenario for deleteProfile', function (done) {
        findStub.returns(dbStubs.findInvalid);
        profileService.deleteProfile({ body: { userName: 'dummyUserName' } }).then((userResponse) => {
            expect(userResponse).not.to.be.undefined;
            expect(userResponse.status).to.be.equal(404);
            expect(userResponse.message).to.be.equal('Invalid userName');
            done();
        })
    });

    it('should cover failure of db delete call', function (done) {
        findStub.returns(dbStubs.findSuccess);
        deleteOneStub.yields('connection timeout', undefined);
        profileService.deleteProfile({ body: { userName: 'dummyUserName' } }).catch((err) => {
            expect(err).not.to.be.undefined;
            expect(err.status).to.be.equal(400);
            expect(err.message).to.be.equal('Db error');
            done();
        })
    })
});

