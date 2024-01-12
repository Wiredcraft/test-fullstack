import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { JwtSoftGuard } from 'src/auth/jwt-soft.guard';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Get('/myinfo')
  @UseGuards(JwtSoftGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity || null })
  async getInfo() {
    const user = this.usersService.getUserInfo();
    if (user) {
      return new UserEntity(user);
    }
    return null;
  }
}
