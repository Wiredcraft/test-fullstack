import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LogMethodArgs } from '../utils/decorators';
import { TalksService } from './talks.service';
import { CreateTalkDto } from './dto/create-talk.dto';
import { GetUser } from '../auth/get-user-decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import ResponseUtils from '../utils/responseUtils';
import { ResponseDto } from '../dto/response.dto';
import { Talk } from './talk.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiImplicitBody,
  ApiImplicitParam,
  ApiUnauthorizedResponse,
  ApiUseTags,
} from '@nestjs/swagger';

@ApiUseTags('talks')
@Controller('talks')
export class TalksController {
  constructor(private talksService: TalksService) {}

  @ApiImplicitBody({ name: 'createTalkDto', type: CreateTalkDto })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'The task has been successfully created.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @UseGuards(AuthGuard())
  @Post()
  @UsePipes(ValidationPipe)
  @LogMethodArgs()
  async create(@Body() createTalkDto: CreateTalkDto, @GetUser() user: User): Promise<ResponseDto<Talk>> {
    const talk = await this.talksService.create(createTalkDto, user);
    return ResponseUtils.mapResponse(talk);
  }

  @ApiCreatedResponse({ description: 'The task has been successfully get.' })
  @Get()
  @LogMethodArgs()
  async get(): Promise<ResponseDto<Talk[]>> {
    const talks = await this.talksService.get();
    return ResponseUtils.mapResponse(talks);
  }

  @ApiImplicitParam({ name: 'id', type: String })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'The task has been successfully liked.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @Patch('/:id/like')
  @UseGuards(AuthGuard())
  @LogMethodArgs()
  async patch(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<ResponseDto<Talk>> {
    const talk = await this.talksService.like(id, user);
    return ResponseUtils.mapResponse(talk);
  }
}
