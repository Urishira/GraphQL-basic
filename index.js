//make array of person with their name, age, phone, city, id
import { gql, ApolloServer } from "apollo-server";

import { v4 as uuidv4 } from "uuid";

const persons = [
  {
    name: "John",
    age: 30,
    phone: "555-555-5555",
    city: "New York",
    street: "123 Main St",
    id: uuidv4(),
  },
  {
    name: "Jane",
    age: 25,
    phone: "555-555-5555",
    city: "New York",
    street: " 123 Main St",
    id: uuidv4(),
  },
  {
    name: "Jack",
    age: 20,
    phone: "555-555-5555",
    city: "New York",
    street: " 123 Main St",
    id: uuidv4(),
  },
];

const typeDefs = gql`
  type Address {
    city: String!
    street: String!
  }
  type Person {
    name: String!
    age: String!
    phone: String!
    city: String!
    id: ID!
    address: Address!
  }

  type Query {
    personCount: Int!
    allPersons: [Person]!
    findPerson(name: String!): Person
  }
  type Mutation {
    addPerson(
      name: String!
      age: String!
      phone: String!
      city: String!
      street: String!
    ): Person
  }
`;

const resolvers = {
  Query: {
    personCount: () => person.length,
    allPersons: () => person,
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((p) => p.name === name);
    },
  },
  Person: {
    address: (root) => {
      const { city, street } = root;
      return { city, street };
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        ...args,
        id: uuidv4(),
      };
      persons.push(newPerson);
      return newPerson;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
