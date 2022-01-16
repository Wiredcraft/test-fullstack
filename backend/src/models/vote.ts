import {VoteModel} from 'types/models';
import mongoose from 'mongoose';

/**
 * Generate a Votes schema.
 *
 * @return {VoteModel} - database schema model.
 */
const Vote = new mongoose.Schema(
    {
      vote: {
        type: Number,
        required: [true, 'Please enter a correct vote amount'],
        min: [-1, 'Please enter a correct vote amount'],
        max: [1, 'Please enter a correct vote amount'],
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },

      talk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Talk',
      },
    },
    {timestamps: true},
).index({
  user: 1, talk: 1,
}, {unique: true},
);

// Indexing by user and talk to prevent user make multiple votes for one talk.

export default mongoose.model<VoteModel>('Vote', Vote);
