import { IsNotEmpty } from "class-validator";
import { Transform, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsValidMongoId } from "src/decorators/is-valid-mongoid.decortor";
import { ObjectID } from "mongodb";
import { Types } from "mongoose";

export class LightningTalkIdParamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsValidMongoId({ message: '$value is not a valid object id!' })
  id: string;
}
