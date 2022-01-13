import mongoose, {Mongoose} from 'mongoose';
// eslint-disable-next-line no-unused-vars
import environment from '../lib/environment';

/**
 ** Open the database connection.
 ** @return Promise wrapper around database connection instance.
 */
async function connectToMongoDatabase(): Promise<Mongoose> {
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
}

/**
 ** Open the database connection and set the database instance to the Container.
 ** @return Call to [[connectToMongoDatabase]], database connection instance.
*/
const initializeMongoose: Function = async (): Promise<Mongoose> => {
  const connection: Mongoose = await connectToMongoDatabase();
  return connection;
};

export default initializeMongoose;
