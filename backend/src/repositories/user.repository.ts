import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TestFullstackDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export type Credentials = {
  username: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.test_fullstack') dataSource: TestFullstackDataSource,
  ) {
    super(User, dataSource);
  }
}
