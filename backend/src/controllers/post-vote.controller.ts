import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Post,
  Vote,
} from '../models';
import {PostRepository} from '../repositories';

export class PostVoteController {
  constructor(
    @repository(PostRepository) protected postRepository: PostRepository,
  ) { }

  @get('/posts/{id}/votes', {
    responses: {
      '200': {
        description: 'Array of Post has many Vote',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vote)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vote>,
  ): Promise<Vote[]> {
    return this.postRepository.votes(id).find(filter);
  }

  @post('/posts/{id}/votes', {
    responses: {
      '200': {
        description: 'Post model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vote)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Post.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vote, {
            title: 'NewVoteInPost',
            exclude: ['id'],
            optional: ['postId']
          }),
        },
      },
    }) vote: Omit<Vote, 'id'>,
  ): Promise<Vote> {
    return this.postRepository.votes(id).create(vote);
  }

  @patch('/posts/{id}/votes', {
    responses: {
      '200': {
        description: 'Post.Vote PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vote, {partial: true}),
        },
      },
    })
    vote: Partial<Vote>,
    @param.query.object('where', getWhereSchemaFor(Vote)) where?: Where<Vote>,
  ): Promise<Count> {
    return this.postRepository.votes(id).patch(vote, where);
  }

  @del('/posts/{id}/votes', {
    responses: {
      '200': {
        description: 'Post.Vote DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vote)) where?: Where<Vote>,
  ): Promise<Count> {
    return this.postRepository.votes(id).delete(where);
  }
}
