import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Exclude()
  @ManyToOne(() => User, (user) => user.talks, { eager: true })
  user: User;

  @Expose()
  get userName(): string {
    return this.user.name;
  }

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
