import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LightningTalk } from "./entity/LightningTalk.entity";
import * as connectionOptions from "ormconfig";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(connectionOptions),
    TypeOrmModule.forFeature([LightningTalk]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
