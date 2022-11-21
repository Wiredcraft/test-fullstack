import { TypeOrmModule } from "@nestjs/typeorm";
import { LightningTalk } from "../entity/LightningTalk.entity";
import { RedisModule } from "@liaoliaots/nestjs-redis";

export const DbTestingModule = () => [
  TypeOrmModule.forRoot({
    type: "mariadb",
    database: "lightning-talks",
    username: "root",
    password: "123456",
    dropSchema: true,
    entities: [LightningTalk],
    synchronize: true,
  }),
  RedisModule.forRoot({
    config: {
      host: "localhost",
      port: 6379,
    },
  }),
  TypeOrmModule.forFeature([LightningTalk]),
];
