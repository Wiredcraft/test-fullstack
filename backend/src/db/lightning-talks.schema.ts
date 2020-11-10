import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class LightningTalk {
  @Prop()
  title: string;

  @Prop()
  votes: number;

  @Prop([String])
  images: string[];

  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: User;
}

export type LightningTalkDocument = LightningTalk & Document;

export const LightningTalkSchema = SchemaFactory.createForClass(LightningTalk);
