import { Controller, Get, Post, Body, Req, Logger, HttpCode, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from 'src/services/user/user.service';
import { UserRegisterParamDto } from 'src/dto/user-register-param.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user\'s information' })
  @UseGuards(AuthGuard())
  @Get('me')
  async getMe(@Req() request) {
    return await this.userService.getMe(request.user);
  }

  @ApiOperation({ summary: 'Register new user' })
  @Post('register')
  @HttpCode(200)
  async register(@Body() registerParam: UserRegisterParamDto) {
    return await this.userService.register(registerParam);
  }
}
