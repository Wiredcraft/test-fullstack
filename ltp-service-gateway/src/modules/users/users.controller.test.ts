import * as express from 'express'
import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { UsersModule } from './users.module'
import { UsersService } from './users.service'
import { AuthService } from '../auth/auth.service'
import { LoginDto } from './login.dto'
import { ValidationPipe } from '@nestjs/common';

describe('UsersController', () => {
  const server = express()
  const userService = {
    findByLogin: (loginDto: any) => ({ username: 'FAKE_USERNAME', email: 'FAKE_EMAIL' })
  }
  const authService = {
    createToken: () => ({ access_token: 'FAKE_TOKEN', expires_in: 3600 })
  }

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule]
    })
    .overrideComponent(UsersService).useValue(userService)
    .overrideComponent(AuthService).useValue(authService)
    .compile()

    const app = module.createNestApplication(server)
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  })

  it(`/login will be failed if no parameters provided`, () => {
    return request(server).post('/login').expect(400)
  })

  it(`/login success`, () => {
    return request(server).post('/login')
    .send({ email: 'bgdxiake@qq.com', password: 'password123' })
    .expect(200)
    .expect(Object.assign(userService.findByLogin({}), authService.createToken()))
  })
})
