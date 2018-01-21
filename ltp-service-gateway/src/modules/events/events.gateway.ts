import { WebSocketGateway, WebSocketServer, SubscribeMessage, WsResponse, OnGatewayInit } from '@nestjs/websockets'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/map'

import getEmitter from '../../common/eventEmitter'

@WebSocketGateway({ port: 3001, namespace: 'talks' })
export class EventsGatewayTalks implements OnGatewayInit {
  server: any

  afterInit (server: any) {
    this.server = server
    const eventEmitter = getEmitter()
    const that = this
    eventEmitter.on('talkChanged', () => {
      that.server.emit('talkChanged')
    })
  }
}
