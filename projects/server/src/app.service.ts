import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LightningTalk } from "./entity/LightningTalk.entity";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(LightningTalk)
    private lightningTalkRepository: Repository<LightningTalk>
  ) {}

  async getTalks(): Promise<LightningTalk[]> {
    const result = await this.lightningTalkRepository.find();
    return result;
  }

  async addTalk(
    talk: Pick<LightningTalk, "user" | "title" | "description">
  ): Promise<LightningTalk> {
    const result = await this.lightningTalkRepository.save({
      user: talk.user,
      title: talk.title,
      description: talk.description,
      date_created: new Date().toISOString(),
    });
    return result;
  }

  async addPoll(talkId: number): Promise<boolean> {
    const result = await this.lightningTalkRepository
      .createQueryBuilder()
      .update()
      .where({ id: talkId })
      .set({ poll: () => "poll + 1" })
      .execute();
    return result.affected > 0;
  }
}
