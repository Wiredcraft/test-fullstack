import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
const dbConfig = config.get('db');
const { loggerLevel, maxQueryExecutionTime } = dbConfig;

export const typeOrmOptions: TypeOrmModuleOptions = {
  // 数据库类型 postgres
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  // entities
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // synchronize prod env false
  synchronize: process.env.DB_SYNC || dbConfig.synchronize,
  // redis cache sql result
  cache: {
    type: 'redis',
    options: {
      host: 'localhost',
      port: 6379,
    },
  },
  logging: loggerLevel,
  // query - 记录所有查询。
  // error - 记录所有失败的查询和错误。
  // schema - 记录架构构建过程。
  // warn - 记录内部 orm 警告。
  // info - 记录内部 orm 信息性消息。
  // log - 记录内部 orm 日志消息。
  maxQueryExecutionTime,
  // 此代码将记录所有运行超过1秒的查询
};
