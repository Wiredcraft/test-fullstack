import { ApiProperty } from '@nestjs/swagger';

export class CreateVoteDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;
}
