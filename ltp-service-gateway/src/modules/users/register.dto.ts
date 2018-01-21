import { LoginDto } from './login.dto'
import { MinLength } from 'class-validator'

export class RegisterDto extends LoginDto {
  @MinLength(5, { message: 'Username is too short' })
  readonly username: string
}