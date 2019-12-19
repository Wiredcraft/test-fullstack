import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload.interface';
import { LogMethodArgs } from '../utils/decorators';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  @LogMethodArgs()
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return await this.userRepository.signUp(authCredentialsDto);
  }

  @LogMethodArgs()
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto);
    const payload: JwtPayload = { username };
    const params = `call with args: ${JSON.stringify(arguments)}`;
    if (!username) {
      const reason = `reason: Invalid credentials`;
      const method = 'Method name: signIn fails';
      this.logger.log(`${method},${reason},${params}`);
      throw new UnauthorizedException(reason);
    }
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT token with payload ${params}`);
    return { accessToken };
  }
}
