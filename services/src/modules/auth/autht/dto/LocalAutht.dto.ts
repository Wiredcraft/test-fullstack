import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * No type validation needed, cuz there is compare ahead
 *
 * @export
 * @class LocalAuthtInput
 */
export class LocalAuthtInput {
  /**
   * could be:
   * - user name
   * - email for this project
   * - phone number, not implemented for this project
   *
   * @type {string}
   * @memberof LocalAuthtInput
   */
  @ApiProperty()
  @IsString()
  identifier!: string;

  /**
   * raw password
   *
   * @type {string}
   * @memberof LocalAuthtInput
   */
  @ApiProperty()
  @IsString()
  password!: string;
}
