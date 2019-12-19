import { Body, Controller, Get, HttpCode, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user-decorator';
import { ApiBearerAuth, ApiImplicitBody, ApiUseTags } from '@nestjs/swagger';
import { LogMethodArgs } from '../utils/decorators';
import ResponseUtils from '../utils/responseUtils';
import { ResponseDto } from '../dto/response.dto';

@ApiUseTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiImplicitBody({ name: 'authCredentialsDto', type: AuthCredentialsDto })
  @Post('/signup')
  @LogMethodArgs()
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<ResponseDto<User>> {
    const user = await this.authService.signUp(authCredentialsDto);
    return ResponseUtils.mapResponse(user);
  }

  @ApiImplicitBody({ name: 'authCredentialsDto', type: AuthCredentialsDto })
  @Post('/signin')
  @HttpCode(200)
  @LogMethodArgs()
  async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<ResponseDto<Object>> {
    const token = await this.authService.signIn(authCredentialsDto);
    return ResponseUtils.mapResponse(token);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  @LogMethodArgs()
  async test(@GetUser() user: User) {
    return user;
  }
}
