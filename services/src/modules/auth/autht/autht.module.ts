import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import authConfig from 'src/config/auth.config';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthzModule } from '../authz/authz.module';
import { AuthtController } from './autht.controller';
import { AuthtService } from './autht.service';
import { LocalAuthtStrategy } from './local-autht.strategy';
import { PasswordService } from './password.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    AuthzModule,
    ConfigModule.forFeature(authConfig),
    PassportModule,
  ],
  controllers: [AuthtController],
  providers: [PasswordService, AuthtService, LocalAuthtStrategy],
})
export class AuthtModule {}
