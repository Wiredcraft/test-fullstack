import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { LeanDocument } from "mongoose";
import { ITalk, ServerResponse } from "../../interfaces";
import { TalkModel } from "../../models";
import { ErrorHandler, withServiceLayer, getTokenData } from "../../utils";

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

const getTalksWithVotedByUserInfo = (talks: LeanDocument<ITalk[]>, user: string) => {
  return talks.map(talk => {
    let votedByUser = false;

    if (talk.votes.includes(user)) {
      votedByUser = true;
    }

    return { ...talk, votedByUser }
  });
}

export const getTalks = withServiceLayer(getTopTalks);