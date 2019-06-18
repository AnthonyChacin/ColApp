const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectID;
const {DB_URI} = process.env;
const uri = `${DB_URI}`;
const Client = new MongoClient(uri, { useNewUrlParser: true, poolSize: 1000 });

module.exports = Client; 