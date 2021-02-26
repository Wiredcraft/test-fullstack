import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { UserProfileAccessToken } from 'src/modules/users/dto/UserProfile.dto';
import { JwtAuthPayload } from './jwt-auth-payload.interface';

export const JWT_AUTH_STRATEGY_TOKEN = 'jwt-auth';

/**
 * By default, deal with access token
 *
 * Not used for this project
 *
 * @export
 * @class JwtAuthStrategy
 * @extends {PassportStrategy(
 *   Strategy,
 *   JWT_AUTH_STRATEGY_TOKEN,
 * )}
 */
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(
  Strategy,
  JWT_AUTH_STRATEGY_TOKEN,
) {
  constructor(private readonly _config: ConfigService) {
    super(
      (() => {
        return <StrategyOptions>{
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // `Authorization` Header
          ignoreExpiration: false,
          issuer: _config.get<string>('auth.accessTokenIssuer'),
          secretOrKey: _config.get<string>('auth.accessTokenPublicKey'),
          audience: _config.get<string>('auth.accessTokenAudience'),
        };
      })(),
    );
  }

  /**
   * access_token 验证行为是隐性的，如果 token 验证成功，则 payload 是验证完成拿到的 jwtAuthPayload
   *
   * @param {JwtAuthPayload} payload
   * @returns {Promise<UserProfileAccessToken>}
   * @memberof JwtAuthStrategy
   */
  async validate({
    sub,
    ...restProfile
  }: JwtAuthPayload): Promise<UserProfileAccessToken> {
    return { id: sub, ...restProfile };
  }
}
