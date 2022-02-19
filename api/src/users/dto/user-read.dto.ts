import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Vote } from '../../talks/entities/vote.entity';

export class UserReadDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsArray()
  voteTalkIds: string[];
}
