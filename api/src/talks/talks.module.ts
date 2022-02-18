import { Module } from '@nestjs/common';
import { TalksService } from './talks.service';
import { TalksController } from './talks.controller';

@Module({
  controllers: [TalksController],
  providers: [TalksService]
})
export class TalksModule {}
