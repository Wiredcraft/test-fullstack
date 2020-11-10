import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { LoggerModule } from './middlewares/logger/logger.module';

import { User, UserSchema } from './db/user.schema';
import { LightningTalk, LightningTalkSchema } from './db/lightning-talks.schema';
import { LightningTalkVote, LightningTalkVoteSchema } from './db/lightning-talks-vote.schema';

import { LightningTalkController } from './controllers/lightning-talk/lightning-talk.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { UserController } from './controllers/user/user.controller';
import { LightningTalkService } from './services/lightning-talk/lightning-talk.service';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './services/auth/jwt-strategy';

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
    MongooseModule.forFeature([
      { name: LightningTalk.name, schema: LightningTalkSchema },
      { name: LightningTalkVote.name, schema: LightningTalkVoteSchema },
      { name: User.name, schema: UserSchema },
    ]),

    // import jwt authentication stuff
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRES'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    LightningTalkController
  ],
  providers: [
    AppService,
    AuthService,
    JwtStrategy,
    UserService,
    LightningTalkService
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
