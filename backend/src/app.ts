require('dotenv').config();
require('./lib/environment').currentEnvironment();

import initializeMongoose from './lib/mongoose';

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
