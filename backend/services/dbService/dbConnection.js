const MongoClient = require('mongodb').MongoClient;
//console.log(process.env);

const envConfig = require('../../configurator').getEnvConfigFile();
var _db;
module.exports = {

    connectToServer: function (callback) {
        MongoClient.connect(envConfig.mongoURL, { useNewUrlParser: true }, function (err, client) {
            _db = client.db('SocketApp');
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    }
};