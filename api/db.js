const { MongoClient } = require("mongodb");

const url =
	process.env.DB_URL ||
	"mongodb+srv://sthagunna6660-03:passwordadvfs@cluster3.ytit3gj.mongodb.net/?retryWrites=true&w=majority&appName=cluster3";

let dbConnection;
async function connectDb() {
	const client = new MongoClient(url);
	await client.connect();
	console.log("Connected to MongoDB at", url);
	dbConnection = client.db();
}

function getDb() {
	return dbConnection;
}

async function getNextSequence(name) {
	const result = await dbConnection
		.collection("counters")
		.findOneAndUpdate(
			{ _id: name },
			{ $inc: { current: 1 } },
			{ returnDocument: "after" },
		);
	return result.current;
}

module.exports = { connectDb, getDb, getNextSequence };
