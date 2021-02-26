import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ExtendedRequest } from 'src/common/ext-request.interface';
import {
  UserProfileAccessToken,
  USER_PROFILE_KEYS_ACCESS_TOKEN,
} from 'src/modules/users/dto/UserProfile.dto';
import { UsersService } from 'src/modules/users/users.service';
import {
  JwtAuthPayloadDecoded,
  JwtDecodedDefault,
} from './jwt-auth-payload.interface';
import { JwtAuthService } from './jwt-auth.service';

@Injectable()
export class SessionJwtAuthGuard implements CanActivate {
  constructor(private readonly _moduleRef: ModuleRef) {}

  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const request = context.switchToHttp().getRequest();
  //   const user = await this.authSerivice.checkSessionUserInfo(
  //     request.session.user as UserProfileAccessToken,
  //   );
  //   request.user = user;
  //   return true;
  // }
  async canActivate(context: ExecutionContext) {
    const req: ExtendedRequest = context.switchToHttp().getRequest();
    // this skips strict injection check, as it's a util service invoked across modules
    const jwtAuth = this._moduleRef.get(JwtAuthService, { strict: false });
    // this skips strict injection check, as it's a util service invoked across modules
    const usersService = this._moduleRef.get(UsersService, { strict: false });

    const session = req.session;
    const { at: accessToken, rt: refreshToken } = session;

    let authPayload: JwtAuthPayloadDecoded;
    // validate without expire check
    try {
      authPayload = await jwtAuth.validateIgnoreExpireAT(accessToken);
    } catch (e) {
      // invalid access token, block and expire immdediately
      throw new UnauthorizedException();
    }
    // check expire
    const expLeft = jwtAuth.getExpirationLeft(authPayload.exp);
    const isAccessTokenExpired = expLeft <= 0;
    if (isAccessTokenExpired) {
      // renew access token with current no expire refresh token
      return this._renewExpiredValidAccessToken(
        authPayload.sub,
        jwtAuth,
        usersService,
        req,
        refreshToken,
      );
    } else {
      const { sub, ...userWithDecodedTokenDefaults } = authPayload;
      req.user = {
        ...new UserProfileAccessToken(userWithDecodedTokenDefaults),
        id: sub,
      };
      return true;
    }
  }

  /**
   * renew access token with current no expire refresh token,
   *
   * - perform an additiaonl latest user profile fetch as well (refresh)
   * - this step is done silently in the backend (compared to the `Authorizaiton` Header approach)
   *
   *
   * @private
   * @param {string} userId
   * @param {JwtAuthService} jwtAuth
   * @param {UsersService} usersService
   * @param {ExtendedRequest} req
   * @param {string} refreshToken
   * @returns {Promise<boolean>}
   * @memberof SessionJwtAuthGuard
   */
  private async _renewExpiredValidAccessToken(
    userId: string,
    jwtAuth: JwtAuthService,
    usersService: UsersService,
    req: ExtendedRequest,
    refreshToken: string,
  ): Promise<boolean> {
    let refreshTokenDecoded: JwtDecodedDefault;
    // validate without expire check
    try {
      refreshTokenDecoded = await jwtAuth.validateIgnoreExpireRT(refreshToken);
    } catch (e) {
      // invalid refresh token, block and expire immdediately
      throw new UnauthorizedException();
    }
    // check expire
    const expLeft = jwtAuth.getExpirationLeft(refreshTokenDecoded.exp);
    const isRefreshTokenExpired = expLeft <= 0;
    if (isRefreshTokenExpired) {
      // refresh token expire, should login again
      throw new UnauthorizedException();
    } else {
      const refreshedProfile = new UserProfileAccessToken(
        await usersService.findUserProfile(userId, [
          ...USER_PROFILE_KEYS_ACCESS_TOKEN,
        ]),
      );

      const { id, ...restProfile } = refreshedProfile;
      const { at, rt } = await jwtAuth.signTokensAsync(
        {
          ...restProfile,
          sub: id,
        },
        expLeft,
      );

      req.session.at = at;
      req.session.rt = rt;

      req.user = refreshedProfile;

      return true;
    }
  }
}
