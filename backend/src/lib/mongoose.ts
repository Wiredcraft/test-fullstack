import mongoose, {Mongoose} from 'mongoose';
import environment from '../lib/environment';

/**
 * Open a database connection.
 *
 * @async
 *
 * @return {Promise<Mongoose>} - Database connection instance.
 */
const connectToMongoDatabase: Function = async (): Promise<Mongoose> => {
  const {
    MONGO_DB,
    MONGO_HOST,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_USER,
  } = environment.getEnvironment();

  const databaseURI =
   `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

  return mongoose.connect(databaseURI);
};

/**
 * Initialize the database connection.
 *
 * @async
 *
 * @return {Promise<Mongoose>} - Database connection instance.
 */
const initializeMongoose: Function = async (): Promise<Mongoose> => {
  const connection: Mongoose = await connectToMongoDatabase();
  return connection;
};

export default initializeMongoose;
