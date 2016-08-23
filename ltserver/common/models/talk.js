'use strict';

module.exports = function(Talk) {
  Talk.greet = function(cb) {
    cb(null, 'Greetings...');
  }

  Talk.remoteMethod(
    'greet',{
      http: {
        path: '/greet',
        verb: 'get'
      },
      returns: {
        arg: 'greeting',
        type: 'string'
      }
    }
  );
};
