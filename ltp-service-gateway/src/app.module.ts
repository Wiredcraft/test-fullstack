import { Module, MiddlewaresConsumer } from '@nestjs/common'
import { AppController } from './app.controller'
import { CatsModule } from './modules/cats/cats.module'
import { NestModule } from '@nestjs/common/interfaces'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { CatsController } from './modules/cats/cats.controller'

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  components: []
})
export class ApplicationModule implements NestModule {
  configure (consumer: MiddlewaresConsumer): void {
    consumer.apply(LoggerMiddleware).with('Cats').forRoutes(CatsController)
  }

}