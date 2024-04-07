/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

db.employees.deleteMany({});
db.deleted_employees.deleteMany({});

const employeesDB = [
	{
		id: 1,
		firstName: "Suresh",
		lastName: "Thagunna",
		age: 25,
		dateOfJoining: new Date(),
		title: "Manager",
		department: "IT",
		employeeType: "FullTime",
		currentStatus: true,
	},
	{
		id: 2,
		firstName: "Deepak",
		lastName: "Thagunna",
		age: 23,
		dateOfJoining: new Date(),
		title: "VP",
		department: "IT",
		employeeType: "PartTime",
		currentStatus: false,
	},
];

db.employees.insertMany(employeesDB);
const count = db.employees.countDocuments();
print("Inserted", count, "employees");

db.counters.deleteOne({ _id: "employees" });
db.counters.insertOne({ _id: "employees", current: count });

