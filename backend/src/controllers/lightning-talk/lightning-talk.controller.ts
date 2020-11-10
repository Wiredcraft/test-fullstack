import { Controller, Get, Post, Query, Body, Logger } from '@nestjs/common';
import { LightningTalksQueryDto } from 'src/dto/lightning-talks-query.dto';
import { CreateLightningTalkDto } from 'src/dto/create-lightning-talk.dto';
import { LightningTalkService } from 'src/services/lightning-talk/lightning-talk.service';

@Controller('lightning-talks')
export class LightningTalkController {
  private readonly logger = new Logger(LightningTalkController.name);

  constructor(private readonly lightningTalkService: LightningTalkService) {}

  @Get('')
  async list(@Query() q: LightningTalksQueryDto) {
    return this.lightningTalkService.getList(q.page);
  }

  @Post('')
  async create(@Body() data: CreateLightningTalkDto) {
    return this.lightningTalkService.create(data)
  }

}
