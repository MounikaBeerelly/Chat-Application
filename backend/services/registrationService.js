var mongoUtil = require('./dbService/dbConnection');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

function invoke(req) {
    return new Promise((resolve, reject) => {
        let registrationData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: bcrypt.hashSync(req.body.password, salt)
        }
        const db = mongoUtil.getDb();
        db.collection('users').find({ userName: req.body.userName }).toArray(function (err, docs) {
            if (err) {
                reject({ status: 400, message: 'Registration unsuccessfull' });
            } else {
                if (!!docs && Array.isArray(docs) && docs.length > 0) {
                    reject({ status: 400, message: 'Username already taken, Please try with different userName' });
                } else {
                    db.collection('users').insert(registrationData, (err, dbResponse) => {
                        if (err) {
                            reject({ status: 400, message: 'Registration unsuccessfull' });
                        } else {
                            resolve({ status: 200, message: 'Signup successfully' });
                        }
                    });
                }
            }
        })
    })
}

module.exports = { invoke }