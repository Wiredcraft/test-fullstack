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
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { VoteEntity } from './entities/vote.entity';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

@Controller('votes')
@ApiTags('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @ApiCreatedResponse({ type: VoteEntity })
  async create(@Body() createVoteDto: CreateVoteDto) {
    return new VoteEntity(await this.votesService.create(createVoteDto));
  }

  @Get()
  @ApiOkResponse({ type: VoteEntity, isArray: true })
  async findAll() {
    const votes = await this.votesService.findAll();
    return votes.map((vote) => new VoteEntity(vote));
  }

  @Get(':id')
  @ApiOkResponse({ type: VoteEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const vote = await this.votesService.findOne(id);
    if (!vote) {
      throw new NotFoundException(`Vote with ${id} does not exist.`);
    }
    return new VoteEntity(vote);
  }

  @Patch(':id')
  @ApiOkResponse({ type: VoteEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVoteDto: UpdateVoteDto,
  ) {
    return new VoteEntity(await this.votesService.update(id, updateVoteDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: VoteEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new VoteEntity(await this.votesService.remove(id));
  }
}
