require('dotenv').config('../.env.testing');

import mongoose, {Mongoose} from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';

let mongooseConnection: Mongoose;
let mongod: MongoMemoryServer;

const connect = async (): Promise<Mongoose> => {
  mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();

  mongooseConnection = await mongoose.connect(uri);

  return mongooseConnection;
};

const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};
const clearDatabase = async (): Promise<void> => {
  const collections = mongoose.connection.collections;

  // eslint-disable-next-line guard-for-in
  for (const key in collections) {
    const collection = collections[key];
    collection.deleteMany({});
  }
};

export {
  connect,
  closeDatabase,
  clearDatabase,
};

