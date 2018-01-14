import { Module, MiddlewaresConsumer, Logger, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { NestModule } from '@nestjs/common/interfaces'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { EventsModule } from './modules/events/events.module'
import { AuthModule } from './modules/auth/auth.module'
import * as passport from 'passport'
import { TalksModule } from './modules/talks/talks.module';
import { TalksController } from './modules/talks/talks.controller';

@Module({
  imports: [EventsModule, AuthModule, TalksModule],
  controllers: [AppController],
  components: []
})
export class ApplicationModule implements NestModule {
  configure (consumer: MiddlewaresConsumer): void {
    consumer
      .apply(LoggerMiddleware).with('APP')
      .forRoutes(AppController)
    consumer
      .apply(LoggerMiddleware).with('talks')
      .forRoutes(TalksController)
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes({ path: '/api/*', method: RequestMethod.ALL })

  }
}