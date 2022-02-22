import { inject } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  RestBindings,
  Request,
} from '@loopback/rest';
import {Post, PostWithRelations} from '../models';
import {PostRepository, VoteRepository} from '../repositories';
import { needAuthentication } from '../utils/decorators';
import {SecurityBindings, UserProfile} from '@loopback/security'
import { MyUserService, TokenServiceBindings, UserServiceBindings } from '../components/jwt-authentication';
import { TokenService } from '@loopback/authentication';

export class PostController {
  constructor(
    @repository(PostRepository)
    public postRepository : PostRepository,
    @repository(VoteRepository)
    public voteRepository : VoteRepository,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
  ) {}

  @post('/posts')
  @response(200, {
    description: 'Post model instance',
    content: {'application/json': {schema: getModelSchemaRef(Post)}},
  })
  @needAuthentication()
  async create(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Post, {
            title: 'NewPost',
            exclude: ['id'],
          }),
        },
      },
    })
    post: Omit<Post, 'id'>,
  ): Promise<Post> {
    return this.postRepository.create({
      ...post,
      userId: currentUserProfile.id
    });
  }

  @get('/posts/count')
  @response(200, {
    description: 'Post model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Post) where?: Where<Post>,
  ): Promise<Count> {
    return this.postRepository.count(where);
  }

  @get('/posts')
  @response(200, {
    description: 'Array of Post model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Post, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @inject(RestBindings.Http.REQUEST) request: Request,
    @param.filter(Post) filter?: Filter<Post>,
  ): Promise<PostWithRelations[]> {
    const token = request.headers['authorization']
    const posts = await this.postRepository.find(filter);
    if (token) {
      const currentUser = await this.jwtService.verifyToken(token.slice(7))
      return posts.map(post => {
        const voteIds = post.votes?.map(v => v.userId) ?? []
        const hasVote = voteIds.indexOf(+currentUser.id) !== -1
        return {
          ...post,
          hasVote
        } as PostWithRelations
      })
    }
    return posts
  }

  @patch('/posts')
  @response(200, {
    description: 'Post PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Post, {partial: true}),
        },
      },
    })
    post: Post,
    @param.where(Post) where?: Where<Post>,
  ): Promise<Count> {
    return this.postRepository.updateAll(post, where);
  }

  @get('/posts/{id}')
  @response(200, {
    description: 'Post model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Post, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Post, {exclude: 'where'}) filter?: FilterExcludingWhere<Post>
  ): Promise<Post> {
    return this.postRepository.findById(id, filter);
  }

  @patch('/posts/{id}')
  @response(204, {
    description: 'Post PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Post, {partial: true}),
        },
      },
    })
    post: Post,
  ): Promise<void> {
    await this.postRepository.updateById(id, post);
  }

  @patch('/posts/{id}/vote')
  @response(204, {
    description: 'Vote or Unvote post success',
  })
  @needAuthentication()
  async togglePostVote(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
    @param.path.number('id') id: number,
    @requestBody() post: Pick<Post, 'hasVote'>
  ): Promise<void> {
    const currentPost = await this.postRepository.findById(id)
    let voteCount = currentPost.voteCount ?? 0
    if (post.hasVote) { // vote
      voteCount = voteCount + 1
    } else { // unvote
      voteCount = voteCount - 1
    }
    await this.postRepository.updateById(id, { voteCount })
    if (post.hasVote) {
      await this.voteRepository.create({
        postId: currentPost.id,
        userId: currentUserProfile.id
      })
    } else {
      const vote = await this.voteRepository.findOne({
        where: {
          postId: currentPost.id,
          userId: currentUserProfile.id
        }
      })
      if (vote?.id) {
        await this.voteRepository.deleteById(vote.id)
      }
    }
  }

  @put('/posts/{id}')
  @response(204, {
    description: 'Post PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() post: Post,
  ): Promise<void> {
    await this.postRepository.replaceById(id, post);
  }

  @del('/posts/{id}')
  @response(204, {
    description: 'Post DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.postRepository.deleteById(id);
  }
}
