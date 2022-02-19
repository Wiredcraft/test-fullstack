import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  NotImplementedException,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { TalksService } from './talks.service';
import { CreateTalkDto } from './dto/create-talk.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { JwtReqUser } from '../auth/jwt-auth.strategy';

export type SortTypes = 'popular' | 'newest';

@Controller('talks')
export class TalksController {
  constructor(private readonly talksService: TalksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: Request, @Body() createTalkDto: CreateTalkDto) {
    const { id } = req.user as JwtReqUser;
    return await this.talksService.create(id, createTalkDto);
  }

  @Get()
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('sort', new DefaultValuePipe('popular'))
    sort: SortTypes = 'popular',
  ) {
    return await this.talksService.findAll({ page, limit: 20 }, sort);
  }

  @Put(':id/vote')
  @UseGuards(JwtAuthGuard)
  async vote(@Param('id') id: string, @Req() req: Request) {
    const { id: userId } = req.user as JwtReqUser;
    try {
      const result = await this.talksService.addOrDeleteVote(userId, id);
      return result;
    } catch (e) {
      console.log('error');
    }
    return;
  }
}
