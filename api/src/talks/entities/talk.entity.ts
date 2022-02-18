import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Vote } from './vote.entity';

@Entity()
export class Talk {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.talks)
  user: User;

  @OneToMany(() => Vote, (vote) => vote.talk)
  votes: Vote[];

  @Column({ default: 0 })
  voteCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Talk>) {
    Object.assign(this, partial);
  }
}
