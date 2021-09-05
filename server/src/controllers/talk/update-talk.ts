import { Request } from "express";
import { FilterQuery } from "mongoose";
import { ITalk, ServerResponse } from "../../interfaces";
import { TalkModel } from "../../models";
import { ErrorHandler, withServiceLayer } from "../../utils";

enum UpdateOps {
  ADD = "ADD",
  REMOVE = "REMOVE"
}

const updateVoteCount = async (req: Request): Promise<ServerResponse> => {
  const { headers, body } = req;
  const user = headers.user as string;
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
  };

  const mapByOperation = {
    [UpdateOps.ADD]: { $addToSet: { votes: user }, $inc: { voteCount: 1 } },
    [UpdateOps.REMOVE]: { $pull: { votes: user }, $inc: { voteCount: -1 } },
  };

  const updateRule = mapByOperation[operation as UpdateOps];

  if (!updateRule) {
    throw new ErrorHandler({
      statusCode: 400,
      message: 'Operation not allowed',
      functionName: 'updateVoteCount'
    });
  }

  const { _id: id } = await TalkModel.findOneAndUpdate(conditions, updateRule) as ITalk;

  return {
    statusCode: 200,
    message: 'Vote Counted',
    talkId: id
  };
};

export const putVoteCount = withServiceLayer(updateVoteCount);
