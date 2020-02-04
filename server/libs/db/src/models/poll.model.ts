import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';


@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Poll {
  @ApiProperty({
      
  })
  @prop({required: true})
  title: string

  @prop({required: true})
  description: string

  @prop()
  poll: number

  @prop({select: false})
  userId: string

  @prop()
  userName: string

}

