import { Injectable } from '@nestjs/common';
import { SessionWithData } from 'src';
import {
  GeneralUserProfile,
  UserProfileAccessToken,
} from 'src/modules/users/dto/UserProfile.dto';
import { JwtAuthService } from '../authz/jwt-auth.service';

@Injectable()
export class AuthtService {
  constructor(private readonly _jwtAuth: JwtAuthService) {}

  /**
   * use old fasion but safe session/cookie (httpOnly) to manage tokens
   *
   * - generate access token (short expiration, for frequent sync with the ever updating user info)
   * - generate refresh token (long expiration)
   * - set `httpOnly` cookie (longest expiration, and reflush)
   *
   * @param {GeneralUserProfile} user
   * @param {SessionWithData} session
   * @returns {Promise<UserProfileAccessToken>}
   * @memberof AuthtService
   */
  public async resolveGeneralSessionCreation(
    userProfile: GeneralUserProfile,
    session: SessionWithData,
  ): Promise<UserProfileAccessToken> {
    const profileAccessToken = new UserProfileAccessToken(userProfile);
    const { id, ...restProfile } = profileAccessToken;

    // sign and store initial tokens, triggers session save
    const { at, rt } = await this._jwtAuth.signTokensAsync({
      ...restProfile,
      sub: id,
    });
    session.at = at;
    session.rt = rt;

    return profileAccessToken;
  }
}
