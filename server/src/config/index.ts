import knex from "knex";
import {Config} from "../types/config";

const db = knex({
    client: "mysql2",
    version: "5.7",
    debug: process.env.NODE_ENV !== "production",
    connection: {
        host: process.env.DB_HOST,
        port: +(process.env.DB_PORT || 3306),
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    }
});


const jwtKey =  process.env.JWT_KEY;

export default {db, jwtKey} as Config;
