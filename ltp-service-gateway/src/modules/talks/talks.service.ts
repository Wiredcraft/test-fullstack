import { Component } from '@nestjs/common'
import * as Seneca from 'seneca'
import config from '../../configs'
import { CreateTalkDto } from './create-talk.dto'
import * as bluebird from 'bluebird'
import { LikeTalkDto } from './like-talk.dto'

@Component()
export class TalksService {
  senecaClient: any
  constructor () {
    this.senecaClient = Seneca()
      .use('entity')
      .use('seneca-amqp-transport')
      .client({
        type: 'amqp',
        pin: 'service:talks,cmd:*',
        url: config.rabbitmqUri
      })
    this.senecaClient.actAsync = bluebird.promisify(
      this.senecaClient.act,
      { context: this.senecaClient }
    )
  }

  async create (createTalkDto: CreateTalkDto) {
    const creationResult = await this.senecaClient.actAsync('service:talks,cmd:create', createTalkDto)
    return creationResult
  }

  async like (likeTalkDto: LikeTalkDto) {
    const likeResult = await this.senecaClient.actAsync('service:talks,cmd:like', likeTalkDto)
    return likeResult
  }

  async findAll () {
    const result = await this.senecaClient.actAsync('service:talks,cmd:findAll')
    return result
  }

  async getUserLiked (userId: string) {
    const result = await this.senecaClient.actAsync('service:talks,cmd:getUserLiked', { userId })
    return result
  }
}