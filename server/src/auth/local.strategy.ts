import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>
  ) {
    super({
      usernameField: 'userName',
      passwordField: 'password'
    } as IStrategyOptions);
  }

  async validate(userName: string, password: string) {
    const user = await this.userModel.findOne({userName}).select('+password');
    if(!user){
      throw new BadRequestException('user is miss');
    }
    if(!compareSync(password, user.password)) {
      throw new BadRequestException('password is error')
    }
    return user;
  }
}