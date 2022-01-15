import ITalk from 'interfaces/ITalk';
import IUser from 'interfaces/IUser';
import IVote from 'interfaces/IVote';
import mongoose from 'mongoose';

export type TalkModel = ITalk & mongoose.Document;
export type UserModel = IUser & mongoose.Document;
export type VoteModel = IVote & mongoose.Document;
