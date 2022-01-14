// Disabling eslint rules for those lines, as the following imports
// have to be made in this order because of initialization setup order.

/* eslint-disable */
require('dotenv').config();

import environment from './lib/environment';
import initializeMongoose from './lib/mongoose';

import logger from './lib/logger'
import express from 'express';

/* eslint-enable */

/**
 * Initialize the API.
 */
async function main() {
  const {
    HOST,
    LOG_LEVEL,
    PORT,
  } = environment.getEnvironment();

  global.logger = logger(LOG_LEVEL);

  global.logger.info('🎙️ Welcome to Lightning Talks Poll API !');
  global.logger.info('Connecting to MongoDB...');

  try {
    await initializeMongoose();
    global.logger.info('Database loaded and connected.');
  } catch (error: any) {
    global.logger.error(`Mongoose: ${error.message}`);
    process.exit(1);
  }
  global.logger.info(`Initializing Express server...`);

  global.expressApp = express();

  global.expressApp.get('/', (req, res) => {
    res.send('Hello world !');
  });

  global.expressApp.listen(PORT, HOST, () => {
    global.logger.info(`Server listening at http://${HOST}:${PORT} !`);
  }).on('error', (error) => {
    global.logger.error(error);
    process.exit(1);
  });
}

main();
