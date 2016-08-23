'use strict';

var debug = require('debug')('lt');
var app = require('../../server/server');

function updateTalkVoteCount(ctx, num) {
  if (ctx.instance) {
    var Talk = app.models.Talk;
    Talk.findById(ctx.instance.talkId, function (err, talk) {
      // ignore err
      debug('update voteCount');
      debug('before: ' + talk.voteCount);
      // console.log(talk);
      talk.updateAttribute('voteCount', talk.voteCount + num, function (err, talk) {
        if (err) throw err;
        debug('after: ' + talk.voteCount);
      });
    });
  } // no else
}


module.exports = function(Vote) {

  Vote.afterRemote('create', function (ctx, unused, next) {
    debug('Vote: after create');
    next();
  });

  Vote.observe('before save', function (ctx, next) {
    updateTalkVoteCount(ctx, 1);
    next();
  });

  Vote.observe('before delete', function (ctx, next) {
    updateTalkVoteCount(ctx, -1);
    next();
  });
};
