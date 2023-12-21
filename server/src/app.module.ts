import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [PrismaModule, VotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
