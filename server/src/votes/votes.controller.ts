import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.votesService.create(createVoteDto);
  }

  @Get()
  @ApiOkResponse({ type: VoteEntity, isArray: true })
  findAll() {
    return this.votesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: VoteEntity })
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: VoteEntity })
  update(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    return this.votesService.update(+id, updateVoteDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: VoteEntity })
  remove(@Param('id') id: string) {
    return this.votesService.remove(+id);
  }
}
