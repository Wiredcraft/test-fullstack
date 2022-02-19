import { Expose } from 'class-transformer';
import { IsArray, IsString, } from 'class-validator';

export class LoginReadDto {
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
