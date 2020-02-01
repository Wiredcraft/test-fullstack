import { Controller, UseGuards, Post, Body, Get, Put, Param } from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import {ReturnModelType} from '@typegoose/typegoose';
import { Crud } from '@libs/crud';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Poll } from '@libs/db/models/poll.model';
import { UserDecorator } from 'src/auth/user.decorator';
import { UserDocument } from '@libs/db/models/user.model';
import { PollDto } from './poll.dto';

@Crud({
  model: Crud,
  routes: {
    create: false
  }
})
@Controller('polls')
@ApiTags('polls')
export class PollsController {
  constructor(
    @InjectModel(Poll) private readonly model: ReturnModelType<typeof Poll>,
  ){
  }

  @Post()
  @ApiOperation({summary: 'create/edit a poll'})
  @UseGuards(AuthGuard('jwt-poll'))
  @ApiBearerAuth()
  async postPoll(@Body() dto: PollDto, @UserDecorator() user: UserDocument) {
    return await this.model.create({
      ...dto,
      userId: user._id,
      userName: user.userName
    })
  }

}