import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FEED_KEYS_QB_GET_MANY } from './dto/FeedGetMany.dto';
import { Feed } from './entities/feed.entity';

@Injectable()
export class FeedsService {
  // private readonly _customFeeds = getCustomRepository(FeedRepository);

  constructor(
    @InjectRepository(Feed)
    private readonly _feedRepo: Repository<Feed>,
  ) {}

  async findLimitedAndCountTotal(
    skip: number,
    take: number,
  ): Promise<[Feed[], number]> {
    const totalCount = await this._feedRepo.count();
    const manyFeeds = await this._feedRepo
      .createQueryBuilder('feed')
      .innerJoin('feed.createdBy', 'createdBy')
      // .leftJoin('feed.votes')
      .select(['feed'])
      .addSelect([...FEED_KEYS_QB_GET_MANY])
      .orderBy('feed.createdAt', 'DESC')
      .getMany();

    return [manyFeeds.slice(skip, Number(skip) + Number(take)), totalCount];
  }
}
