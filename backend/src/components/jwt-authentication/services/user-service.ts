import { UserService } from '@loopback/authentication'
import { inject } from '@loopback/core'
import { repository } from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { securityId, UserProfile } from '@loopback/security'
import { UserWithRelations } from '../../../models'
import { Credentials, UserRepository } from '../../../repositories/user.repository'
import { PasswordHasherBindings } from '../keys'
import { PasswordHasher } from './hash.password.bcryptjs'

export class MyUserService implements UserService<UserWithRelations, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER) public passwordHasher: PasswordHasher,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<UserWithRelations> {
    const invalidCredentialsError = 'Username or Password are not match'

    const foundUser = await this.getUser(credentials.username)
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError)
    }

    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      foundUser.password,
    )

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError)
    }

    return foundUser
  }

  convertToUserProfile(user: UserWithRelations): UserProfile {
    const userProfile = {
      [securityId]: `${user.id}`,
      id: user.id,
      username: user.username,
    }
    return userProfile
  }

  private async getUser(username: string): Promise<UserWithRelations | null> {
    return this.userRepository.findOne({
      where: {username: username},
    })
  }
}
