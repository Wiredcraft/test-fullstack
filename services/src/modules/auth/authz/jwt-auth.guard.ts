import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_AUTH_STRATEGY_TOKEN } from './jwt-auth.strategy';

/**
 * Not used for this project
 *
 * @export
 * @class JwtAuthGuard
 * @extends {AuthGuard(JWT_AUTH_STRATEGY_TOKEN)}
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_AUTH_STRATEGY_TOKEN) {}
