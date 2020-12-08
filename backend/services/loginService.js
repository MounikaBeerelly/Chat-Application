const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var mongoUtil = require('./dbService/dbConnection');
const jwtService = require('./jwtService');

function invoke(req) {
    return new Promise((resolve, reject) => {
        const db = mongoUtil.getDb();
        const userName = req.body.userName;
        db.collection('users').find({ userName: userName }).toArray(function (err, docs) {
            if (err) {
                reject(err)
            } else {
                // console.log(bcrypt.hashSync(req.body.password, salt))
                // console.log(req.body.password, docs[0].password)
                // console.log(bcrypt.compareSync(req.body.password, docs[0].password))
                if (!!docs && Array.isArray(docs) && docs.length > 0 && bcrypt.compareSync(req.body.password, docs[0].password)) {
                    jwtService.sign({ "userName": userName }).then((token) => {
                        resolve({
                            status: 200,
                            message: "login success",
                            token: token
                        });
                    }).catch((err) => {
                        reject(err);
                    })
                } else {
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