import * as jwt from 'jsonwebtoken'
import { Component } from '@nestjs/common'
import config from '../../configs'

@Component()
export class AuthService {
  async createToken (user: any) {
    const expiresIn = config['jwtExpiresIn']
    const privateKey = config['jwtRS256PrivKey']
    const token = jwt.sign(user, privateKey, { expiresIn, algorithm: 'RS256' })
    return {
      expires_in: expiresIn,
      access_token: token
    }
  }

  async validateUser (payload) {
    // TODO: implement the real logic
    return true
  }
}