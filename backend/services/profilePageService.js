var mongoUtil = require('./dbService/dbConnection');

function invoke(req) {
    return new Promise((resolve, reject) => {
        const db = mongoUtil.getDb();
        db.collection('users').find({ userName: req.query.userName }).toArray(function (err, docs) {
            if (err) {
                reject({ status: 400, message: 'DB connection failed' });
            } else {
                if (!!docs && docs.length > 0) {
                    delete docs[0].password
                    resolve({ status: 200, profileInfo: docs[0] });
                } else {
                    resolve({ status: 404, message: 'Invalid username' });
                }
            }
        });
    });
}

function updateProfile(req) {
    return new Promise((resolve, reject) => {
        const db = mongoUtil.getDb();
        const updateObj = {};
        if (!!req.body.firstName) {
            updateObj.firstName = req.body.firstName
        }
        if (!!req.body.lastName) {
            updateObj.lastName = req.body.lastName
        }

        db.collection('users').find({ userName: req.body.userName }).toArray(function (err, docs) {
            if (err) {
                reject({ status: 400, message: 'DB connection failed' });
            } else {
                if (!!docs && docs.length > 0) {
                    db.collection('users').updateOne({ userName: req.body.userName }, { $set: updateObj }, function (err, dbResponse) {
                        if (err) {
                            reject({ status: 400, message: 'Db error' });
                        }
                        else {
                            resolve({ status: 200, message: 'Profile updated successfully' })
                        }
                    })
                } else {
                    resolve({ status: 404, message: 'Invalid userName' });
                }
            }
        })
    })
}

function deleteProfile(req) {
    return new Promise((resolve, reject) => {
        const db = mongoUtil.getDb();

        db.collection('users').find({ userName: req.body.userName }).toArray(function (err, docs) {
            if (err) {
                reject({ status: 400, message: 'DB connection failed' });
            } else {
                if (!!docs && docs.length > 0) {
                    db.collection('users').deleteOne({ userName: req.body.userName }, function (err, dbResponse) {
                        if (err) {
                            reject({ status: 400, message: 'Db error' });
                        }
                        else {
                            resolve({ status: 200, message: 'Profile deleted successfully' })
                        }
                    })
                } else {
                    resolve({ status: 404, message: 'Invalid userName' });
                }
            }
        })
    })
}

module.exports = { invoke, updateProfile, deleteProfile }