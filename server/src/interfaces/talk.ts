import { Document } from "mongoose";

export interface ITalk extends Document {
	title: string;
	description: string;
	author: string;
	votes: string[];
	voteCount: number; //Best way to do this using mongo
}

export interface ITalkObject {
	title: ITalk["title"];
	description: ITalk["description"];
	author: ITalk["author"];
	votes?: ITalk["votes"];
	voteCount?: ITalk["voteCount"];
}