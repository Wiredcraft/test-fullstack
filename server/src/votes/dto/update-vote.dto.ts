import { PartialType } from '@nestjs/swagger';
import { CreateVoteDto } from './create-vote.dto';

export class UpdateVoteDto extends PartialType(CreateVoteDto) {}
