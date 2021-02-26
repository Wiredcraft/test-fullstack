import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthtModule } from '../auth/autht/autht.module';
import { AuthzModule } from '../auth/authz/authz.module';
import { User } from './entities/user.entity';
import { UserProfileController } from './user-profile.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    forwardRef(() => AuthtModule),
    forwardRef(() => AuthzModule),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController, UserProfileController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
