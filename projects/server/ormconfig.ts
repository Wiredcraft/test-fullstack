import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "mariadb",
  database: "lightning-talks",
  synchronize: false,
  username: "root",
  password: "123456",
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migration/*.js"],
  cli: {
    migrationsDir: "migration",
  },
};

export = connectionOptions;
