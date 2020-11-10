import * as moment from 'moment';
import { Model } from 'mongoose';
import { Injectable, Logger, InternalServerErrorException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserRegisterParamDto } from 'src/dto/user-register-param.dto';
import { pwdHash } from 'src/common/helpers';
import { User, UserDocument } from 'src/db/user.schema';
import { UserDto } from 'src/dto/user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @Inject(ConfigService) private readonly config: ConfigService) { }

    async getMe(user: User): Promise<UserDto> {
        user = await this.userModel.findOne({ username: user.username });

        if (!user) {
            // impossible to get here
            throw new Error('Cannot load user profile!');
        }

        return {
            username: user.username,
        };
    }

    async register(registerParam: UserRegisterParamDto): Promise<UserDto> {
        // check existing
        const exists = await this.userModel.exists({ username: registerParam.username });
        if (exists) {
            throw new Error('Username already been used!');
        }

        // create new user
        const newUser = await this.userModel.create({
            username: registerParam.username,
            password: pwdHash(registerParam.password),
        });

        return {
            username: newUser.username,
        };
    }
}
