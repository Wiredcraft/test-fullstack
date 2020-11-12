import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';

import { UserDocument } from 'src/db/user.schema';
import { LightningTalk, LightningTalkDocument } from 'src/db/lightning-talks.schema';
import { LightningTalkVote, LightningTalkVoteDocument } from 'src/db/lightning-talks-vote.schema';

import { BizException } from 'src/exceptions';

import { LightningTalksQueryResultDto } from 'src/dto/lightning-talks-query-result.dto';
import { LightningTalkDto } from 'src/dto/lightning-talk.dto';
import { CreateLightningTalkDto } from 'src/dto/create-lightning-talk.dto';

@Injectable()
export class LightningTalkService {
  private readonly logger = new Logger(LightningTalkService.name);
  private pageSize;

  // We dont upload file directly to Web server,
  // instead we have sperated Upload servers to handle all upload request,
  // We communicate with Upload server throught microservice, and generate upload URIs.
  private uploadServers: ClientProxy[];

  constructor(
    @Inject(ConfigService) private config: ConfigService,
    @InjectModel(LightningTalk.name) private lightningTalkModel: Model<LightningTalkDocument>,
    @InjectModel(LightningTalkVote.name) private lightningTalkVoteModel: Model<LightningTalkVoteDocument>)
  {
    this.pageSize = parseInt(this.config.get('PAGE_SIZE')) || 10;

    // Load upload servers microservice configuration from .env file
    this.uploadServers = (this.config.get('UPLOAD_SERVERS') || '').split(',').map(addr => {
      const [host, port] = addr.split(':');
      return ClientProxyFactory.create({ transport: Transport.TCP, options: { host, port } });
    });
  }

  public async get(lightningTalkId, user): Promise<LightningTalkDto> {
    let q = this.lightningTalkModel.findById(lightningTalkId).populate({
      path: 'owner',
      select: 'username -_id'
    });
    if (user) {
      q = q.populate({
        path: 'listvotes',
        match: { user: user._id }
      });
    }
    const lightningTalk = await q;

    return {
      id: lightningTalk._id,
      title: lightningTalk.title,
      votes: lightningTalk.votes,
      owner: lightningTalk.owner,
      store: lightningTalk.store,
      rawFile: lightningTalk.rawFile,
      images: lightningTalk.images,
      cover: lightningTalk.images && lightningTalk.images[0],
      voted: (user ? lightningTalk['listvotes'].length > 0 : undefined),
    };
  }

  private async checkLightningTalk(lightningTalkId, user) {
    const lightningTalk = await this.lightningTalkModel.findById(lightningTalkId, { owner: 1 });
    if (!lightningTalk) {
      throw new BizException(`No such item: ${lightningTalkId}`, 'lightningtalk-notfound', 404);
    }

    if ((<any>lightningTalk.owner)._id.equals(user._id)) {
      throw new BizException(`Vote on own items is not allowed.`, 'vote-own-item', 403);
    }
  }

  public async isVoted(lightningTalkId, user): Promise<boolean> {
    return await this.lightningTalkVoteModel.exists({ user: user._id, lightningTalk: lightningTalkId });
  }

  public async vote(lightningTalkId, user): Promise<boolean> {
    await this.checkLightningTalk(lightningTalkId, user);

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

    throw new BizException('Duplicated votes on same item.', 'vote-duplicated', 200);
  }

  public async unvote(lightningTalkId, user): Promise<boolean> {
    const res = await this.lightningTalkVoteModel.remove({ user: user._id, lightningTalk: lightningTalkId });

    // Decrease votes counter if the user's vote was successful deleted
    if (res.deletedCount > 0) {
      const now = new Date();
      await this.lightningTalkModel.updateOne({ _id: lightningTalkId }, {
        $inc: { votes: -1 },
        updatedAt: now,
      })
      return true;
    }

    throw new BizException('Cannot delete a not existing vote.', 'vote-not-exist', 200);
  }

  public async getList(page: number, user): Promise<LightningTalksQueryResultDto> {
    // Re-calcuate the page index by the actual data we have
    const countTotalItems = await this.lightningTalkModel.count({});
    const maxPageCount = Math.ceil(countTotalItems / this.pageSize) || 1
    const pageIndex = Math.min(page || 1, maxPageCount)
    const skip = (pageIndex - 1) * this.pageSize

    // retrieve records from db
    let q = this.lightningTalkModel.find({}).sort({votes: -1, updatedAt: -1}).skip(skip).limit(this.pageSize).populate({
      path: 'owner',
      select: 'username -_id'
    });
    if (user) {
      q = q.populate({
        path: 'listvotes',
        match: { user: user._id }
      });
    }
    const docs = await q;

    return {
      maxPageCount,
      pageIndex,
      data: docs.map(item => ({
        id: item._id,
        title: item.title,
        votes: item.votes,
        owner: item.owner,
        store: item.store,
        rawFile: item.rawFile,
        cover: item.images && item.images[0],
        voted: (user ? item['listvotes'].length > 0 : undefined),
      }))
    };
  }

  public async create(data: CreateLightningTalkDto, user: UserDocument) {
    if (!this.uploadServers || this.uploadServers.length === 0) {
      throw new BizException(`Cannot upload file right now!`, 'upload-not-available', 500);
    }

    // Should pick best available server to handle the upload job,
    // But we only have 1 for demo purpose
    try {
      const { uri } = await this.uploadServers[0].send({ cmd: 'create-upload-uri' }, data).pipe(timeout(5000)).toPromise();
      return {
        uploadUri: uri,
      };
    } catch (e) {
      this.logger.error(`Failed to call microservice create-upload-uri. ${e.message}`);
      throw new BizException(`Failed to create upload Uri!`, 'upload-failed-1', 500);
    }
  }
}
