import { Model } from 'mongoose';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { pwdHash } from 'src/common/helpers';

import { User, UserDocument } from 'src/db/user.schema';
import { UserLoginDataDto } from 'src/dto/user-login-data.dto';
import { UserLoginResultDto } from 'src/dto/user-login-result.dto';

import { JwtPayload } from './jwt-payload';
import { BizException } from 'src/exceptions';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly pwdSalt = this.config.get('PASSWORD_SALT');
  private readonly jwtExpires = this.config.get('JWT_EXPIRES');

  constructor(
    private readonly jwtService: JwtService,
    @Inject(ConfigService) private readonly config: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>) { }

  createToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async login(loginParam: UserLoginDataDto): Promise<UserLoginResultDto> {
    const user = await this.userModel.findOne({
      username: loginParam.username,
      password: pwdHash(loginParam.password, this.pwdSalt)
    });

    if (!user) {
      throw new BizException('User name or password incorrect', 'login-incorrect', 200);
    }

    return {
      username: user.username,
      jwt: {
        accessToken: this.createToken({ username: user.username }),
        expiresIn: this.jwtExpires,
      }
    }
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return await this.userModel.findOne({ username: payload.username });
  }
}
