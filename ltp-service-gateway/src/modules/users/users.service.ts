import { Component, Inject, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { Model } from 'mongoose'
import { User } from './user.interface'
import { RegisterDto } from './register.dto'
import { LoginDto } from './login.dto'

@Component()
export class UsersService {
  constructor (
    @Inject('UserModelToken') private readonly userModel: Model<User>
  ) {}

  async register (registerDto: RegisterDto): Promise<Boolean> {
    const createdUser = new this.userModel(registerDto)
    try {
      const savedUser = await createdUser.save()
      if (savedUser) return true
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('Email already exists')
      }
      console.error(err)
      throw new InternalServerErrorException()
    }
  }

  async findByLogin (loginDto: LoginDto): Promise<User> {
    const userFound = await this.userModel.findOne({ email: loginDto.email })
    if (!userFound) {
      throw new BadRequestException('Can not find user by email ' + loginDto.email)
    }
    if ((userFound as any).comparePassword(loginDto.password)) {
      return userFound
    } else {
      throw new BadRequestException('Password is wrong.')
    }
  }
}