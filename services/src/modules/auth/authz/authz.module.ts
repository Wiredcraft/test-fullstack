import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  JwtModule,
  JwtSecretRequestType,
  JwtSignOptions,
  JwtVerifyOptions,
} from '@nestjs/jwt';
import authConfig from 'src/config/auth.config';
import { UsersModule } from '../../users/users.module';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync({
      // options here are overriden in services, but leave this for avoiding error logs somehow
      imports: [ConfigModule.forFeature(authConfig)],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        signOptions: {
          issuer: config.get<string>('auth.accessTokenIssuer'),
        },
        secretOrKeyProvider: (
          requestType: JwtSecretRequestType,
          payload: string | Record<string, any> | Buffer,
          signOrVerifyOptions: JwtVerifyOptions | JwtSignOptions,
        ): string => {
          return config.get<string>('auth.accessTokenPrivateKey');
        },
      }),
    }),
  ],
  providers: [JwtAuthService, JwtAuthStrategy],
  exports: [JwtAuthService],
})
export class AuthzModule {}
