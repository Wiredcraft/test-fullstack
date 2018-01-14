import { Controller, Get } from '@nestjs/common'

@Controller('/api/talks')
export class TalksController {
  @Get('/')
  findAll () {
    return []
  }
}