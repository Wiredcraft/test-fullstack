import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LightningTalk } from "./entity/LightningTalk.entity";
import { TalksSortDto } from "./app.dto";
import { RedisService } from "@liaoliaots/nestjs-redis";
import Redis from "ioredis";

@Injectable()
export class AppService {
  public readonly redis: Redis;

  constructor(
    @InjectRepository(LightningTalk)
    private lightningTalkRepository: Repository<LightningTalk>,
    private readonly redisService: RedisService
  ) {
    this.redis = this.redisService.getClient();
  }

  async getTalks(sort: TalksSortDto, sessionId): Promise<LightningTalk[]> {
    const { orderBy } = sort;
    if (orderBy !== "poll") {
      const result = await this.lightningTalkRepository
        .createQueryBuilder("talks")
        .orderBy(`talks.${sort.orderBy}`, sort.order)
        .getMany();
      const resultIds = result.map((el) => el.id);
      if (!result.length) return [];
      const scoreArray = await this.redis.zmscore(
        "lightning_talks_poll",
        resultIds
      );
      const polledByMeArray = await this.redis.smismember(
        `s_user_polled:${sessionId}`,
        resultIds
      );
      return result.map((el, index) => ({
        ...el,
        poll: parseInt(scoreArray[index]) || 0,
        polled_by_me: !!polledByMeArray[index],
      }));
    } else {
      //use redis get score rank
      const redisScoreRankList = await this.redis.zrangebyscore(
        "lightning_talks_poll",
        0,
        "+inf",
        "WITHSCORES"
      );
      let sortedList = new Array(Math.ceil(redisScoreRankList.length / 2));

      //build result by redis data and sql data
      redisScoreRankList.forEach((el, index) => {
        if (sortedList[Math.floor(index / 2)]) {
          sortedList[Math.floor(index / 2)].push(el);
        } else {
          sortedList[Math.floor(index / 2)] = [el];
        }
      });
      if (!sortedList.length) return [];
      sortedList = sortedList.reverse();
      const sortedIds = sortedList.map((el) => el[0]);
      const polledByMeArray = await this.redis.smismember(
        `s_user_polled:${sessionId}`,
        sortedIds
      );
      const talksList = await this.lightningTalkRepository.findByIds(sortedIds);
      return sortedIds.map((el, index) => {
        const talk = talksList.find((item) => item.id == el);
        return {
          ...talk,
          poll: parseInt(sortedList[index][1]) || 0,
          polled_by_me: !!polledByMeArray[index],
        };
      });
    }
  }

  async createTalk(
    talk: Pick<LightningTalk, "author" | "title" | "content">
  ): Promise<LightningTalk> {
    const result = await this.lightningTalkRepository.save({
      ...talk,
      date_created: new Date().toISOString(),
    });
    await this.redis.zadd("lightning_talks_poll", 0, result.id);
    return result;
  }

  async updateTalkPoll(id: number, sessionId: string): Promise<boolean> {
    // this session has polled
    if (await this.redis.sismember(`s_talk_poll:${id}`, sessionId)) {
      return false;
    } else {
      await Promise.all([
        // set save session polled
        this.redis.sadd(`s_talk_poll:${id}`, sessionId),
        // save poll count
        this.redis.zincrby("lightning_talks_poll", 1, id),
        // save user has polled talk id
        this.redis.sadd(`s_user_polled:${sessionId}`, id),
      ]);
      return true;
    }
  }
}
