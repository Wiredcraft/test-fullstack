import { Like } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LikeEntity implements Like {
  @ApiProperty()
  id: number;

  @ApiProperty()
  voteId: number;

  @ApiProperty()
  userId: number;
}
