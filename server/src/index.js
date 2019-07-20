const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
type Query {
    info: String!
}
`;

const resolvers = {
  Query: {
    info: () => null
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`Server is running on https://localhost:4000`));
