import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateTalkDto {
  @ApiProperty({
    description: 'The title of the talk',
    minimum: 4,
    maximum: 64,
  })
  @Length(4, 64)
  title: string;

  @ApiProperty({
    description: 'The description of the talk',
    minimum: 1,
    maximum: 140,
  })
  @Length(10, 140)
  description: string;
}
