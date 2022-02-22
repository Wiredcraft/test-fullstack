import { inject } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import { SecurityBindings, UserProfile } from '@loopback/security'
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  tags,
} from '@loopback/rest';
import { JWTStrategyName, MyUserService, OPERATION_SECURITY_SPEC, PasswordHasherBindings, TokenServiceBindings, UserServiceBindings } from '../components/jwt-authentication';
import { PasswordHasher } from '../components/jwt-authentication/services/hash.password.bcryptjs';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';
import { pick } from 'lodash'
import { LoginRequest, LoginResponse } from './specs/user-controller.specs';
import { authenticate, TokenService } from '@loopback/authentication';
import { needAuthentication } from '../utils/decorators';

@tags('User Management')
export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
  ) {}

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<LoginResponse> {
    const password = await this.passwordHasher.hashPassword(user.password)

    const newUser = await this.userRepository.create({
      ...user,
      password
    });
    const userProfile = this.userService.convertToUserProfile(newUser)
    const token = await this.jwtService.generateToken(userProfile)
    return { token, user: pick(newUser, 'username') }
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': { schema: getModelSchemaRef(LoginResponse) }
        }
      }
    },
    summary: 'Login'
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LoginRequest)
        }
      }
    })
    credentials: Credentials,
  ): Promise<LoginResponse> {
    const user = await this.userService.verifyCredentials(credentials)
    const userProfile = this.userService.convertToUserProfile(user)
    const token = await this.jwtService.generateToken(userProfile)
    return { token, user: pick(user, 'username') }
  }

  @post('/users/refresh_token', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {schema: getModelSchemaRef(LoginResponse)},
        },
      },
    },
    summary: '手机号密码登录',
  })
  @needAuthentication()
  async refreshToken(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
  ): Promise<LoginResponse> {
    const user = await this.userRepository.findById(currentUserProfile.id)
    const userProfile = this.userService.convertToUserProfile(user)
    const token = await this.jwtService.generateToken(userProfile)
    return {token, user: pick(user, 'username') }
  }

  @get('/users/count', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
    summary: 'Get user count',
  })
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate(JWTStrategyName)
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @get('/users/me', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user profile',
        content: {'application/json': {schema: getModelSchemaRef(User, {partial: true})}},
      },
    },
    summary: 'Get current user profile',
  })
  @needAuthentication()
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findById(currentUserProfile.id)
    return pick(user, 'username')
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
