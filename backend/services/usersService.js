var mongoUtil = require('./dbService/dbConnection');

function getUsers(loginUserName) {
    return new Promise((resolve, reject) => {
        const db = mongoUtil.getDb();
        db.collection('users').find({ userName: { $ne: loginUserName } }, { fields: { password: 0 } }).toArray(function (err, docs) {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}

function updateUserStatus(query, updateQuery) {
    return new Promise((resolve, reject) => {
        const db = mongoUtil.getDb();
        db.collection('users').updateOne(query, { $set: updateQuery }, function (err, dbResponse) {
            if (err) {
                reject(err)
            } else {
                resolve(dbResponse)
            }
        })
    })
}


// function updateUserStatus(userName, socketId) {
//     return new Promise((resolve, reject) => {
//         const db = mongoUtil.getDb();
//         db.collection('users').updateOne({ userName: userName }, { $set: { status: "active", socketId: socketId } }, function (err, dbResponse) {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(dbResponse)
//             }
//         })
//     })
// }

module.exports = { getUsers, updateUserStatus };