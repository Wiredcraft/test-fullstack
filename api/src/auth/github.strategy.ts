import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-github2';

import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('oauth.github.clientId'),
      clientSecret: configService.get<string>('oauth.github.clientSecret'),
      callbackURL: configService.get<string>('oauth.github.callbackUrl'),
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: { displayName: string; id: string },
  ): Promise<any> {
    return await this.authService.getOrCreateGithubUser({
      name: profile.displayName,
      githubId: profile.id,
    });
  }
}
