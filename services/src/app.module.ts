import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import databaseConfig from './config/database.config';
import { EntryConfigProvider } from './entry-providers/entry-config';
import { Security } from './entry-providers/security';
import { Swagger } from './entry-providers/swagger';
import getTypeormOptions from './get-typeorm-options';
import { AuthModule } from './modules/auth/auth.module';
import { FeedsModule } from './modules/feeds/feeds.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [ConfigService],
      useFactory: getTypeormOptions,
    }),
    FeedsModule,
    UsersModule,
    AuthModule,
  ],
  providers: [EntryConfigProvider, Security, Swagger],
})
export class AppModule {
  // onModuleInit() {
  //   winstonLogger.add(
  //     new winston.transports.Console({
  //       format: winston.format.combine(
  //         winston.format.colorize(),
  //         winston.format.simple(),
  //       ),
  //     }),
  //   );
  // }
}
