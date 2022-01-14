// Disabling eslint rules for those lines, as the following imports
// have to be made in this order because of initialization setup order.

/* eslint-disable */
require('dotenv').config();

import environment from './lib/environment';
import initializeMongoose from './lib/mongoose';

import logger from './lib/logger'

/* eslint-enable */

/**
 * Initialize the API.
 */
async function main() {
  const {
    LOG_LEVEL,
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
}

main();
