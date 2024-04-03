const { UserInputError } = require("apollo-server-express");
const db = require("./db.js");
// if (!db) {
// 	throw new Error("Database connection not established");
// }
async function employeeCreate(_, { employee }) {
	employeeValidate(employee);
	const dbConnection = db.getDb();
	if (!dbConnection) {
		console.error("Database connection not established");
		throw new Error("Database connection not established");
	}

	employee.id = await db.getNextSequence("employees");

	const result = await dbConnection.collection("employees").insertOne(employee);
	const savedIssue = await dbConnection
		.collection("employees")
		.findOne({ _id: result.insertedId });
	return savedIssue;
}

async function employeeList(_, { employeeType }) {
	const dbConnection = db.getDb();
	if (!dbConnection) {
		console.error("Database connection not established");
		throw new Error("Database connection not established");
	}

	// filter by employee type
	const filter = {};
	if (employeeType) filter.employeeType = employeeType;
	const employees = await dbConnection
		.collection("employees")
		.find(filter)
		.toArray();
	return employees;
}

function employeeValidate(employee) {
	const errors = [];
	if (employee.firstName === "") {
		errors.push("FirstName is required.");
	}
	if (employee.lastName === "") {
		errors.push("LastName is required.");
	}
	if (employee.age < 20 || employee.age > 70) {
		errors.push("Age must be a Number between 20 and 70.");
	}
	// validation of Title, Department, EmployeeType, CurrentStatus is done using emus in graphql schema
	if (errors.length > 0) {
		throw new UserInputError("Invalid input(s)", { errors });
	}
}

module.exports = { employeeCreate, employeeList };
