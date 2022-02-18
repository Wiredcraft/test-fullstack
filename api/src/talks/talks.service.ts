import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { Talk } from './entities/talk.entity';

export type OrderOptions = 'ASC' | 'DESC';

@Injectable()
export class TalksService {
  constructor(
    @InjectRepository(Talk)
    private readonly talksRepository: Repository<Talk>,
  ) {}

  async create(userId: string, createTalkDto: CreateTalkDto): Promise<Talk> {
    const talk = this.talksRepository.create({
      ...createTalkDto,
      user: new User({ id: userId }),
    });

    await this.talksRepository.save(talk);

    return talk;
  }

  async findAll(order?: any) {
    if (!order) {
      order = { createdAt: 'DESC' };
    }
    return await this.talksRepository.find({ order });
  }

  async addOrDeleteVote(userId: string, talkId: string) {
    return '';
  }
}
