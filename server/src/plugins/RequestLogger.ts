import {
    ApolloServerPlugin,
    GraphQLRequestContextWillSendResponse,
    GraphQLRequestListener
} from "apollo-server-plugin-base"
import {GraphQLRequestContext} from "apollo-server-types";
import winston from "winston";
import {Context} from "../types/context";


export default class LoggerPlugin implements ApolloServerPlugin {
    constructor(private logger: winston.Logger) {
    }

    requestDidStart(requestContext: GraphQLRequestContext<Context>): GraphQLRequestListener<Context> {
        const variables = JSON.stringify(requestContext.request.variables);
        this.logger.info(
            `User ${requestContext.context.userId} request:\n${requestContext.request.query}\n${variables}`
        );

        return {
            willSendResponse: ({context, response}: GraphQLRequestContextWillSendResponse<Context>) => {
                if (response.errors?.length && response.errors?.length > 0) {
                    this.logger.error(
                        `failed:\n${JSON.stringify(response.errors!)}\n${JSON.stringify(response.data)}`
                    );
                } else {
                    this.logger.info(
                        `success:\n${JSON.stringify(response.data)}`
                    );
                }
            }
        }
    }
}
