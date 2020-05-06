const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://roma:Y_WMbX.m8eYwP6_@cluster0-wyoy2.mongodb.net/test?retryWrites=true&w=majority',
    { useUnifiedTopology: true })
    .then(client => {
      callback(client);
    })
    .catch(err => console.log(err));
};

module.exports = mongoConnect;