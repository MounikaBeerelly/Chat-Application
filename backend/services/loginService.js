const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var mongoUtil = require('./dbService/dbConnection');

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
                    resolve({
                        status: 200,
                        message: "login success"
                    });
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