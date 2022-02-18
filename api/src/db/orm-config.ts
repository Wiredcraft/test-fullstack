import { ConnectionOptions } from "typeorm";
import { join } from 'path';
import { User } from "../users/entities/user.entity";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOSTNAME,
  port: +process.env.DB_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === "development",
  entities: [User],
  migrations: [join(__dirname, "migrations/**/*{.ts,.js}")],
  subscribers: [join(__dirname, "subscribers/**/*{.ts,.js}")],
  cli: {
    migrationsDir: "src/db/migrations",
    subscribersDir: "src/db/subscribers",
  },
};

export = config;
