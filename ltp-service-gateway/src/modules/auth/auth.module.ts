import { Module } from '@nestjs/common'
import { JwtStrategy } from './jwt.strategy'
import { AuthService } from './auth.service'

@Module({
  components: [AuthService, JwtStrategy],
  exports: [JwtStrategy]
})
export class AuthModule {}