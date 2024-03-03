const express = require('express');
const fs = require('fs');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = "mongodb+srv://sthagunna6660-03:passwordadvfs@cluster3.ytit3gj.mongodb.net/?retryWrites=true&w=majority&appName=cluster3"

let db;

GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    employeeList,
  },
  Mutation: {
    employeeCreate,
  },
  GraphQLDate,
};

async function employeeCreate(_, { employee }) {
  employeeValidate(employee);
  employee.created = new Date();
  
  employee.id = await getNextSequence('employees');

  const result = await db.collection('employees').insertOne(employee);
  const savedIssue = await db.collection('employees')
    .findOne({ _id: result.insertedId });
  return savedIssue;
}

async function connectToDb() {
  const client = new MongoClient(url);
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

async function employeeList() {
  const employees = await db.collection('employees').find({}).toArray();
  return employees;
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnDocument: 'after' },
  );
  return result.current;
}

function employeeValidate(employee) {
  const errors = [];
  if (employee.firstName === '') {
    errors.push('Field "firstName" is required.');
  }
  if (employee.lastName === '') {
    errors.push('Field "lastName" is required.');
  }
  // if (issue.status == 'Assigned' && !issue.owner) {
  //   errors.push('Field "owner" is required when status is "Assigned"');
  // }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function startServer() {
  const port = process.env.PORT || 3000;
  const app = express();
  // Serve static files from the default directory (public)
  app.use(express.static('public'));

  const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
      console.log(error);
      return error;
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  await connectToDb();

  app.listen(port, () => console.log(`Server is running on port ${port}`));
}

startServer().catch(error => console.error(error));