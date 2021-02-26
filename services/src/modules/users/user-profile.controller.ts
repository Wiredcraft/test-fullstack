import * as common from '@nestjs/common';
import * as swagger from '@nestjs/swagger';
import { ApiTag } from 'src/common/api-tag.enum';
import { ExtendedRequest } from 'src/common/ext-request.interface';
import { SessionJwtAuthGuard } from '../auth/authz/session-jwt-auth.guard';
import { UserProfileAccessToken } from './dto/UserProfile.dto';
import { UsersService } from './users.service';

@swagger.ApiTags(ApiTag.USER_PROFILE, ApiTag.USERS)
@swagger.ApiBearerAuth()
@common.Controller('users/profile')
@common.UseGuards(SessionJwtAuthGuard)
export class UserProfileController {
  constructor(
    // @nestAccessControl.InjectRolesBuilder()
    // private readonly rolesBuilder: nestAccessControl.RolesBuilder,
    private readonly _service: UsersService,
  ) {}

  @swagger.ApiBearerAuth()
  @common.Get()
  async getProfile(
    @common.Request() req: ExtendedRequest,
  ): Promise<UserProfileAccessToken> {
    // @ts-ignore
    return req.user;
  }
}
