const fs = require("fs");
require("dotenv").config();
// if wish to use sample env file, use the below line
//require("dotenv").config({ path: "sample.env" });
const { ApolloServer } = require("apollo-server-express");

const GraphQLDate = require("./graphql_date.js");
const typeDefs = fs.readFileSync("schema.graphql", "utf-8");

const employees = require("./employees.js");

const resolvers = {
	Query: {
		employeeList: employees.employeeList,
	},
	Mutation: {
		employeeCreate: employees.employeeCreate,
	},
	GraphQLDate: GraphQLDate,
};

// install apollo server middleware on the express app
async function installApolloServer(app) {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		formatError: (error) => {
			console.log(error);
			return error;
		},
	});

	await server.start();

	const enableCors = (process.env.ENABLE_CORS || "true") === "true";
	console.log("CORS setting:", enableCors);
	server.applyMiddleware({ app, path: "/graphql", cors: enableCors });
}

module.exports = installApolloServer;
