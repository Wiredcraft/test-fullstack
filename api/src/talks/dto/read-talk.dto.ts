import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ReadTalkDto {
  @Expose()
  @ApiProperty({ description: 'The talk id.' })
  id: string;


  @Expose()
  @ApiProperty({ description: 'The talk title.' })
  @IsString()
  title: string;

  @Expose()
  @ApiProperty({ description: 'The talk description.' })
  @IsString()
  description: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: "Talk owner's name." })
  userName: string;

  @Expose()
  @ApiProperty({ description: "The talk's current vote count." })
  @IsNumber()
  voteCount: number;

  @Expose()
  @ApiProperty({ description: "The datetime the talk was created." })
  @IsDate()
  createdAt: Date
}
