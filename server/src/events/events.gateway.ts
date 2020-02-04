import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit
} from '@nestjs/websockets';
import { Server } from 'ws';
import * as dotenv from 'dotenv';
import { SOCKET_PORT } from 'src/config';


@WebSocketGateway(8080)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;
  users: number = 0;
  wsClients: [any];

  afterInit() {
    this.server.emit('testing', { do: 'stuff' });
  }

  async handleConnection(client: any){
    // A client has connected
    this.users++;
    if(!this.wsClients){
      this.wsClients = [client];
    } else {
      this.wsClients.push(client);
    }
    
  }

  async handleDisconnect(){
    // A client has disconnected
    this.users--;
  }

  private broadcast(event, message: any) {
    for (let c of this.wsClients) {
      c.send(JSON.stringify({
        event,
        data: message
      }));
    }
  }

  @SubscribeMessage('events')
  onEvent(client: any, data: any) {
    console.log('users',this.users)
    this.broadcast('message', data)
  }

}
