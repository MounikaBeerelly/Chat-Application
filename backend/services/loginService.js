const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var mongoUtil = require('./dbService/dbConnection');
const jwtService = require('./jwtService');
const logger = require('../services/loggerService');

function invoke(req) {
    console.log('process ID: ', process.pid)
    return new Promise((resolve, reject) => {
        const db = mongoUtil.getDb();
        const userName = req.body.userName;
        logger.debug(req.body.transID + ' :- Fetching from users db with username: ' + req.body.userName);
        db.collection('users').find({ userName: userName }).toArray(function (err, docs) {
            if (err) {
                logger.error(req.body.transID + ' :- Received error from db call: ' + JSON.stringify(err.stack));
                reject(err)
            } else {
                // console.log(bcrypt.hashSync(req.body.password, salt))
                // console.log(req.body.password, docs[0].password)
                // console.log(bcrypt.compareSync(req.body.password, docs[0].password))
                if (!!docs && Array.isArray(docs) && docs.length > 0 && bcrypt.compareSync(req.body.password, docs[0].password)) {
                    logger.debug(req.body.transID + ' :- authenticatation is successfull');
                    logger.debug(req.body.transID + ' :- About to create JWT token  ');
                    jwtService.sign({ "userName": userName }).then((token) => {
                        logger.debug(req.body.transID + ' :- Token was created sucessfully');
                        resolve({
                            status: 200,
                            message: "login success",
                            token: token
                        });
                    }).catch((err) => {
                        logger.error(req.body.transID + ' :- Error while making db call' + JSON.stringify(err.stack));
                        reject(err);
                    })
                } else {
                    logger.error(req.body.transID + ' :-provided username is invalid');
                    resolve({
                        status: 400,
                        message: "Invalid userName or password"
                    });
                }
            }
        });
    })
}

module.exports = { invoke };