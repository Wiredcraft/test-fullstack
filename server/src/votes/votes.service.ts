import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserStorage } from 'src/users/user.store';
import { Prisma } from '@prisma/client';

type VoteWithLikes = Prisma.VoteGetPayload<{
  include: { likes: true };
}>;

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}

  create(createVoteDto: CreateVoteDto) {
    const user = UserStorage.get();
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

  computedVote(vote: VoteWithLikes) {
    const likeCount = vote.likes.length;
    const user = UserStorage.get();
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

  async findAll() {
    const votes = await this.prisma.vote.findMany({
      include: {
        likes: true,
      },
    });
    return votes.map((item) => this.computedVote(item));
  }

  async findOne(id: number) {
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
    return this.computedVote(vote);
  }

  async update(id: number, updateVoteDto: UpdateVoteDto) {
    if (!(await this.isVoteAuthor(id))) {
      throw new BadRequestException('user is not vote author');
    }
    return this.prisma.vote.update({
      where: { id },
      data: updateVoteDto,
    });
  }

  async remove(id: number) {
    if (!(await this.isVoteAuthor(id))) {
      throw new BadRequestException('user is not vote author');
    }
    return this.prisma.vote.delete({ where: { id } });
  }

  async isVoteAuthor(voteId) {
    const user = UserStorage.get();
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
