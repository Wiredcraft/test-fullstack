import { Document } from "mongoose";

export interface ITalk extends Document {
	title: string;
	description: string;
	author: string;
	votes: string[];
}

export interface ITalkObject {
	title: ITalk["title"];
	description: ITalk["description"];
	author: ITalk["author"];
	votes?: ITalk["votes"];
}