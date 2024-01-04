import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserStorage } from 'src/users/user.store';
import { CreateLikeDto } from './dto/create-like.dto';
import { DeleteLikeDto } from './dto/delete-like.dto';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}
  async create(createLikeDto: CreateLikeDto) {
    const user = UserStorage.get();
    if (!user) {
      throw new UnauthorizedException('user not logged in');
    }
    const { voteId } = createLikeDto;
    const existedLike = await this.prisma.like.findFirst({
      where: {
        voteId,
        userId: user.id,
      },
    });
    if (existedLike) {
      throw new BadRequestException(
        `user ${user.id} already liked vote ${voteId}`,
      );
    }
    return this.prisma.like.create({
      data: {
        voteId,
        userId: user.id,
      },
    });
  }

  async delete(deleteLikeDto: DeleteLikeDto) {
    const user = UserStorage.get();
    if (!user) {
      throw new UnauthorizedException('user not logged in');
    }
    const like = await this.prisma.like.findFirst({
      where: {
        voteId: deleteLikeDto.voteId,
        userId: user.id,
      },
    });
    if (!like) {
      throw new NotFoundException(
        `like from user ${user.id} to vote ${deleteLikeDto.voteId} not found`,
      );
    }
    return this.prisma.like.delete({ where: { id: like.id } });
  }
}
