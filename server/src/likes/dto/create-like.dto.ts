import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  voteId: number;
}
