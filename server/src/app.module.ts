import { Module } from '@nestjs/common';
import { DbModule } from '@libs/db';
import { CommonModule } from '@libs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PollsModule } from './polls/polls.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DbModule,
    CommonModule,
    PollsModule,
    EventsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
