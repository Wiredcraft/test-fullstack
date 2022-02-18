import { Module } from '@nestjs/common';
import { TalksService } from './talks.service';
import { TalksController } from './talks.controller';
import { Talk } from './entities/talk.entity';
import { Vote } from './entities/vote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Talk, Vote]),],
  controllers: [TalksController],
  providers: [TalksService]
})
export class TalksModule {}
