const jwt = require('jsonwebtoken');
const fs = require('fs')
const privateKey = fs.readFileSync('keys/private.key');
const publicKey = fs.readFileSync('keys/public.key');


function sign(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, privateKey, { algorithm: global.JWT_ALGO, expiresIn: 600 }, function (err, token) {
            console.log(token);
            if (err) {
                reject(err)
            } else {
                resolve(token);
            }
        });
    })
}

function verify(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, function (err, decoded) {
            console.log(err) // bar
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    })
}

module.exports = { sign, verify }