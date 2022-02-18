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
} from '@nestjs/common';
import { TalksService } from './talks.service';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { JwtReqUser } from '../auth/jwt-auth.strategy';

@Controller('talks')
export class TalksController {
  constructor(private readonly talksService: TalksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: Request, @Body() createTalkDto: CreateTalkDto) {
    const { id } = req.user as JwtReqUser;
    return this.talksService.create(id, createTalkDto);
  }

  @Get()
  async findAll() {
    return this.talksService.findAll();
  }

  @Put(':id/vote')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Req() req: Request) {
    throw NotImplementedException;
  }
}
