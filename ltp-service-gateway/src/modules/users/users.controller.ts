import { Controller, Post, Body, Get, Request } from '@nestjs/common'
import { LoginDto } from './login.dto'
import { RegisterDto } from './register.dto'
import { UsersService } from './users.service'
import { AuthService } from '../auth/auth.service'

@Controller()
export class UserPublicController {
  constructor (
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}
  @Post('/login')
  async login (@Body() loginDto: LoginDto) {
    const userFound = await this.userService.findByLogin(loginDto)
    const token = await this.authService.createToken({ id: userFound.id })
    return { username: userFound.username, email: userFound.email, ...token }
  }

  @Post('/register')
  async register (@Body() registerDto: RegisterDto) {
    const regResult = await this.userService.register(registerDto)
    return { message: 'success' }
  }
}

@Controller('/api/users')
export class UserApiController {
  constructor (
    private readonly authService: AuthService
  ) {}
  @Get('/refresh-token')
  async refreshToken (@Request() req: Request) {
    // TODO: should disable the previous token
    return this.authService.createToken({ id: (req as any).user.id })
  }
}