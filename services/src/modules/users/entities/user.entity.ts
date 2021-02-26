import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsHash,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BaseTimeStamp } from 'src/common/base-timestamp.entity';
import { Feed } from 'src/modules/feeds/entities/feed.entity';
import { UserFeedVote } from 'src/modules/feeds/entities/user-feed-vote.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id!: string;

  @ApiProperty()
  @Column(() => BaseTimeStamp, { prefix: false })
  @Type(() => BaseTimeStamp)
  timestamp!: BaseTimeStamp;

  // @ApiProperty()
  // @IsEnum(UserRole, { each: true })
  // // @Column({
  // //   // array: true,
  // //   // enum: UserRole,
  // //   // default: [UserRole.USER],
  // // })
  // roles: UserRole[];

  @ApiProperty({
    minLength: 6,
    maxLength: 15,
    example: 'username',
  })
  @MinLength(6, {
    message: 'a username should be longer than 6 characters',
  })
  @MaxLength(15, {
    message: 'a username should not be shorter than 15 characters',
  })
  @IsString()
  @Column({
    unique: true,
  })
  name!: string;

  @ApiProperty({
    example: 'user@feedx.com',
  })
  @Column({
    unique: true,
    select: false,
  })
  @IsEmail()
  email!: string;

  /**
   * the stored password should only be the hashed version
   *
   * @type {string}
   * @memberof User
   */
  @ApiProperty()
  @IsHash('sha1')
  @Column({
    type: 'varchar',
    length: 150,
    select: false,
  })
  passwordHash!: string;

  @ApiProperty()
  @OneToMany(() => Feed, (feed) => feed.createdBy, {
    eager: false,
  })
  posts?: Feed[];

  @ApiProperty()
  @OneToMany(() => UserFeedVote, (r) => r.user, {
    eager: false,
  })
  votes?: UserFeedVote[];

  // Extra sensitive columns, but no strategy implemented for this project
  // @Column({
  //   unique: true,
  //   nullable: true,
  // })
  // These values are `nullable` for insertion, but `unique` at the same time, they conflict
  // TESTED: Conflict for MySQL, but good for Postgres
  // For that add a `AfterInsert` hook for de-conflicts, but no better than to
  // register a `UserEntitySubscriber` to listen to `beforeInsert` events
  // - githubId
  // - wechatId
  // - phone
  // - etc.
  // ================================================================================
  @ApiProperty()
  @Column({
    unique: true,
    nullable: true,
    select: false,
  })
  @IsString()
  githubId?: string;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: true,
    select: false,
  })
  @IsString()
  wechatId?: string;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: true,
    select: false,
  })
  @IsString()
  @IsPhoneNumber('CH')
  phone?: string;
}
