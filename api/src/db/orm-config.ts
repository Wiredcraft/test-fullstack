import { ConnectionOptions } from 'typeorm';
import { join } from 'path';
import { User } from '../users/entities/user.entity';
import { Talk } from '../talks/entities/talk.entity';
import { Vote } from '../talks/entities/vote.entity';

let dbConf: ConnectionOptions;

if (process.env.NODE_ENV === 'development') {
  dbConf = {
    type: 'postgres',
    host: process.env.DB_HOSTNAME,
    port: +process.env.DB_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.DB_NAME,
  };
} else {
  dbConf = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    migrationsRun: true,
  };
}

const config: ConnectionOptions = {
  ...dbConf,
  synchronize: process.env.NODE_ENV === 'development',
  entities: [User, Talk, Vote],
  migrations: [join(__dirname, 'migrations/**/*{.ts,.js}')],
  subscribers: [join(__dirname, 'subscribers/**/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/db/migrations',
    subscribersDir: 'src/db/subscribers',
  },
};

export = config;
