// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {TokenService} from '@loopback/authentication'
import {inject} from '@loopback/context'
import {HttpErrors} from '@loopback/rest'
import {securityId, UserProfile} from '@loopback/security'
import {promisify} from 'util'
import {TokenServiceBindings} from '../keys'

const jwt = require('jsonwebtoken')
const signAsync = promisify(jwt.sign)
const verifyAsync = promisify(jwt.verify)

export class JWTService implements TokenService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET)
    private jwtSecret: string,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    private jwtExpiresIn: string,
  ) {}

  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `没有传token`,
      )
    }

    let userProfile: UserProfile

    try {
      // decode user profile from token
      const decodedToken = await verifyAsync(token, this.jwtSecret)
      // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
      userProfile = Object.assign(
        {[securityId]: '', name: ''},
        {
          [securityId]: decodedToken.id,
          name: decodedToken.name,
          id: decodedToken.id,
          role: decodedToken.role,
        },
      )
      // console.log('decoded profile', userProfile)
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Token已过期，请重新登录`,
      )
    }
    return userProfile
  }

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        '无法找到用户资料',
      )
    }
    const userInfoForToken = {
      id: userProfile[securityId],
      name: userProfile.name,
      role: userProfile.role,
    }
    // Generate a JSON Web Token
    let token: string
    try {
      token = await signAsync(userInfoForToken, this.jwtSecret, {
        expiresIn: Number(this.jwtExpiresIn),
      })
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`)
    }

    return token
  }
}
