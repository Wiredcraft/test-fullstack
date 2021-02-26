import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import rs from 'randomstring';
import {
  JwtAuthPayload,
  JwtAuthPayloadDecoded,
  JwtDecodedDefault,
} from './jwt-auth-payload.interface';

/**
 * Use jwt for authorization
 *
 * @export
 * @class JwtAuthService
 */
@Injectable()
export class JwtAuthService {
  constructor(
    private readonly _jwt: JwtService,
    private readonly _config: ConfigService,
  ) {}

  /**
   * Inherit values from module config
   *
   * @param {JwtAuthPayload} payload
   * @returns {Promise<string>}
   * @memberof JwtAuthService
   */
  async signTokensAsync(
    payload: JwtAuthPayload,
    newRefreshTokenExpire?: number,
  ): Promise<{ at: string; rt: string }> {
    return {
      at: await this._signAT(payload),
      rt: await this._signRT(newRefreshTokenExpire),
    };
  }

  public getExpirationLeft(exp: number): number {
    const now = new Date().getTime();
    // NOTE: this `now` is in miliseconds while the `exp` is in seconds
    // floor it
    const nowInSeconds = Math.floor(now / 1000);
    return exp - nowInSeconds;
  }

  /**
   * validate access token (ignore expiration error)
   * Inherit values from strategy config, if jwtAuth strategy is used (not for this project)
   *
   * @param {string} token
   * @returns {Promise<JwtAuthPayloadDecoded>}
   * @memberof JwtAuthService
   */
  async validateIgnoreExpireAT(token: string): Promise<JwtAuthPayloadDecoded> {
    return this._jwt.verifyAsync(token, {
      ignoreExpiration: true,
      audience: this._config.get<string>('auth.accessTokenAudience'),
      issuer: this._config.get<string>('auth.accessTokenIssuer'),
      secret: this._config.get<string>('auth.accessTokenPublicKey'),
    });
  }

  /**
   * accessToken sign() Inherit options from module config
   *
   * @param {JwtAuthPayload} payload
   * @returns
   * @memberof JwtAuthService
   */
  private async _signAT(payload: JwtAuthPayload) {
    return this._jwt.signAsync(payload, {
      expiresIn: this._config.get<number>('auth.accessTokenExpire'),
      audience: this._config.get<string>('auth.accessTokenAudience'),
      issuer: this._config.get<string>('auth.accessTokenIssuer'),
      secret: this._config.get<string>('auth.accessTokenPrivateKey'),
    });
  }

  // ===========================================================================
  // refresh token
  private async _signRT(refreshedExpire?: number): Promise<string> {
    return this._jwt.signAsync(
      {
        sub: rs.generate(),
      },
      {
        expiresIn:
          refreshedExpire ||
          this._config.get<number>('auth.refreshTokenExpire'),
        audience: this._config.get<string>('auth.refreshTokenAudience'),
        issuer: this._config.get<string>('auth.refreshTokenIssuer'),
        secret: this._config.get<string>('auth.refreshTokenPrivateKey'),
      },
    );
  }

  async validateIgnoreExpireRT(rt: string): Promise<JwtDecodedDefault> {
    return this._jwt.verifyAsync(rt, {
      ignoreExpiration: true,
      audience: this._config.get<string>('auth.refreshTokenAudience'),
      issuer: this._config.get<string>('auth.refreshTokenIssuer'),
      secret: this._config.get<string>('auth.refreshTokenPublicKey'),
    });
  }
}
