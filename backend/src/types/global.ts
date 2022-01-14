/* eslint-disable no-unused-vars */ // disabled as we declare a global variable
/* eslint-disable no-var */ // disabled as we cannot use let in a global scope

import {Application} from 'express';
import {Logger} from 'winston';

declare global {
  var logger: Logger;
  var expressApp: Application;
}
