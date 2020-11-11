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

import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './services/auth/jwt-strategy';
import { UploadService } from './services/upload/upload.service';

import { UploadController } from './controllers/upload/upload.controller';
import { MulterModule } from '@nestjs/platform-express';

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

    // config upload folder
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [
    AppController,
    UploadController,
  ],
  providers: [
    AppService,
    AuthService,
    JwtStrategy,
    UserService,
    UploadService,
  ],
})
export class UploadModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
