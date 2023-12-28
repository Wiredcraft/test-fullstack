import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserStorage } from 'src/users/user.store';

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}

  create(createVoteDto: CreateVoteDto) {
    const user = UserStorage.get();
    return this.prisma.vote.create({
      data: {
        ...createVoteDto,
        authorId: user.id,
      },
    });
  }

  findAll() {
    return this.prisma.vote.findMany();
  }

  findOne(id: number) {
    return this.prisma.vote.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  async checkVoteAuthor(voteId) {
    const user = UserStorage.get();
    const vote = await this.prisma.vote.findUnique({ where: { id: voteId } });
    if (!vote.authorId || vote.authorId !== user.id) {
      throw new UnauthorizedException('user is not the vote author');
    }
    return;
  }

  async update(id: number, updateVoteDto: UpdateVoteDto) {
    await this.checkVoteAuthor(id);
    return this.prisma.vote.update({
      where: { id },
      data: updateVoteDto,
    });
  }

  async remove(id: number) {
    await this.checkVoteAuthor(id);
    return this.prisma.vote.delete({ where: { id } });
  }
}
