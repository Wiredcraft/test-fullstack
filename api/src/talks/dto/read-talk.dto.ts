import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Expose()
export class ReadTalkDto {
  @ApiProperty({ description: 'The talk id.' })
  id: string;

  @ApiProperty({ description: 'The talk title.' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The talk description.' })
  @IsString()
  description: string;

  @ApiProperty({ description: "Talk owner's name." })
  userName: string;

  @ApiProperty({ description: "The talk's current vote count." })
  @IsNumber()
  voteCount: number;
}
