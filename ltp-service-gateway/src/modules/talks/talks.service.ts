import { Component } from '@nestjs/common'
import * as Seneca from 'seneca'
import config from '../../configs'
import { CreateTalkDto } from './create-talk.dto'
import * as bluebird from 'bluebird'
import { LikeTalkDto } from './like-talk.dto'
import { UsersService } from '../users/users.service'
import getEmitter from '../../common/eventEmitter'
import { EventEmitter } from 'events'

@Component()
export class TalksService {
  senecaClient: any
  eventEmitter: EventEmitter
  constructor (private usersService: UsersService) {
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
    this.eventEmitter = getEmitter()
  }

  async create (createTalkDto: CreateTalkDto) {
    const creationResult = await this.senecaClient.actAsync('service:talks,cmd:create', createTalkDto)
    this.eventEmitter.emit('talkChanged')
    return creationResult
  }

  async like (likeTalkDto: LikeTalkDto) {
    const likeResult = await this.senecaClient.actAsync('service:talks,cmd:like', likeTalkDto)
    this.eventEmitter.emit('talkChanged')
    return likeResult
  }

  async findAll () {
    const talks = await this.senecaClient.actAsync('service:talks,cmd:findAll')
    const userIds = Object.keys((talks as Array<any>).map(talk => talk.userId).reduce((prev, cur) => {
      prev[cur] = cur
      return prev
    }, {})) // unique the userIds
    const users = await this.usersService.findByIds(userIds)
    const usersDict = users.reduce((prev, cur) => {
      prev[cur.id] = cur; return prev
    }, {})
    const talksWithUser = (talks as Array<any>).map(talk => {
      talk.author = usersDict[talk.userId]
      return talk
    })
    return talksWithUser
  }

  async getUserLiked (userId: string) {
    const result = await this.senecaClient.actAsync('service:talks,cmd:getUserLiked', { userId })
    return result
  }
}