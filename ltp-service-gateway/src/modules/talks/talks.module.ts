import { Module } from '@nestjs/common'
import { TalksController } from './talks.controller'
import { TalksService } from './talks.service'
import { UsersModule } from '../users/users.module'

@Module({
  controllers: [TalksController],
  components: [TalksService],
  imports: [UsersModule]
})
export class TalksModule {}