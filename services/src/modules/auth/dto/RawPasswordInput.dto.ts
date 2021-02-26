import { ApiProperty } from '@nestjs/swagger';
import { Matches, MaxLength, MinLength } from 'class-validator';

export class RawPasswordInput {
  @ApiProperty({
    maxLength: 42,
    minLength: 8,
    example: 'pAs8word',
  })
  @MinLength(8, {
    message: 'password should be no shorter than 8 characters',
  })
  @MaxLength(42, {
    message: 'password should be no longer than 42 characters',
  })
  @Matches(/^(?=\w*[A-Za-z])(?=\w*\d)[^\W]*$/, {
    message: 'The password should contain at leset a number and a letter',
  })
  password: string;
}
