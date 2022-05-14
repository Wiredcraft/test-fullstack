import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { AppController } from './app.controller';
import { TalkService } from './service/talkService';
import { UserService } from './service/userService';

@Module({
  imports: [InMemoryDBModule.forRoot({})],
  controllers: [AppController],
  providers: [TalkService, UserService],
})
export class AppModule {}
