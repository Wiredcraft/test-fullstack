import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LightningTalk } from './lightning-talks.schema';
import { User } from './user.schema';

@Schema()
export class LightningTalkVote {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: Types.ObjectId, ref: LightningTalk.name })
  lightningTalk: LightningTalk;

  @Prop()
  createdAt: Date;
}

export type LightningTalkVoteDocument = LightningTalkVote & Document;

export const LightningTalkVoteSchema = SchemaFactory.createForClass(LightningTalkVote);

LightningTalkVoteSchema.index({ lightningTalk: 1, user: 1 }, { unique: true });