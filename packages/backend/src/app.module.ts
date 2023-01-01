import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TalkController } from './talk/talk.controller';
import { TalksController } from './talks/talks.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, TalkController, TalksController],
  providers: [AppService],
})
export class AppModule {}
