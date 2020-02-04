import { Controller, Post, UseGuards, Get, Body, Req, Delete, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDecorator } from './user.decorator';
import { DeleteUserDto } from './dtos/delete.dto';
import { APIS_PATH } from '../config';


@Controller(`${APIS_PATH}auth`)
@ApiTags('auth')
export class AuthController {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
    private readonly jwtService: JwtService
  ) {

  }

  @Post('register')
  @ApiOperation({summary: 'create a user'})
  async register(@Body() dto: RegisterDto) {
    const {userName, password} = dto;
    const data = await this.userModel.find({userName});
    if(!data || data.length <= 0){
      const user = await this.userModel.create({
        userName,
        password
      })
      return user;
    } else {
      throw new BadRequestException('userName had exist!');
    }
    
  }

  
  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({summary: 'user login'})
  async login(@Body() dto: LoginDto, @UserDecorator() user: UserDocument) {
    const token = await this.jwtService.signAsync({id: user._id}, {
      expiresIn: 60 * 60 * 24
    });
    return {
      access_token: token,
    };
  }

  
  @Get('user')
  @ApiOperation({summary: 'find a user'})
  @UseGuards(AuthGuard('jwt-auth'))
  @ApiBearerAuth()
  async user(@UserDecorator() user: UserDocument) {
    return user;
  }

  @Get('users')
  async users() {
    return await this.userModel.find();
  }

  @Delete('user')
  async deleteOneUser(@Body() dto: DeleteUserDto) {
    return await this.userModel.findByIdAndDelete(dto.id)
  }
}
