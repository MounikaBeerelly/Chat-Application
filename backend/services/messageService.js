var mongoUtil = require('./dbService/dbConnection');

function insertMessages(messageData) {
    return new Promise((resolve, reject) => {
        const db = mongoUtil.getDb();
        db.collection('messages').insert(messageData, (err, dbResponse) => {
            if (err) {
                reject({ status: 400, message: 'Unable to insert data' });
            } else {
                resolve({ status: 200, message: 'Messages added successfully' })
            }
        });
    });
}

function getMessages(fromUserName, toUserName) {
    return new Promise((resolve, reject) => {
        const db = mongoUtil.getDb();
        db.collection('messages').find({ $or: [{ fromUserName: fromUserName, toUserName: toUserName }, { fromUserName: toUserName, toUserName: fromUserName }] }).toArray(function (err, docs) {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}

module.exports = { insertMessages, getMessages };