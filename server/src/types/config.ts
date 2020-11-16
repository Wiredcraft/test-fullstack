import Knex from "knex";

export interface Config {
    db: Knex,
    jwtKey: string
}
