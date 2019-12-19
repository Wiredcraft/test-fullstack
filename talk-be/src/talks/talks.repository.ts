import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { BadRequestException, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Talk } from './talk.entity';
import { CreateTalkDto } from './dto/create-talk.dto';
import { User } from '../auth/user.entity';
import { LogMethodArgs } from '../utils/decorators';

@EntityRepository(Talk)
export class TalksRepository extends Repository<Talk> {
  private logger = new Logger('TalksRepository');
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super();
  }

  @LogMethodArgs()
  async createTalk(createTalkDto: CreateTalkDto, user: User): Promise<Talk> {
    const { title, description } = createTalkDto;
    const talk = new Talk();
    talk.title = title;
    talk.description = description;
    talk.author = user;
    try {
      await this.save(talk);
      return talk;
    } catch ({ stack }) {
      const params = `call with args: ${JSON.stringify(arguments)}`;
      const method = 'Method name: createTalk fails';
      const reason = `reason: unknown`;
      this.logger.error(`${method},${reason},${params}`, stack);
      throw new InternalServerErrorException();
    }
  }

  @LogMethodArgs()
  async get(): Promise<Talk[]> {
    // Solution 1 (current ): Transaction
    //    1. change middle table (talk-user) update the relation.
    //    2: likeCount + 1
    //
    // Solution 2: Middle table group by count(userID) order by count
    const query = this.createQueryBuilder('talk').orderBy('talk.likedCount', 'DESC');
    try {
      return await query.getMany();
    } catch ({ stack }) {
      const params = `call with args: ${JSON.stringify(arguments)}`;
      const method = 'Method name: get fails';
      const reason = `reason: unknown`;
      this.logger.error(`${method},${reason},${params}`, stack);
      throw new InternalServerErrorException();
    }
  }

  async likeProcess(id: number, user: User): Promise<Talk> {
    try {
      // Step 1: change middle table (talk-user) update the relation.
      await this.createQueryBuilder('talk')
        .relation('likedUsers')
        .of(id)
        .add(user);
      // Step 2: likeCount + 1
      await this.createQueryBuilder('talk')
        .update()
        .set({ likedCount: () => '"likedCount"+1' })
        .where('id = :id', { id })
        .execute();
      const talk = new Talk();
      talk.id = id;
      return talk;
    } catch (error) {
      const { code, stack } = error;
      let reason: string;
      const method = 'Method name: get fails';
      const params = `call with args: ${JSON.stringify(arguments)}`;
      switch (code) {
        case '23505': {
          reason = `reason: current user already liked the talk`;
          this.logger.log(`${method},${reason},${params}`);
          throw new BadRequestException(reason);
        }
        case '23503': {
          reason = `talk not found`;
          this.logger.log(`${method},${reason},${params}`);
          throw new NotFoundException(reason);
        }
        default: {
          reason = `unknown`;
          this.logger.error(`${method},${reason},${params}`, stack);
          throw new InternalServerErrorException();
        }
      }
    }
  }

  @LogMethodArgs()
  async like(id: number, user: User): Promise<Talk> {
    return await this.entityManager.transaction(async () => {
      return await this.likeProcess(id, user);
    });
  }
}
