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
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Vote } from '../../talks/entities/vote.entity';

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

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
