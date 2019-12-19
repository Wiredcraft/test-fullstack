import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Talk extends BaseEntity {
  // auto-increment
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  // author
  @ManyToOne(
    _type => User,
    author => author.createdTalks,
  )
  author: User;

  // likedUsers
  @ManyToMany(
    _type => User,
    liker => liker.likedTalks,
  )
  @JoinTable()
  likedUsers: User[];

  @Column({
    default: 0,
  })
  likedCount: number;
}
