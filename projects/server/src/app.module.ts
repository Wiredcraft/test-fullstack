import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LightningTalk } from "./entity/LightningTalk.entity";
import {
  connectConfig,
  connectDBConfigService,
  connectRedisConfigService,
} from "./dbConnect/connectionConfig";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import { resolve } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [connectConfig],
      envFilePath: resolve(process.cwd(), `../../.env.${process.env.NODE_ENV}`),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: connectDBConfigService,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: connectRedisConfigService,
    }),
    TypeOrmModule.forFeature([LightningTalk]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
