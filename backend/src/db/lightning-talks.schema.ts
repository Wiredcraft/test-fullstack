import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class LightningTalk {
  @Prop()
  title: string;

  @Prop()
  votes: number;

  @Prop([String])
  images: string[];
}

export type LightningTalkDocument = LightningTalk & Document;

export const LightningTalkSchema = SchemaFactory.createForClass(LightningTalk);
