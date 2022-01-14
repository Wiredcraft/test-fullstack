// Disabling eslint rules for those lines, as the following imports
// have to be made in this order because of initialization setup order.

/* eslint-disable */
require('dotenv').config();

import environment from './lib/environment';
import initializeMongoose from './lib/mongoose';

/* eslint-enable */

/**
 * Initialize the API.
 */
async function main() {
  console.log('Welcome to Lightning Talks Poll API !');
  console.log('Connecting to MongoDB...');

  try {
    await initializeMongoose();
    console.log('Database loaded and connected.');
  } catch (error: any) {
    console.error(`[Error] Mongoose: ${error.message}`);
  }
}

main();
