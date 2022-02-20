import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TalksModule } from './talks/talks.module';

import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';

import config from './core/config';

import * as ormConfig from './db/orm-config';
import { APP_INTERCEPTOR } from '@nestjs/core';

const isDev = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [config],
      isGlobal: true,
    }),
    SentryModule.forRoot({
      dsn: process.env.BE_SENTRY_DSN,
      debug: isDev,
      environment: isDev ? 'development' : 'production',
      release: null,
    }),
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    AuthModule,
    TalksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useValue: new SentryInterceptor(),
    },
  ],
})
export class AppModule {}
