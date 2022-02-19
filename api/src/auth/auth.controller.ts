import {
  Controller,
  Delete,
  Get,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { SerializeInterceptor } from '../core/interceptors';
import { User } from '../users/entities/user.entity';
import { LoginReadDto } from './dto/login-read.dto';
import { GithubGuard } from './github.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get('github')
  @ApiOperation({ summary: 'Redirect path to Github login.' })
  @ApiResponse({ status: 302, description: 'Redirect to github login page.' })
  @UseGuards(GithubGuard)
  async githubAuth() {
    // simple redirect operation
  }

  @Get('github/callback')
  @ApiOperation({
    summary: 'Callback endpoint to send code back from frontend.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful code redemption and return user details.',
    type: LoginReadDto,
  })
  @UseGuards(GithubGuard)
  @UseInterceptors(new SerializeInterceptor(LoginReadDto))
  async githubAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginReadDto> {
    const user = req.user as User;

    const accessToken = this.jwtService.sign({ name: user.name, sub: user.id });

    res.cookie('fs_jwt', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return user;
  }

  @Delete()
  @ApiOperation({
    summary: 'Logout endpoint for all users.',
  })
  @ApiResponse({
    status: 204,
    description: 'User successfully logged out and JWT cookie cleared.',
  })
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('fs_jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.statusCode = 204;
  }
}
