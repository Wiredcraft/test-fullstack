import ITalk from '../interface/ITalk';
import mongoose from 'mongoose';
import uuid from 'uuid';

/**
 * Generate a Talks schema.
 * Contains `name`, `email`, `password`.
 *
 * @return `Talk` database schema model.
 */
const Talk = new mongoose.Schema(
    {
      _id: {type: String, default: uuid.v1, index: true},

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

    },
    {timestamps: true},
);

export default mongoose.model<ITalk & mongoose.Document>('Talk', Talk);
