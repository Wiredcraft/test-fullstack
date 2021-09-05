import { Request } from "express";
import { ITalkObject, ServerResponse } from "../../interfaces";
import { TalkModel } from "../../models";
import { ErrorHandler, withServiceLayer } from "../../utils";

const createTalkFunction = async (req: Request): Promise<ServerResponse> => {
  const { headers, body } = req;
  const user = headers.user as string;
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
    message: 'Talk created',
    talkId: newTalk._id
  };
};

export const createTalk = withServiceLayer(createTalkFunction);
