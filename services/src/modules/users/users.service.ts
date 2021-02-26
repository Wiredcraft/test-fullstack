import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getCustomRepository, Repository } from 'typeorm';
import { GeneralCreateUserPayload } from './dto/CreateUser.dto';
import {
  UserFields,
  UserProfileAuthtIntermediate,
  USER_PROFILE_KEYS_QB_AUHT_INTERMEDIATE,
} from './dto/UserProfile.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UsersService {
  private readonly _customUserRepo = getCustomRepository(UserRepository);

  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
  ) {}

  createOne(user: GeneralCreateUserPayload) {
    return this._customUserRepo.createOne(user);
  }

  findUserProfile(id: string, fields: UserFields) {
    return this._customUserRepo.findOneById(id, {
      fields: fields,
    });
  }

  /**
   * Similar to `findIntermediateOneWithLocalAuthtInputs`, but only get `count`
   *
   * @param {string} nameOrEmail
   * @memberof UsersService
   */
  async getCountByNameOrEmail(nameOrEmail: string): Promise<number> {
    return await this._userRepo
      .createQueryBuilder('user')
      .where('user.name = :userName', { userName: nameOrEmail })
      .orWhere('user.email = :userEmail', { userEmail: nameOrEmail })
      .getCount();
  }

  /**
   * - Used only for local authentication.
   * - Returns sensitive field `passwordHash` for compare
   * - Doesn't get returned to client
   *
   * @param {string} identifier
   * @returns
   * @memberof UsersService
   */
  async findIntermediateOneWithLocalAuthtInputs(
    identifier: string,
  ): Promise<UserProfileAuthtIntermediate> {
    const user = await this._userRepo
      .createQueryBuilder('user')
      .where('user.name = :userName', { userName: identifier })
      .orWhere('user.email = :userEmail', { userEmail: identifier })
      // not type safe, lol
      .select([...USER_PROFILE_KEYS_QB_AUHT_INTERMEDIATE])
      .getOne();
    // do not fail, let the invoker resolve
    // .getOneOrFail();

    return user;

    // .leftJoinAndMapOne('ir.sender', 'user', 'sender', 'sender.id = ir.sender')
    // .createQueryBuilder("post")
    // .leftJoin("post.tags", "tag")
    // .leftJoinAndMapOne(
    //   "post.news",
    //   NewsPost,
    //   "news",
    //   "news.id = post.relationId AND(post.type = 'news')",
    // )
    // .leftJoinAndMapOne(
    //   "post.event",
    //   EventPost,
    //   "event",
    //   "event.id = post.relationId AND(post.type = 'event')",
    // )
    // .select([...POST_LIST_ITEM_KEY_PATHS, "news", "event"])
    // .orderBy("news.createdAt", "DESC")
    // .orderBy("event.createdAt", "DESC")
    // .addOrderBy("post.sortIndex", "DESC");
  }
  // findMany<T extends FindManyUserArgs>(args: Subset<T, FindManyUserArgs>) {
  //   return this.prisma.user.findMany(args);
  // }
  // findOne<T extends FindOneUserArgs>(args: Subset<T, FindOneUserArgs>) {
  //   return this.prisma.user.findOne(args);
  // }
  // async create<T extends UserCreateArgs>(args: Subset<T, UserCreateArgs>) {
  //   return this.prisma.user.create<T>({
  //     ...args,

  //     data: {
  //       ...args.data,
  //       password: await this.passwordService.hash(args.data.password),
  //     },
  //   });
  // }
  // async update<T extends UserUpdateArgs>(args: Subset<T, UserUpdateArgs>) {
  //   return this.prisma.user.update<T>({
  //     ...args,

  //     data: {
  //       ...args.data,

  //       password:
  //         args.data.password &&
  //         (await transformStringFieldUpdateInput(
  //           args.data.password,
  //           (password) => this.passwordService.hash(password),
  //         )),
  //     },
  //   });
  // }
  // delete<T extends UserDeleteArgs>(args: Subset<T, UserDeleteArgs>) {
  //   return this.prisma.user.delete(args);
  // }
}
