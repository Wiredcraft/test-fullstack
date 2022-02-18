import {
  Controller,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserReadDto } from './dto/user-read.dto';
import { SerializeInterceptor } from '../core/interceptors';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(new SerializeInterceptor(UserReadDto))
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserMe(@Req() req): Promise<UserReadDto> {

    const { id } = req.user;

    return await this.usersService.findOneWithTaskVotes(id);
  }
}
