const mongoose = require('mongoose');


module.exports = (uri) => {

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!');
      throw error;
    }
  });

  mongoose.Promise = global.Promise;

  mongoose.connection.once('open', () => console.log('Connected to MongoDB!'));

  mongoose.connection.on('error', err => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  // Load models
  require('../models')
}
