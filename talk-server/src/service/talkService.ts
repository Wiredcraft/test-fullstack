import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from "@nestjs-addons/in-memory-db";
import { TalkEntity, ITalkService } from './interface';

@Injectable()
export class TalkService implements ITalkService {
  constructor(private readonly talkEntityService: InMemoryDBService<TalkEntity>) {}

  async create(params: TalkEntity): Promise<TalkEntity> {
    return this.talkEntityService.create(params);
  }

  async query(): Promise<TalkEntity[]> {
    return this.talkEntityService.getAll();
  }

  async getById(id: string): Promise<TalkEntity> {
    return this.talkEntityService.get(id);
  }

  async update(params: TalkEntity): Promise<TalkEntity> {
    await this.talkEntityService.update(params);

    return this.talkEntityService.get(params.id);
  }
}
