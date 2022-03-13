import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "better-sqlite3",
  database: "db.sqlite",
  synchronize: false,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migration/*.js"],
  cli: {
    migrationsDir: "migration",
  },
};

export = connectionOptions;
