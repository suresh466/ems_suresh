const { MongoClient } = require('mongodb');

let dbConnection;
async function connectDb() {
  const client = new MongoClient("mongodb+srv://sthagunna6660-03:passwordadvfs@cluster3.ytit3gj.mongodb.net/?retryWrites=true&w=majority");
  await client.connect();
  console.log('Connected to MongoDB at', "mongodb+srv://sthagunna6660-03");
  dbConnection = client.db();
}

function getDb() {
  return dbConnection;
}

module.exports = { connectDb, getDb };