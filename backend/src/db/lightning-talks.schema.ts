import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class LightningTalk {
  @Prop()
  title: string;

  @Prop()
  votes: number;

  @Prop()
  store: string;

  @Prop()
  rawFile: {
    name: string;
    mimetype: string;
    filename: string;
    size: number;
  };

  @Prop([String])
  images?: string[];

  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: User;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type LightningTalkDocument = LightningTalk & Document;

export const LightningTalkSchema = SchemaFactory.createForClass(LightningTalk);

LightningTalkSchema.index({ votes: -1, updatedAt: -1 });
LightningTalkSchema.index({ owner: 1, title: 1 }, { unique: true });

// Index items those were not convert yet
LightningTalkSchema.index({ store: 1 }, {
  partialFilterExpression: {
    images: null
  }
});
