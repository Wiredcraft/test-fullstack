import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LightningTalkIdParamDto {
  @ApiProperty()
  @IsMongoId({ message: '$value is not a valid object id' })
  id: string;
}
