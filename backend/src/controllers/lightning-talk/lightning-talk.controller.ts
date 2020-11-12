import { Controller, Get, Post, Query, Body, Logger, UseGuards, Req, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { LightningTalksQueryDto } from 'src/dto/lightning-talks-query.dto';
import { CreateLightningTalkDto } from 'src/dto/create-lightning-talk.dto';
import { LightningTalkService } from 'src/services/lightning-talk/lightning-talk.service';
import { AuthGuard } from '@nestjs/passport';
import { LightningTalkIdParamDto } from 'src/dto/lightning-talk-id-param.dto';
import { ApplyUser } from 'src/services/auth/apply-user';

@ApiTags('lightning-talks')
@Controller('lightning-talks')
export class LightningTalkController {
  private readonly logger = new Logger(LightningTalkController.name);

  constructor(private readonly lightningTalkService: LightningTalkService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list of lightning talks, by using ?page=n as the paginator.' })
  @UseGuards(ApplyUser)
  @Get('')
  async list(@Req() request, @Query() q: LightningTalksQueryDto) {
    return this.lightningTalkService.getList(q.page, request.user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an new lightning talk.' })
  @UseGuards(AuthGuard())
  @Post('')
  async create(@Req() request, @Body() data: CreateLightningTalkDto) {
    return this.lightningTalkService.create(data, request.user)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one lightning talk detail.' })
  @UseGuards(ApplyUser)
  @Get('/:id')
  async get(@Req() request, @Param() lightningTalkId: LightningTalkIdParamDto) {
    return this.lightningTalkService.get(Types.ObjectId(lightningTalkId.id), request.user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Vote for specific lightning talk.' })
  @UseGuards(AuthGuard())
  @Get('/:id/voted')
  async isVoted(@Req() request, @Param() lightningTalkId: LightningTalkIdParamDto) {
    return this.lightningTalkService.isVoted(Types.ObjectId(lightningTalkId.id), request.user)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Vote for specific lightning talk.' })
  @UseGuards(AuthGuard())
  @Post('/:id/vote')
  async vote(@Req() request, @Param() lightningTalkId: LightningTalkIdParamDto) {
    return this.lightningTalkService.vote(Types.ObjectId(lightningTalkId.id), request.user)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unvote for specific lightning talk.' })
  @UseGuards(AuthGuard())
  @Delete('/:id/vote')
  async unvote(@Req() request, @Param() lightningTalkId: LightningTalkIdParamDto) {
    return this.lightningTalkService.unvote(Types.ObjectId(lightningTalkId.id), request.user)
  }

}