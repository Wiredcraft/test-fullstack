import IUser from '../interfaces/IUser';
import mongoose from 'mongoose';

/**
 * Generate an User schema.
 * Contains `name`, `email`, `password`.
 *
 * @return `User` database schema model.
 */
const User = new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, 'Please enter a full name'],
        index: true,
        unique: true,
      },

      password: String,

      role: {
        type: String,
        default: 'user',
      }, // May be useful in the future ?
    },
    {timestamps: true},
);

export default mongoose.model<IUser & mongoose.Document>('User', User);
