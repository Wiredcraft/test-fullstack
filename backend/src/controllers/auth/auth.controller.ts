import { Controller, Post, Body, Logger, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UserLoginParamDto } from 'src/dto/user-login-param.dto';
import { UserLoginResultDto } from 'src/dto/user-login-result.dto';
import { AuthService } from 'src/services/auth/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginParam: UserLoginParamDto): Promise<UserLoginResultDto> {
    return await this.authService.login(loginParam);
  }

}
