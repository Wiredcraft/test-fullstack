import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entities/feed.entity';
import { UserFeedVote } from './entities/user-feed-vote.entity';
import { FeedsController } from './feeds.controller';
import { FeedsService } from './feeds.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feed, UserFeedVote])],
  controllers: [FeedsController],
  providers: [FeedsService],
})
export class FeedsModule {}
