var mongoUtil = require('./dbService/dbConnection');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const logger = require('./loggerService');

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
                logger.error(req.body.transID + ' :- Received error from db call: ' + JSON.stringify(err.stack));
                reject({ status: 400, message: 'Registration unsuccessfull' });
            } else {
                if (!!docs && Array.isArray(docs) && docs.length > 0) {
                    logger.error(req.body.transID + ' :- giving userName was already taken: ' + JSON.stringify(err.stack));
                    reject({ status: 400, message: 'Username already taken, Please try with different userName' });
                } else {
                    db.collection('users').insert(registrationData, (err, dbResponse) => {
                        if (err) {
                            logger.error(req.body.transID + ' :- Received error from db while inserting data: ' + JSON.stringify(err.stack));
                            reject({ status: 400, message: 'Registration unsuccessfull' });
                        } else {
                            logger.debug(req.body.transID + ':- Registration successfull');
                            resolve({ status: 200, message: 'Signup successfully' });
                        }
                    });
                }
            }
        })
    })
}

module.exports = { invoke }