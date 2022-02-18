import * as Factory from 'typeorm-factories';
import { User } from '../users/entities/user.entity';
const { Faker } = require('@faker-js/faker');

Factory.define(User, (faker: typeof Faker) => {
  const user = new User({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    githubId: '12312032131',
  });

  return user;
});

export default Factory;
