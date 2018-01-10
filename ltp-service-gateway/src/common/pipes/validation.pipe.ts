import { Pipe, ArgumentMetadata, HttpException, HttpStatus, BadRequestException } from '@nestjs/common'
import { PipeTransform } from '@nestjs/common/interfaces'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Pipe()
export class ValidationPipe implements PipeTransform<any> {

  async transform (value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      throw new BadRequestException()
    }
    return value
  }

  private toValidate (metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find(type => metatype === type)
  }
}