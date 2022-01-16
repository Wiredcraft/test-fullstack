interface Env {
    HOST: string;
    JWT_SECRET: string;
    LOG_LEVEL: string;
    MONGO_DB: string;
    MONGO_HOST: string;
    MONGO_PASSWORD: string;
    MONGO_PORT: number;
    MONGO_USER: string;
    NODE_ENV: string;
    PORT: number;
}

export default Env;
