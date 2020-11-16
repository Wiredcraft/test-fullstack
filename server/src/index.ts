import {ApolloServer} from "apollo-server";
import typeDefs from "./types/schemas.graphql"
import {Context} from "./types/context"
import resolvers from "./resolvers";
import config from "./config"
import dataSources from "./datasources";
import logger from "./logger";
import RequestLogger from "./plugins/RequestLogger";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return new Context(req, config)
    },
    dataSources,
    plugins: [new RequestLogger(logger)]
});

server.listen({port: process.env.PORT}).then(({url}) => {
    logger.info(`🚀 Server ready at ${url}`);
});
