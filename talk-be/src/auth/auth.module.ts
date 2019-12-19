import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import appConfig from '../config/app.config';
const { JwtOptions } = appConfig;

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // config JWT
    JwtModule.register(JwtOptions),
    // define which repositories are registered in the current scope
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
