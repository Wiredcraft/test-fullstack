import { Request } from "express";
import { FilterQuery, LeanDocument } from "mongoose";
import { ITalk, ITalkObject, ServerResponse } from "../interfaces";
import { TalkModel } from "../models";
import { ErrorHandler, withServiceLayer, getTokenData } from "../utils";
import { JwtPayload } from "jsonwebtoken";

enum UpdateOps {
  ADD = "ADD",
  REMOVE = "REMOVE"
}

const createTalkFunction = async (req: Request): Promise<ServerResponse> => {
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
    message: 'Talk created',
    talkId: newTalk._id
  };
}

const getTopTalks = async (req: Request): Promise<ServerResponse> => {
  const { code: token } = req.query;


  const talksOrderedByVotes = await TalkModel.find({})
    .sort({ voteCount: -1 })
    .limit(30)
    .lean()
    .catch((err) => {
      throw new ErrorHandler({
        errDev: JSON.stringify(err),
        statusCode: 400,
        message: err.message || 'Error trying to get top Talks',
        functionName: 'getTopTalks'
      });
    });

  let talksToReturn;

  if (token) {
    const accessData = getTokenData(token as string);
    const user = (accessData as JwtPayload).email;

    talksToReturn = getTalksWithVotedByUserInfo(talksOrderedByVotes, user);
  } else {
    talksToReturn = talksOrderedByVotes;
  }


  return {
    statusCode: 200,
    message: 'Talks ordered by votes count',
    talks: talksToReturn
  }
}

const updateVoteCount = async (req: Request): Promise<ServerResponse> => {
  const { headers, body } = req;
  const user = headers["user"] as string;
  const { operation, talkId } = body;

  if (!talkId) {
    throw new ErrorHandler({
      statusCode: 400,
      message: 'Provide TalkId field',
      functionName: 'updateVoteCount'
    });

  }

  const conditions: FilterQuery<ITalk> = {
    _id: talkId,
  }

  const mapByOperation = {
    [UpdateOps.ADD]: { $addToSet: { votes: user }, $inc: { voteCount: 1 } },
    [UpdateOps.REMOVE]: { $pull: { votes: user }, $inc: { voteCount: -1 } },
  }

  const updateRule = mapByOperation[operation as UpdateOps];

  if (!updateRule) {
    throw new ErrorHandler({
      statusCode: 400,
      message: 'Operation not allowed',
      functionName: 'updateVoteCount'
    });
  }

  const response: any = await TalkModel.findOneAndUpdate(conditions, updateRule);

  return {
    statusCode: 200,
    message: 'Vote Counted',
    talkId: response._id
  }
}

const getTalksWithVotedByUserInfo = (talks: LeanDocument<ITalk[]>, user: string) => {
  return talks.map(talk => {
    let votedByUser = false;

    if (talk.votes.includes(user)) {
      votedByUser = true;
    }

    return { ...talk, votedByUser }
  });
}

export const putVoteCount = withServiceLayer(updateVoteCount);
export const getTalks = withServiceLayer(getTopTalks);
export const createTalk = withServiceLayer(createTalkFunction);