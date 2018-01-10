import { Pipe, ArgumentMetadata, HttpStatus } from '@nestjs/common'
import { PipeTransform } from '@nestjs/common/interfaces'
import { HttpException } from '@nestjs/core/exceptions/http-exception'

@Pipe()
export class ParseIntPipe implements PipeTransform<string> {
  async transform (value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10)
    if (isNaN(val)) {
      throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST)
    }
    return val
  }
}