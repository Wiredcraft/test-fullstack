import { Controller, Post, Body, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { ApiCreatedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LikeEntity } from './entities/like.entity';
import { DeleteLikeDto } from './dto/delete-like.dto';
import { CustomRequest } from 'src/interfaces/customRequest';

@Controller('likes')
@ApiTags('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: LikeEntity })
  create(@Body() createLikeDto: CreateLikeDto, @Req() request: CustomRequest) {
    return this.likesService.create(createLikeDto, request.user);
  }

  @Post('/delete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: LikeEntity })
  delete(@Body() deleteLikeDto: DeleteLikeDto, @Req() request: CustomRequest) {
    return this.likesService.delete(deleteLikeDto, request.user);
  }
}
