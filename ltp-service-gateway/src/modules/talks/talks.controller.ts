import { Controller, Get, Post, Param, Request, Body } from '@nestjs/common'
import { TalksService } from './talks.service'
import { CreateTalkDto } from './create-talk.dto'

@Controller('/api/talks')
export class TalksController {
  constructor (private talksService: TalksService) {}
  @Get('/')
  findAll () {
    return this.talksService.findAll()
  }

  @Get('/liked')
  liked (@Request() req) {
    return this.talksService.getUserLiked(req.user.id)
  }

  @Post('/')
  async create (@Body() createTalkDto: CreateTalkDto, @Request() req) {
    createTalkDto.userId = req.user.id
    return this.talksService.create(createTalkDto)
  }

  @Post('/:id/like')
  userLikeTalk (@Param('id') id: string, @Request() req) {
    return this.talksService.like({ talkId: id, userId: req.user.id })
  }
}