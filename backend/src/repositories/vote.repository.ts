import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TestFullstackDataSource} from '../datasources';
import {Vote, VoteRelations, Post, User} from '../models';
import {PostRepository} from './post.repository';
import {UserRepository} from './user.repository';

export class VoteRepository extends DefaultCrudRepository<
  Vote,
  typeof Vote.prototype.id,
  VoteRelations
> {

  public readonly post: BelongsToAccessor<Post, typeof Vote.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Vote.prototype.id>;

  constructor(
    @inject('datasources.test_fullstack') dataSource: TestFullstackDataSource, @repository.getter('PostRepository') protected postRepositoryGetter: Getter<PostRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Vote, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.post = this.createBelongsToAccessorFor('post', postRepositoryGetter,);
    this.registerInclusionResolver('post', this.post.inclusionResolver);
  }
}
