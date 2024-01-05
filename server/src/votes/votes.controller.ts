import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtSoftGuard } from 'src/auth/jwt-soft.guard';
import { VoteEntity } from './entities/vote.entity';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

@Controller('votes')
@ApiTags('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: VoteEntity })
  async create(@Body() createVoteDto: CreateVoteDto) {
    const vote = await this.votesService.create(createVoteDto);
    return new VoteEntity(vote);
  }

  @Get()
  @UseGuards(JwtSoftGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: VoteEntity, isArray: true })
  async findAll() {
    const votes = await this.votesService.findAll();
    return votes.map((vote) => new VoteEntity(vote));
  }

  @Get(':id')
  @UseGuards(JwtSoftGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: VoteEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const vote = await this.votesService.findOne(id);
    if (!vote) {
      throw new NotFoundException(`Vote with ${id} does not exist.`);
    }
    return new VoteEntity(vote);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: VoteEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVoteDto: UpdateVoteDto,
  ) {
    return new VoteEntity(await this.votesService.update(id, updateVoteDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: VoteEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new VoteEntity(await this.votesService.remove(id));
  }
}
