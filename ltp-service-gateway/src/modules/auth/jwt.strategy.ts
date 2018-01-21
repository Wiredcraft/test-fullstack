import * as passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Component, Inject } from '@nestjs/common'
import { AuthService } from './auth.service'
import config from '../../configs'

@Component()
export class JwtStrategy extends Strategy {
  constructor (private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: config['jwtRS256PubKey']
      },
      async (req, payload, next) => this.verify(req, payload, next)
    )
    passport.use(this)
  }

  public async verify (req, payload, done) {
    const isValid = await this.authService.validateUser(payload)
    req.user = payload
    if (!isValid) {
      return done('Unauthorized', false)
    }
    done(null, payload)
  }
}