import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';

import { TalkEntity } from './service/interface';
import { TalkService } from './service/talkService';

@Controller()
export class AppController {
  constructor(
    private readonly talkService: TalkService,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post('/talks')
  async createTalk(@Body() talk: TalkEntity): Promise<TalkEntity> {
    return this.talkService.create(talk);
  }

  @Get('/talks/:id')
  async getTalkById(@Param('id') id: string): Promise<TalkEntity> {
    return this.talkService.getById(id);
  }

  @Put('/talks/:id')
  async updateTalk(
    @Param('id') id: string,
    @Body() talk: TalkEntity,
  ): Promise<TalkEntity> {
    return this.talkService.update({ id, ...talk });
  }

  // TODO: support pagination
  @Get('/talks')
  async queryTalks(): Promise<TalkEntity[]> {
    return this.talkService.query();
  }
}
