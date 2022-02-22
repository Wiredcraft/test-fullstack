import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vote,
  User,
} from '../models';
import {VoteRepository} from '../repositories';

export class VoteUserController {
  constructor(
    @repository(VoteRepository)
    public voteRepository: VoteRepository,
  ) { }

  @get('/votes/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Vote',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Vote.prototype.id,
  ): Promise<User> {
    return this.voteRepository.user(id);
  }
}
