import { Model } from 'mongoose';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { pwdHash } from 'src/common/helpers';

import { User, UserDocument } from 'src/db/user.schema';
import { UserLoginParamDto } from 'src/dto/user-login-param.dto';
import { UserLoginResultDto } from 'src/dto/user-login-result.dto';

import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly jwtService: JwtService,
        @Inject(ConfigService) private readonly config: ConfigService,
        @InjectModel(User.name) private userModel: Model<UserDocument>) { }

    createToken(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    async login(loginParam: UserLoginParamDto): Promise<UserLoginResultDto> {
        const user = await this.userModel.findOne({
            username: loginParam.username,
            password: pwdHash(loginParam.password)
        });

        if (!user) {
            throw new Error('User name or password incorrect!');
        }

        return {
            username: user.username,
            jwt: {
                accessToken: this.createToken({ username: user.username }),
                expiresIn: this.config.get('JWT_EXPIRES'),
            }
        }
    }

    async validateUser(payload: JwtPayload): Promise<User> {
        return await this.userModel.findOne({ username: payload.username });
    }
}
