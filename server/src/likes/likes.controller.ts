import { Controller, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { ApiCreatedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LikeEntity } from './entities/like.entity';
import { DeleteLikeDto } from './dto/delete-like.dto';

@Controller('likes')
@ApiTags('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: LikeEntity })
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Post('/delete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: LikeEntity })
  delete(@Body() deleteLikeDto: DeleteLikeDto) {
    return this.likesService.delete(deleteLikeDto);
  }
}
