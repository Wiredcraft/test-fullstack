import { Test, TestingModule } from "@nestjs/testing";
import { getConnection } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LightningTalk } from "./entity/LightningTalk.entity";
import { DbTestingModule } from "./test-utils/DbTestingModule";

describe("AppService", () => {
  let appService: AppService;
  let lightningTalksSeeds: LightningTalk[];
  let redis;
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [...DbTestingModule()],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
    redis = appService.redis;
    redis.flushdb();

  });

  it("get talks", async () => {
    const params = {
      author: "zll",
      title: "test-get",
      content: "test-get",
    };
    await appService.createTalk(params);
    const result = await appService.getTalks(
      { orderBy: "date_created", order: "ASC" },
      "test-get"
    );
    expect(result).toHaveLength(result.length);
  });

  it("saves talk ", async () => {
    const params = {
      author: "zll",
      title: "test-save",
      content: "test-save",
    };
    await appService.createTalk(params);
    const connection = await getConnection();
    const lightningTalkRepo = await connection.getRepository(LightningTalk);
    const result = await lightningTalkRepo.findOne(params);
    expect(result).not.toBeUndefined();
  });

  it("update poll", async () => {
    // add a talk first, the poll of it should be 0
    const params = {
      author: "zll-poll-test",
      title: "zll-poll-test",
      content: "zll-poll-test",
    };
    const talk = await appService.createTalk(params);
    const updatedPollScore = async () => {
      await appService.updateTalkPoll(talk.id, '"test-poll"');
      const connection = await getConnection();
      const lightningTalkRepo = await connection.getRepository(LightningTalk);
      const result = await lightningTalkRepo.findOne(params);
      const score = await redis.zscore("lightning_talks_poll", result.id);
      return score;
    };
    const score1 = await updatedPollScore();
    expect(score1).toBe("1");

    //same session id can only poll once
    const score2 = await updatedPollScore();
    expect(score2).toBe("1");
  });
});
