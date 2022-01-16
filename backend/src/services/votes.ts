import {TalkModel, VoteModel} from 'types/models';
import mongoose from 'mongoose';
import talkModel from '../models/talk';
import voteModel from '../models/vote';

/**
 * Votes service.
 */
class VotesService {
  talkModel: mongoose.Model<TalkModel>;
  voteModel: mongoose.Model<VoteModel>;

  /**
    * Initialize User model.
  */
  constructor() {
    this.voteModel = voteModel;
    this.talkModel = talkModel;
  }

  /**
   * Vote for a talk by its ID.
   *
   * @async
   *
   * @param {number} userVote - The vote of the user.
   * @param {string} userID - The owner username.
   * @param {string} talkID - The talk ID.
   * @return {Promise<void>}
   *
   * @throws {Error} - Throw if the talk cannot be found.
   */
  public async vote(
      userVote: number,
      userID: string,
      talkID: string,
  ) {
    const parameters = {
      talk: talkID,
      user: userID,
      vote: userVote,
    };

    const talk = await this.talkModel.findById({
      _id: talkID,
    });


    if (talk) {
      const oldVote = await this.voteModel.findOne({
        talk,
        user: userID,
      });

      if (oldVote === null) {
        const voteRecord = await this.voteModel.create(parameters);

        await this.talkModel.updateOne(
            {_id: talk._id},
            {$push: {votes: voteRecord}},
        );
      } else {
        const voteRecord = await this.voteModel.updateOne(
            {vote: userVote},
        ).where('_id').equals(oldVote._id);

        if (!voteRecord.acknowledged) {
          throw new Error('Error while updating vote.');
        }
      }
    } else {
      throw new Error('Talk not found');
    }
  }
}

export default VotesService;
