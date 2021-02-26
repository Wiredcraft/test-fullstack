import { ApiProperty } from '@nestjs/swagger';

export class EntityPaginationQuery {
  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  page?: number = 1;
}
