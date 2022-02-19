import { ApiProperty } from '@nestjs/swagger';
import { Talk } from '../entities/talk.entity';

export class ReadTalksDto {
  @ApiProperty({ description: 'The talk objects of the current page.' })
  items: Talk[];

  @ApiProperty({ description: 'The meta information for pagination purposes.' })
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
