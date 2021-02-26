import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { FeedVoteSubscriber } from './modules/feeds/entities/feed-vote.subscriber';
import { UserEntitySubscriber } from './modules/users/entities/user-entity.subscriber';

/**
 * TypeOrmModuleOptions factory
 *
 * @export
 * @param {ConfigService} config
 * @returns {TypeOrmModuleOptions}
 */
export default function getTypeormOptions(
  config: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: config.get<string>('database.host'),
    port: config.get<number>('database.port'),
    username: config.get<string>('database.username'),
    password: config.get<string>('database.password'),
    database: config.get<string>('database.db'),
    subscribers: [FeedVoteSubscriber, UserEntitySubscriber],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    // migrationsTableName: "migrations", // default to migrations
    cli: { migrationsDir: 'migrations' },
    logging: true,
    logger: 'file',
    migrationsRun: true,
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV !== 'production',
  };
}
