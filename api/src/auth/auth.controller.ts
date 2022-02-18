import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { SerializeInterceptor } from '../core/interceptors';
import { User } from '../users/entities/user.entity';
import { LoginReadDto } from './dto/login-read.dto';
import { GithubGuard } from './github.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get('github')
  @UseGuards(GithubGuard)
  async githubAuth() {}

  @Get('github/callback')
  @UseGuards(GithubGuard)
  @UseInterceptors(new SerializeInterceptor(LoginReadDto))
  async githubAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
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
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    res.clearCookie('fs_jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.statusCode = 204;

  }
}
