import { Module } from '@nestjs/common'
import { TalksController } from './talks.controller'

@Module({
  controllers: [TalksController],
  exports: [TalksController]
})
export class TalksModule {}