import { Test, TestingModule } from "@nestjs/testing";
import { getConnection } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LightningTalk } from "./entity/LightningTalk.entity";
import { lightningTalkSeed } from "./test-utils/lightningTalkSeed";
import { SQLiteTestingModule } from "./test-utils/SQLiteTestingModule";

describe("AppService", () => {
  let appService: AppService;
  let lightningTalksSeeds: LightningTalk[];

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [...SQLiteTestingModule()],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
    lightningTalksSeeds = await lightningTalkSeed();
  });

  it("returns talks data from database", async () => {
    const result = await appService.getTalks();
    expect(result).toHaveLength(lightningTalksSeeds.length);
  });

  it("saves talk input to database", async () => {
    const params = {
      user: "kurt",
      title: "hello",
      description: "world",
    };
    await appService.addTalk(params);
    const connection = await getConnection();
    const lightningTalkRepo = await connection.getRepository(LightningTalk);
    const result = await lightningTalkRepo.findOne(params);
    expect(result).not.toBeUndefined();
  });

  it("increases poll of a specific talk", async () => {
    // add a talk first, the poll of it should be 0
    const params = {
      user: "melon",
      title: "poll poll",
      description: "go",
    };
    const talk = await appService.addTalk(params);

    await appService.addPoll(talk.id);
    const connection = await getConnection();
    const lightningTalkRepo = await connection.getRepository(LightningTalk);
    const result = await lightningTalkRepo.findOne(params);
    expect(result.poll).toBe(1);
  });
});
