import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { GithubAuthDto } from './dto/github-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async getOrCreateGithubUser(githubAuthDto: GithubAuthDto) {
    try {
      return await this.usersService.findOneByGithubId(githubAuthDto.githubId);
    } catch (e) {
      const user = await this.usersService.create(githubAuthDto);
      return user;
    }
  }
}
