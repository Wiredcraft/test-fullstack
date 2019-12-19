import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTalkDto {
  @ApiModelProperty()
  @IsNotEmpty()
  title: string;

  @ApiModelProperty()
  @IsNotEmpty()
  description: string;
}
