import { Module } from '@nestjs/common';
import { PollsController } from './polls.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [PollsController],
  providers: [JwtStrategy]
})
export class PollsModule {}
