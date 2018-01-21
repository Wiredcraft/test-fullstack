import { Module } from '@nestjs/common'
import { UserPublicController, UserApiController } from './users.controller'
import { DataBaseModule } from '../database/database.module'
import { UsersService } from './users.service'
import { usersProviders } from './users.providers'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'

@Module({
  imports: [DataBaseModule, AuthModule],
  controllers: [UserPublicController, UserApiController],
  components: [
    UsersService,
    AuthService,
    ...usersProviders
  ],
  exports: [UsersService]
})
export class UsersModule {}