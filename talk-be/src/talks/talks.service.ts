import { Injectable } from '@nestjs/common';
import { LogMethodArgs } from '../utils/decorators';
import { CreateTalkDto } from './dto/create-talk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TalksRepository } from './talks.repository';
import { Talk } from './talk.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TalksService {
  constructor(
    @InjectRepository(TalksRepository)
    private talksRepository: TalksRepository,
  ) {}

  @LogMethodArgs()
  async create(createTalkDto: CreateTalkDto, user: User): Promise<Talk> {
    return await this.talksRepository.createTalk(createTalkDto, user);
  }

  @LogMethodArgs()
  async get(): Promise<Talk[]> {
    return await this.talksRepository.get();
  }

  @LogMethodArgs()
  async like(id: number, user: User): Promise<Talk> {
    return await this.talksRepository.like(id, user);
  }
}
