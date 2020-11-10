import { Controller, Get, Post, Query, Body, Logger, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { LightningTalksQueryDto } from 'src/dto/lightning-talks-query.dto';
import { CreateLightningTalkDto } from 'src/dto/create-lightning-talk.dto';
import { LightningTalkService } from 'src/services/lightning-talk/lightning-talk.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('lightning-talks')
@Controller('lightning-talks')
export class LightningTalkController {
  private readonly logger = new Logger(LightningTalkController.name);

  constructor(private readonly lightningTalkService: LightningTalkService) {}

  @ApiOperation({ summary: 'Get list of lightning talks, by using ?page=n as the paginator.' })
  @Get('')
  async list(@Query() q: LightningTalksQueryDto) {
    return this.lightningTalkService.getList(q.page);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an new lightning talk' })
  @UseGuards(AuthGuard())
  @Post('')
  async create(@Req() request, @Body() data: CreateLightningTalkDto) {
    return this.lightningTalkService.create(data, request.user)
  }

}
