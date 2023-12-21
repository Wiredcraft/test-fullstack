import { Vote } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class VoteEntity implements Vote {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
