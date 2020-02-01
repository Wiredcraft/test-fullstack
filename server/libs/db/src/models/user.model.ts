import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';


export type UserDocument = DocumentType<User>;


@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class User {
  @ApiProperty({
      
  })
  @prop({required: true})
  userName: string

  @prop({
    required: true,
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    }
  })
  password: string

  @prop()
  poll: number

}
