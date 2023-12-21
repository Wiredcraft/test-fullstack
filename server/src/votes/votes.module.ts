import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [VotesController],
  providers: [VotesService],
  imports: [PrismaModule],
})
export class VotesModule {}
