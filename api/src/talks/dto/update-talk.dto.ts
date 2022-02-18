import { PartialType } from '@nestjs/swagger';
import { CreateTalkDto } from './create-talk.dto';

export class UpdateTalkDto extends PartialType(CreateTalkDto) {}
