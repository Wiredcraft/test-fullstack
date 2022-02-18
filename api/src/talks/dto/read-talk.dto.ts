import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';

@Expose()
export class ReadTalkDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  user: User;

  @IsNumber()
  voteCount: number;
}
