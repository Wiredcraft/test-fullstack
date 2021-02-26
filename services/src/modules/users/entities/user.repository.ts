import { AbstractRepository, EntityRepository } from 'typeorm';
import { GeneralCreateUserPayload } from '../dto/CreateUser.dto';
import { GeneralUserProfile } from '../dto/UserProfile.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  async findOneById(
    id: string,
    payload: {
      fields: Partial<keyof User>[];
    },
  ): Promise<GeneralUserProfile> {
    return this.repository
      .createQueryBuilder()
      .where(id)
      .select(payload.fields)
      .getOne();
  }

  async createOne(user: GeneralCreateUserPayload): Promise<GeneralUserProfile> {
    const createdUser = await this.repository.create(user);
    this.repository.insert(createdUser);
    return createdUser;
  }
}
