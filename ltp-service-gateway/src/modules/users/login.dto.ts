import { IsString, IsEmail, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail({}, { message: 'Email format is not valid.' })
  readonly email: string

  @IsString()
  @MinLength(5, { message: 'Password is too short' })
  readonly password: string
}