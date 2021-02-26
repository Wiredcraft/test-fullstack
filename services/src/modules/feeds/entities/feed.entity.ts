import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { BaseTimeStamp } from 'src/common/base-timestamp.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserFeedVote } from './user-feed-vote.entity';

@Entity({
  orderBy: {
    createdAt: 'DESC',
    // voted: 'DESC',
  },
})
export class Feed {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ApiProperty()
  @Type(() => BaseTimeStamp)
  @Column(() => BaseTimeStamp, { prefix: false })
  timestamp!: BaseTimeStamp;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  @Column({
    type: 'text',
    unique: false,
  })
  title!: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'text',
    nullable: true,
    unique: false,
  })
  description?: string;

  // @Column({
  //   nullable: true,
  // })
  // source?: string;

  // @Column()
  // thumbnail?: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.posts, {
    cascade: ['update', 'update', 'remove'],
    eager: false,
  })
  createdBy!: User;

  @ApiProperty()
  @OneToMany(() => UserFeedVote, (r) => r.feed, {
    eager: false,
  })
  votes!: UserFeedVote[];
}
