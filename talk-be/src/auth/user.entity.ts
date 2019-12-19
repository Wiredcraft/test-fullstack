import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Talk } from '../talks/talk.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  // createdTalks
  @OneToMany(
    _type => Talk,
    talk => talk.author,
  )
  createdTalks: Talk[];

  // likedTalks
  @ManyToMany(
    _type => Talk,
    talk => talk.likedUsers,
  )
  likedTalks: Talk[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
