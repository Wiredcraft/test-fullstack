import { Vote } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

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

  @ApiProperty({ required: false, nullable: true })
  authorId: number | null;

  @ApiProperty({ required: false, type: UserEntity })
  author?: UserEntity;

  @ApiProperty()
  likes: number;

  constructor({ author, ...data }: Partial<VoteEntity>) {
    Object.assign(this, data);
    if (author) {
      this.author = new UserEntity(author);
    }
  }
}
