import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { LoggerModule } from './middlewares/logger/logger.module';
import { LightningTalkController } from './controllers/lightning-talk/lightning-talk.controller';
import { LightningTalk, LightningTalkSchema } from './db/lightning-talks.schema';
import { LightningTalkService } from './services/lightning-talk/lightning-talk.service';

@Module({
  imports: [
    // By default, the package looks for a .env file
    // by setting isGlobal property to true, you will not need to import ConfigModule in other modules
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    // Set up MongoDB dependency injections
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: LightningTalk.name, schema: LightningTalkSchema }]),
  ],
  controllers: [AppController, LightningTalkController],
  providers: [AppService, LightningTalkService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
