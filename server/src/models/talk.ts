import { model, Schema, Model } from "mongoose";
import { ITalk } from "../interfaces/talk";

const TalkSchema: Schema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	author: { type: String, required: true },
	votes: { type: [String] },
	voteCount: { type: Number, default: 0 }
}, { timestamps: true })

export const TalkModel: Model<ITalk> = model('Talk', TalkSchema);
