import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeStamp } from 'src/common/base-timestamp.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Feed } from './feed.entity';

@Entity()
// Add composite index from (userId, feedId) with unique constraint
@Index(['userId', 'feedId'], { unique: true })
export class UserFeedVote {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public postToCategoryId!: string;

  @ApiProperty()
  @Column(() => BaseTimeStamp, { prefix: false })
  timestamp!: BaseTimeStamp;

  @ApiProperty()
  @Column()
  userId!: string;

  @ApiProperty()
  @Column()
  feedId!: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.votes)
  public user!: User;

  @ApiProperty()
  @ManyToOne(() => Feed, (feed) => feed.votes)
  public feed!: Feed;
}
