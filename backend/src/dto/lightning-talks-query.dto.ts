import { IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class LightningTalksQueryDto {
  @ApiPropertyOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number = 1;
}
