import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserReadDto {
  @ApiProperty({ description: "The user's id." })
  @Expose()
  id: string;

  @ApiProperty({ description: "The user's display name." })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'An array of all the talks the user has voted for.',
  })
  @Expose()
  voteTalkIds: string[];
}
