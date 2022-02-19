import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { UserReadDto } from '../../users/dto/user-read.dto';

@Expose()
export class ReadTalkDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  user: UserReadDto;

  @IsNumber()
  voteCount: number;
}
