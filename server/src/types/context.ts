import {AuthenticationError} from "apollo-server";
import {IncomingMessage} from "http";
import {sign, verify} from 'jsonwebtoken';
import logger from "../logger";
import {Config} from "./config";
import {DataSources} from "./datasources";
import {User} from "./index";


export interface SessionUser {
    token: string;
    user: User;
}

export class Context {
    userId?: string;
    dataSources?: DataSources

    constructor(private request: IncomingMessage, private config: Config) {
        this.config = config;
        this.userId = this.load(request);
    }

    private load(request: IncomingMessage) {
        const authorization = request.headers.authorization;
        if (!authorization) {
            return;
        }
        const matchResult = authorization.match(/^([^ ]+) (.+$)/);
        if (!matchResult) {
            throw new AuthenticationError("authorization token format invalid");
        }

        const [, schema, token] = matchResult;
        logger.info(`verify ${schema} ${token} ${this.config.jwtKey} ${typeof verify} ${JSON.stringify(verify(token, this.config.jwtKey, {ignoreExpiration: false}))}...`);

        switch (schema) {
            case "Bearer":
                logger.info(`schema ${schema}...`)
                const data: any = verify(token, this.config.jwtKey, {ignoreExpiration: false});
                if (!data || !data.userId) {
                    throw new AuthenticationError("invalid token：" + token);
                }
                return data.userId;
            default:
                throw new AuthenticationError("unsupported authorization type: " + schema);
        }
    }

    public sign(userId: string): string {
        logger.info(`sign ${this.config.jwtKey} ${typeof sign}...`);
        return sign({userId}, this.config.jwtKey, {expiresIn: "5 days"});
    }
}
