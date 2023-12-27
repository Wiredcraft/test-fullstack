import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}

  create(createVoteDto: CreateVoteDto) {
    return this.prisma.vote.create({ data: createVoteDto });
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

  update(id: number, updateVoteDto: UpdateVoteDto) {
    return this.prisma.vote.update({
      where: { id },
      data: updateVoteDto,
    });
  }

  remove(id: number) {
    return this.prisma.vote.delete({ where: { id } });
  }
}
