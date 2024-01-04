import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [VotesController],
  providers: [VotesService, JwtService, UsersService],
  imports: [PrismaModule],
})
export class VotesModule {}
