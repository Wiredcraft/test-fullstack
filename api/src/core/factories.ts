import { Factory, SubFactory } from '@linnify/typeorm-factory';
import { faker } from '@faker-js/faker';

import { User } from '../users/entities/user.entity';
import { Talk } from '../talks/entities/talk.entity';

export class UserFactory extends Factory<User> {
  entity = User;

  name = faker.name.findName();
  githubId = faker.datatype.uuid();
}

export class TalkFactory extends Factory<Talk> {
  entity = Talk;

  title = faker.company.catchPhrase();
  description = faker.hacker.phrase();

  voteCount = faker.datatype.number({ min: 1, max: 500})

  user = new SubFactory(UserFactory);
}

