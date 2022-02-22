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
  Post,
} from '../models';
import {VoteRepository} from '../repositories';

export class VotePostController {
  constructor(
    @repository(VoteRepository)
    public voteRepository: VoteRepository,
  ) { }

  @get('/votes/{id}/post', {
    responses: {
      '200': {
        description: 'Post belonging to Vote',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Post)},
          },
        },
      },
    },
  })
  async getPost(
    @param.path.number('id') id: typeof Vote.prototype.id,
  ): Promise<Post> {
    return this.voteRepository.post(id);
  }
}
