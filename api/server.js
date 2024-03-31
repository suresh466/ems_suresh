const fs = require("fs");
require("dotenv").config();
// if wish to use sample env file, use the below line
//require("dotenv").config({ path: "sample.env" });
const express = require("express");
const installApolloServer = require("./api_handler.js");
const db = require("./db.js");

const app = express();
const port = process.env.API_SERVER_PORT || 3000;

async function startServer() {
	await db.connectDb();
	await installApolloServer(app); // use the function to set up apollo server

	app.listen(port, () => console.log(`API server is running on port ${port}`));
}

startServer().catch((error) => console.error(error));
