import { WebSocketGateway, WebSocketServer, SubscribeMessage, WsResponse } from '@nestjs/websockets'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/map'

@WebSocketGateway({ port: 3001, namespace: 'talks' })
export class EventsGatewayTalks {
  @WebSocketServer() server

  @SubscribeMessage('scoreChange')
  onEvent (client, data): Observable<WsResponse<any>> {
    const event = 'scoreChange'
    console.log('data received in scoreChange event:', data)
    return Observable.from([1,2,3]).map(res => ({ event, data: res }))
  }
}
