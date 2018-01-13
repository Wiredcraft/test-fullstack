import { Module, MiddlewaresConsumer } from '@nestjs/common'
import { AppController } from './app.controller'
import { NestModule } from '@nestjs/common/interfaces'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { EventsModule } from './modules/events/events.module'

@Module({
  imports: [EventsModule],
  controllers: [AppController],
  components: []
})
export class ApplicationModule implements NestModule {
  configure (consumer: MiddlewaresConsumer): void {
    consumer.apply(LoggerMiddleware).with('APP').forRoutes(AppController)
  }
}