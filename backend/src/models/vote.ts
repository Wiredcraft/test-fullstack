import IVote from '../interface/IVote';
import mongoose from 'mongoose';

/**
 * Generate a Votes schema.
 * Contains `vote`.
 *
 * @return `Vote` database schema model.
 */
const Vote = new mongoose.Schema(
    {
      vote: {
        type: Number,
        required: [true, 'Please enter a correct vote amount'],
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
);

export default mongoose.model<IVote & mongoose.Document>('Vote', Vote);
