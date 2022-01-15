/* eslint-disable no-var */ // disabled as we cannot use let in a global scope

import {Application} from 'express';
import {LeanDocument} from 'mongoose';
import {Logger} from 'winston';
import {TokenInformations} from 'interfaces/token';
import {UserModel} from './models';

declare global {
  namespace Express {
    interface Request {
      currentUser?: LeanDocument<UserModel>;
      token?: TokenInformations;
    }
  }

  var logger: Logger;
  var expressApp: Application;
}
