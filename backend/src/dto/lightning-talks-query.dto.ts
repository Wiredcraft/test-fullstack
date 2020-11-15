import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class LightningTalksQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  page: string;
}
