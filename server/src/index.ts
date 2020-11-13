import {ApolloServer} from "apollo-server";
import typeDefs from "./types/schemas.graphql"
import resolvers from "./resolvers";
import logger from "./logger";

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({url}) => {
    logger.info(`🚀 Server ready at ${url}`);
});
