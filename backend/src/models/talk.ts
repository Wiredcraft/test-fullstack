import {TalkModel} from 'types/models';
import mongoose from 'mongoose';

/**
 * Generate a Talks schema.
 * Contains `name`, `description`, `user`, `votes`.
 *
 * @return `Talk` database schema model.
 */
const Talk = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Please enter a full name'],
      },

      description: {
        type: String,
        required: [true, 'Please enter a full description'],
        index: true,
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },

      votes: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Vote',
      }],
    },
    {timestamps: true},
);

export default mongoose.model<TalkModel>('Talk', Talk);
