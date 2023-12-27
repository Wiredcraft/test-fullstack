import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { VotesModule } from './votes/votes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, VotesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
