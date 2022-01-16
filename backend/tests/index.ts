process.env.NODE_ENV = 'testing';

import '../src/types/global';

import 'mocha';
import {clearDatabase, closeDatabase, connect} from './db';
import {Mongoose} from 'mongoose';
import chaiHttp from 'chai-http';
import express from 'express';
import initializeExpress from '../src/lib/express';
import parameters from './parameters';
import {use} from 'chai';

use(chaiHttp);

describe('login', () => {
  let mongooseConnection: Mongoose;

  before(async () => {
    console.log('[Initialize tests...]');

    global.expressApp = express();

    await initializeExpress();
    mongooseConnection = await connect();

    if (!mongooseConnection.connection) {
      throw new Error(
          'A valid mongodb connection is required to do the API tests.',
      );
    }
    await mongooseConnection.connection.db.dropDatabase();

    const registation = await parameters.authService.register({
      username: parameters.user,
      password: parameters.password,
    });

    const talkCreation = await parameters.talksService.create({
      name: parameters.talkName,
      description: parameters.talkDescription,
    }, registation.user?._id);

    parameters.talkID = talkCreation._id.toString();
  });

  require('./route');

  after(async () => {
    try {
      console.log('[Ending tests gracefully...]');
      await clearDatabase();
      await closeDatabase();
      console.log('[Tests ended.]');
    } catch (error) {
      console.error(error);
    }
  });
});


