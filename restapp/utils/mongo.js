const config = require('../config/development.json');

const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;

let _db ;

const connectMongo = (cb) => {
    mongoClient.connect(config.mongodb.url,{useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if(err) throw err;
        _db = client.db('way2');
        cb(true);
    });
}
const getDb = () => {
    if(_db) {
        return _db;
    } else {
        throw new Error("No Mongodb Found")
    }
}

const closeConn = () => {
    if(_db) {
        _db.close();
    }
    _db = null;
    return true;
}

module.exports = {
    connectMongo : connectMongo,
    getDb : getDb,
    closeConn : closeConn
}