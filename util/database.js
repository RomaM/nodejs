/** Redundant due to mongoose **/

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://roma:Y_WMbX.m8eYwP6_@cluster0-wyoy2.mongodb.net/shop?retryWrites=true&w=majority',
    { useUnifiedTopology: true })
    .then(client => {
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'DB Connection Error: no DB found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;