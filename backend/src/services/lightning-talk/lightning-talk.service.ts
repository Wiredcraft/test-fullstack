import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LightningTalk, LightningTalkDocument } from 'src/db/lightning-talks.schema';
import { LightningTalksQueryResultDto } from 'src/dto/lightning-talks-query-result.dto';
import { LightningTalkDto } from 'src/dto/lightning-talk.dto';
import { UserDocument } from 'src/db/user.schema';

@Injectable()
export class LightningTalkService {
  private pageSize;

  constructor(
    @Inject(ConfigService) private config: ConfigService,
    @InjectModel(LightningTalk.name) private lightningTalkModel: Model<LightningTalkDocument>)
  {
    this.pageSize = parseInt(this.config.get('PAGE_SIZE')) || 10;
  }

  public async getList(page: number): Promise<LightningTalksQueryResultDto> {
    // Re-calcuate the page index by the actual data we have
    const countTotalItems = await this.lightningTalkModel.count({});
    const maxPageCount = Math.ceil(countTotalItems / this.pageSize) || 1
    const pageIndex = Math.min(page || 1, maxPageCount)
    const skip = (pageIndex - 1) * this.pageSize

    // retrieve records from db
    const docs = await this.lightningTalkModel.find({}).skip(skip).limit(this.pageSize);

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
    const doc = await this.lightningTalkModel.create({
      title: data.title,
      votes: 0,
      images: [],
      owner: user._id,
    })

    return {
      id: doc._id,
      title: doc.title,
      votes: doc.votes,
      images: doc.images
    }
  }
}
