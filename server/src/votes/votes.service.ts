import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';

type VoteWithLikes = Prisma.VoteGetPayload<{
  include: { likes: true };
}>;

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}

  create(createVoteDto: CreateVoteDto, user: UserEntity) {
    if (!user) {
      throw new UnauthorizedException('user not logged in');
    }
    return this.prisma.vote.create({
      data: {
        ...createVoteDto,
        authorId: user.id,
      },
    });
  }

  computedVote(vote: VoteWithLikes, user: UserEntity) {
    const likeCount = vote.likes.length;
    let liked = false;
    if (user) {
      liked = vote.likes.map((item) => item.userId).includes(user.id);
    }
    const { likes, ...voteWithoutLikes } = vote;
    return {
      ...voteWithoutLikes,
      likeCount,
      liked,
    };
  }

  async findAll(user: UserEntity) {
    const votes = await this.prisma.vote.findMany({
      include: {
        likes: true,
      },
    });
    return votes.map((item) => this.computedVote(item, user));
  }

  async findOne(id: number, user: UserEntity) {
    const vote = await this.prisma.vote.findUnique({
      where: { id },
      include: {
        author: true,
        likes: true,
      },
    });
    if (!vote) {
      throw new NotFoundException(`vote ${id} not found`);
    }
    return this.computedVote(vote, user);
  }

  async update(id: number, updateVoteDto: UpdateVoteDto, user: UserEntity) {
    if (!(await this.isVoteAuthor(id, user))) {
      throw new BadRequestException('user is not vote author');
    }
    return this.prisma.vote.update({
      where: { id },
      data: updateVoteDto,
    });
  }

  async remove(id: number, user: UserEntity) {
    if (!(await this.isVoteAuthor(id, user))) {
      throw new BadRequestException('user is not vote author');
    }
    return this.prisma.vote.delete({ where: { id } });
  }

  async isVoteAuthor(voteId, user: UserEntity) {
    if (!user) {
      throw new UnauthorizedException('user not logged in');
    }
    const vote = await this.prisma.vote.findUnique({ where: { id: voteId } });
    if (!vote) {
      throw new NotFoundException(`vote ${voteId} not found`);
    }
    if (!vote.authorId || vote.authorId !== user.id) {
      return false;
    }
    return true;
  }
}
