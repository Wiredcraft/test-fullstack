import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LightningTalksQueryResultDto } from 'src/dto/lightning-talks-query-result.dto';
import { LightningTalkDto } from 'src/dto/lightning-talk.dto';
import { UserDocument } from 'src/db/user.schema';
import { LightningTalk, LightningTalkDocument } from 'src/db/lightning-talks.schema';
import { LightningTalkVote, LightningTalkVoteDocument } from 'src/db/lightning-talks-vote.schema';

@Injectable()
export class LightningTalkService {
  private readonly logger = new Logger(LightningTalkService.name);
  private pageSize;

  constructor(
    @Inject(ConfigService) private config: ConfigService,
    @InjectModel(LightningTalk.name) private lightningTalkModel: Model<LightningTalkDocument>,
    @InjectModel(LightningTalkVote.name) private lightningTalkVoteModel: Model<LightningTalkVoteDocument>)
  {
    this.pageSize = parseInt(this.config.get('PAGE_SIZE')) || 10;
  }

  public async get(lightningTalkId): Promise<LightningTalkDto> {
    const lightningTalk = await this.lightningTalkModel.findById(lightningTalkId);

    return {
      id: lightningTalk._id,
      title: lightningTalk.title,
      images: lightningTalk.images,
      votes: lightningTalk.votes,
    };
  }

  private async checkLightningTalkExistence(lightningTalkId) {
    const lightningTalkExist = await this.lightningTalkModel.exists({ _id: lightningTalkId });
    if (!lightningTalkExist) {
      throw new Error(`No such item: ${lightningTalkId}`);
    }
  }

  public async isVoted(lightningTalkId, user): Promise<boolean> {
    return await this.lightningTalkVoteModel.exists({ user: user._id, lightningTalk: lightningTalkId });
  }

  public async vote(lightningTalkId, user): Promise<boolean> {
    this.checkLightningTalkExistence(lightningTalkId);

    const now = new Date();
    const res = await this.lightningTalkVoteModel.updateOne(
      { user: user._id, lightningTalk: lightningTalkId },
      { $setOnInsert: { createdAt: now } },
      { upsert: true });

    // Increase votes counter if the user havn't voted it before
    if (res.upserted && res.upserted.length > 0) {
      this.logger.debug(`${user.username} votes on ${lightningTalkId}`)
      await this.lightningTalkModel.updateOne({ _id: lightningTalkId }, {
        $inc: { votes: 1 },
        updatedAt: now,
      })
      return true;
    }

    return false;
  }

  public async unvote(lightningTalkId, user): Promise<boolean> {
    this.checkLightningTalkExistence(lightningTalkId);

    const res = await this.lightningTalkVoteModel.remove({ user: user._id, lightningTalk: lightningTalkId });

    // Decrease votes counter if the user's vote was deleted
    if (res.deletedCount > 0) {
      const now = new Date();
      await this.lightningTalkModel.updateOne({ _id: lightningTalkId }, {
        $inc: { votes: -1 },
        updatedAt: now,
      })
      return true;
    }

    return false;
  }

  public async getList(page: number): Promise<LightningTalksQueryResultDto> {
    // Re-calcuate the page index by the actual data we have
    const countTotalItems = await this.lightningTalkModel.count({});
    const maxPageCount = Math.ceil(countTotalItems / this.pageSize) || 1
    const pageIndex = Math.min(page || 1, maxPageCount)
    const skip = (pageIndex - 1) * this.pageSize

    // retrieve records from db
    const docs = await this.lightningTalkModel.find({}).sort({votes: -1, updatedAt: -1}).skip(skip).limit(this.pageSize);

    return {
      maxPageCount,
      pageIndex,
      data: docs.map(item => ({
        id: item._id,
        title: item.title,
        votes: item.votes,
        images: item.images,
      }))
    };
  }

  public async create(data, user: UserDocument): Promise<LightningTalkDto> {
    const now = new Date()
    const doc = await this.lightningTalkModel.create({
      title: data.title,
      votes: 0,
      images: [],
      owner: user._id,
      createdAt: now,
      updatedAt: now,
    })

    return {
      id: doc._id,
      title: doc.title,
      votes: doc.votes,
      images: doc.images
    }
  }
}
