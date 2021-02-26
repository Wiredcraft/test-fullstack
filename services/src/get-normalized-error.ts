import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class NormalizedException extends HttpException {
  @ApiProperty()
  statusCode!: number;
  @ApiProperty()
  message!: string;
}

export function getNormalizedException(creator: typeof HttpException) {
  // const err = new creator()
  // return new err {
  //   // @ApiProperty()
  //   statusCode!: err.;
  //   // @ApiProperty()
  //   message!: string;
  // };
}
