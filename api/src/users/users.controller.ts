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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: "Gets user's information.",
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully returned user details.',
    type: UserReadDto,
  })
  @UseInterceptors(new SerializeInterceptor(UserReadDto))
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserMe(@Req() req): Promise<UserReadDto> {
    const { id } = req.user;

    try {
      return await this.usersService.findOneWithTaskVotes(id);
    } catch (e) {
      console.log(e)
    }
  }
}
