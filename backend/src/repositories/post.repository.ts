import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import { TestFullstackDataSource } from '../datasources';
import { Post, PostRelations, User, Vote} from '../models';
import { UserRepository } from './user.repository';
import { VoteRepository } from './vote.repository';

export class PostRepository extends DefaultCrudRepository<
  Post,
  typeof Post.prototype.id,
  PostRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Post.prototype.id>;

  public readonly votes: HasManyRepositoryFactory<Vote, typeof Post.prototype.id>;

  constructor(
    @inject('datasources.test_fullstack') dataSource: TestFullstackDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('VoteRepository') protected voteRepositoryGetter: Getter<VoteRepository>,
  ) {
    super(Post, dataSource);
    this.votes = this.createHasManyRepositoryFactoryFor('votes', voteRepositoryGetter,);
    this.registerInclusionResolver('votes', this.votes.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
