import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Talk } from './talk.entity';

@Entity()
export class Vote {
  @ManyToOne(() => User, (user) => user.votes, { primary: true })
  user: User;

  @RelationId((vote: Vote) => vote.user)
  userId: string;

  @ManyToOne(() => Talk, (talk) => talk.votes, { primary: true })
  talk: Talk;

  @RelationId((vote: Vote) => vote.talk)
  talkId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Vote>) {
    Object.assign(this, partial);
  }
}
