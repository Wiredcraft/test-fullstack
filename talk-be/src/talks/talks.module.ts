import { Module } from '@nestjs/common';
import { TalksController } from './talks.controller';
import { TalksService } from './talks.service';
import { TalksRepository } from './talks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // TalksRepository
    TypeOrmModule.forFeature([TalksRepository]),
    AuthModule,
  ],
  controllers: [TalksController],
  providers: [TalksService],
})
export class TalksModule {}
