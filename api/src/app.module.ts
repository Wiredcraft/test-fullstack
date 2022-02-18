import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TalksModule } from './talks/talks.module';

import config from './core/config';

import * as ormConfig from './db/orm-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    AuthModule,
    TalksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
