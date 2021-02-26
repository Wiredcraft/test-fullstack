import { Module } from '@nestjs/common';
import { AuthtModule } from './autht/autht.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [AuthtModule, AuthzModule],
  exports: [AuthtModule, AuthzModule],
})
export class AuthModule {}
