import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
/**
 * Used in:
 * - Get(':id')
 * - Patch(':id')
 * - Delete(':id')
 *
 * @export
 * @class EntityWhereUniqueInput
 */
export class EntityWhereUniqueInput {
  @ApiProperty()
  @IsUUID()
  id!: string;
}
