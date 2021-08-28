import { Response, Request, NextFunction } from "express";
import { ITalkObject } from "../interfaces";
import { TalkModel } from "../models";
import { ErrorHandler, getController } from "../utils";

const createTalkFunction = async (req: Request, res: Response, next: NextFunction) => {

	const { headers, body } = req;
	const user = headers["user"] as string;
	const { title, description } = body;

	const talkInput: ITalkObject = {
		title,
		author: user,
		description,
	};

	const newTalk = new TalkModel(talkInput);

	await newTalk.save().catch((err) => {
		throw new ErrorHandler({
			errDev: JSON.stringify(err),
			statusCode: 400,
			message: err.message || 'Error trying to create new talk',
			functionName: 'createTalk'
		});
	});

	return {
		statusCode: 201,
		talkId: newTalk._id
	};
}

export const createTalk = getController(createTalkFunction);