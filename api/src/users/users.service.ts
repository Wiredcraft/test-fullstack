import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from '../talks/entities/vote.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserReadDto } from './dto/user-read.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return user;
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOneOrFail({ id });
  }

  async findOneWithTaskVotes(id: string): Promise<User> {
    const res = await this.usersRepository.findOneOrFail(id, {
      relations: ['votes'],
    });

    // flatten votes to just talkids
    res.voteTalkIds = res.votes.map((v) => v.talkId);
    return res;
  }

  async findOneByGithubId(githubId: string): Promise<User> {
    const res = await this.usersRepository.findOneOrFail(
      { githubId },
      {
        relations: ['votes'],
      },
    );

    // flatten votes to just talkids
    res.voteTalkIds = res.votes.map((v) => v.talkId);
    return res;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update({ id }, updateUserDto);
    return await this.findOne(id);
  }
}
