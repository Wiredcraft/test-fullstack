import { Module } from '@nestjs/common'
import { EventsGatewayTalks } from './events.gateway'

@Module({
  components: [EventsGatewayTalks]
})
export class EventsModule {}
