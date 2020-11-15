import { IsString, IsNotEmpty, IsAlphanumeric, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDataDto {
  @ApiProperty()
  @MaxLength(18)
  @IsAlphanumeric()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @MinLength(6)
  @IsAlphanumeric()
  @IsNotEmpty()
  @IsString()
  password: string;
}
