import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateTalkDto } from './dto/create-talk.dto';
import { Talk } from './entities/talk.entity';
import { Vote } from './entities/vote.entity';
import { SortTypes } from './talks.controller';

@Injectable()
export class TalksService {
  constructor(
    @InjectRepository(Talk)
    private readonly talksRepository: Repository<Talk>,
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
  ) {}

  /**
   * Creates a new talk given the params. Also creates a vote by the
   * talk owner, because, of course you're gonna vote for yourself.
   *
   * @param {string} userId
   * @param {CreateTalkDto} createTalkDto
   * @return {*}  {Promise<Talk>}
   * @memberof TalksService
   */
  async create(userId: string, createTalkDto: CreateTalkDto): Promise<Talk> {
    const user = new User({ id: userId });

    const talk = this.talksRepository.create({
      ...createTalkDto,
      user,
    });

    await this.talksRepository.save(talk);

    const vote = this.votesRepository.create({
      talk,
      user,
    });

    await this.votesRepository.save(vote);

    return talk;
  }

  /**
   * Get all talks, paginated by 20 entries. You can sort by
   * 'popular' and 'newest'.
   *
   * @param {IPaginationOptions} options
   * @param {SortTypes} sort
   * @return {*}  {Promise<Pagination<Talk>>}
   * @memberof TalksService
   */
  async findAll(
    options: IPaginationOptions,
    sort: SortTypes,
  ): Promise<Pagination<Talk>> {
    const order =
      sort === 'popular'
        ? { voteCount: 'DESC' as const }
        : { createdAt: 'DESC' as const };

    return paginate<Talk>(this.talksRepository, options, { order });
  }

  /**
   * Attempts to delete a vote, and if affected = 0, create a new vote.
   *
   * @param {string} userId
   * @param {string} talkId
   * @return {*}  {Promise<boolean>}
   * @memberof TalksService
   */
  async addOrDeleteVote(userId: string, talkId: string): Promise<boolean> {
    const user = new User({ id: userId });
    const talk = new Talk({ id: talkId });
    const { affected } = await this.votesRepository.delete({ user, talk });

    if (affected == 0) {
      const vote = this.votesRepository.create({
        user,
        talk,
      });

      await this.votesRepository.save(vote);

      return true;
    } else {
      this.talksRepository.manager.decrement(
        Talk,
        { id: talkId },
        'voteCount',
        1,
      );
      return false;
    }
  }
}
