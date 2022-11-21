import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { RedisModuleOptions } from "@liaoliaots/nestjs-redis";

export const connectConfig = () => {
  const {
    TYPEORM_DATABASE,
    TYPEORM_USERNAME,
    TYPEORM_PASSWORD,
    TYPEORM_ENTITIES,
    TYPEORM_MIGRATIONS,
    REDIS_HOST,
    REDIS_PORT,
  } = process.env;

  return {
    db: {
      database: TYPEORM_DATABASE,
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      entities: [TYPEORM_ENTITIES],
      migrations: [TYPEORM_MIGRATIONS],
    },
    redis: {
      host: REDIS_HOST,
      port: parseInt(REDIS_PORT) || 6379,
    },
  };
};

export const connectDBConfigService = (
  configService: ConfigService
): TypeOrmModuleOptions => {
  const { host, port, username, password, database, entities, migrations } =
    configService.get("db");
  return {
    type: "mariadb",
    host,
    port,
    username,
    password,
    database,
    synchronize: false,
    entities,
    migrations,
    cli: {
      migrationsDir: "migration",
    },
  };
};

export const connectRedisConfigService = (
  configService: ConfigService
): RedisModuleOptions => {
  const { host, port } = configService.get("redis");
  return {
    config: {
      host,
      port,
    },
  };
};
