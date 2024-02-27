import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [VotesController],
  providers: [VotesService],
  imports: [PrismaModule, JwtModule],
})
export class VotesModule {}
