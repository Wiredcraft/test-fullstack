import { TypeOrmModule } from "@nestjs/typeorm";
import { LightningTalk } from "../entity/LightningTalk.entity";

export const SQLiteTestingModule = () => [
  TypeOrmModule.forRoot({
    type: "better-sqlite3",
    database: ":memory:",
    dropSchema: true,
    entities: [LightningTalk],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([LightningTalk]),
];
