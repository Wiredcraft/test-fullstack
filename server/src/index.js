const { GraphQLServer } = require('graphql-yoga');

//The links variable is used to store the links at runtime.
//For now, everything is stored only in-memory.
let links = [
  {
    id: 'link-0',
    url: 'www.google.com',
    description: 'Very common search engine'
  }
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    //Adding new reslover for the feed root field.
    //matching the schema definition.
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`Server is running on https://localhost:4000`));
