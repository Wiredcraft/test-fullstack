import { Exclude } from 'class-transformer';
import { Talk } from '../../talks/entities/talk.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  @Exclude()
  githubId: string;

  @OneToMany(() => Talk, (talk) => talk.user)
  talks: Talk[];

  @ManyToMany(() => Talk, (talk) => talk.votes)
  @JoinTable()
  talkVotes: Talk[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
