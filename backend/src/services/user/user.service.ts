import * as moment from 'moment';
import { Model } from 'mongoose';
import { Injectable, Logger, InternalServerErrorException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserRegisterParamDto } from 'src/dto/user-register-param.dto';
import { pwdHash } from 'src/common/helpers';
import { User, UserDocument } from 'src/db/user.schema';
import { UserDto } from 'src/dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { BizException } from 'src/exceptions';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(ConfigService) private readonly config: ConfigService) { }

  async getMe(user: User): Promise<UserDto> {
    user = await this.userModel.findOne({ username: user.username });

    if (!user) {
      throw new BizException('Cannot load user profile!', 'user-notfound', 404);
    }

    return {
      username: user.username,
    };
  }

  async register(registerParam: UserRegisterParamDto): Promise<UserDto> {
    // check existing
    const exists = await this.userModel.exists({ username: registerParam.username });
    if (exists) {
      throw new BizException('Username already been used!', 'user-register-conflict', 200);
    }

    // create new user
    const now = new Date();
    const newUser = await this.userModel.create({
      username: registerParam.username,
      password: pwdHash(registerParam.password),
      createdAt: now,
      updatedAt: now,
    });

    return {
      username: newUser.username,
    };
  }
}
