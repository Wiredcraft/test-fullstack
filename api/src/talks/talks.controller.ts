import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Put,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { TalksService } from './talks.service';
import { CreateTalkDto } from './dto/create-talk.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { JwtReqUser } from '../auth/jwt-auth.strategy';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReadTalkDto } from './dto/read-talk.dto';
import { SerializeInterceptor } from '../core/interceptors';
import { ReadTalksDto } from './dto/read-talks.dto';

export enum SortTypes {
  popular = 'popular',
  newest = 'newest',
}

@ApiTags('talks')
@Controller('talks')
export class TalksController {
  constructor(private readonly talksService: TalksService) {}

  @Post()
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Creates a new talk.' })
  @ApiResponse({
    status: 201,
    description: 'Talk has been succesfully created.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, valid JWT cookie not present in header.',
  })
  @ApiResponse({
    status: 422,
    description: 'The talk name is a unique field and has already been taken.',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new SerializeInterceptor(ReadTalkDto))
  async create(
    @Req() req: Request,
    @Body() createTalkDto: CreateTalkDto,
  ): Promise<ReadTalkDto> {
    const { id } = req.user as JwtReqUser;
    return await this.talksService.create(id, createTalkDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Returns a paginated list of all talks dependent on query params. Set page size of 20.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page number to return',
    schema: { type: 'integer' },
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'the sort type of the talks list',
    enum: SortTypes,
  })
  @ApiResponse({
    status: 200,
    description: 'Talks successfully returned.',
    type: ReadTalksDto,
  })
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('sort', new DefaultValuePipe('popular'))
    sort: SortTypes = SortTypes.popular,
  ) {
    return await this.talksService.findAll({ page, limit: 20 }, sort);
  }

  @Put(':id/vote')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Vote/unvote for a specific talk.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Vote/Unvote successful. The response will indicate which one. true = vote created, false = vote deleted.',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, valid JWT cookie not present in header.',
  })
  @ApiResponse({
    status: 404,
    description: 'Vote of given id not found.',
  })
  async vote(@Param('id') id: string, @Req() req: Request) {
    const { id: userId } = req.user as JwtReqUser;
    return await this.talksService.addOrDeleteVote(userId, id);
  }
}
