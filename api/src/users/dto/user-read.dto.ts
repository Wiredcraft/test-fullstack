import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class UserReadDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @Exclude()
  githubId: string;

  constructor() {}
}
