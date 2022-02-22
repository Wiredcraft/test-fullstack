// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {TokenService, UserService} from '@loopback/authentication'
import {BindingKey} from '@loopback/context'
import {User} from '../../models'
import {Credentials} from '../../repositories/user.repository'
import {PasswordHasher} from './services/hash.password.bcryptjs'

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = '^z:i<JIb=k1=WQ5ymq'
  export const TOKEN_EXPIRES_IN_VALUE = '31536000'
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  )
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  )
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  )
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  )
  export const ROUNDS = BindingKey.create<number>('services.hasher.round')
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<User, Credentials>>(
    'services.user.service',
  )
}
