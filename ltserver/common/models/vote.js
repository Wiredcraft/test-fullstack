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

  Vote.upvote = function(talkId, voterId, cb) {
    debug('args are ' + talkId + ' ' + voterId);
    var data = {talkId: talkId, voterId: voterId};
    Vote.findOrCreate({ where: data}, data, function(err, ins, created) {
      if (err) cb(err);
      if (created) {
        // create
        debug('created vote: ')
        debug(ins);
        cb(null, ins.talkId, ins.voterId, ins.id);
      } else {
        // exist
        Vote.destroyAll({ where: data}, function(err, info) {
          if(err) cb(err);
          debug('destroy vote: ')
          debug(ins)
          cb(null, ins.talkId, ins.voterId, ins.id);
        });
      }
    });
  };

  Vote.remoteMethod('upvote', {
    accepts: [
      {arg: 'talkId', type: 'number'},
      {arg: 'voterId', type: 'number'}
    ],
    returns: [
      {arg: 'talkId', type: 'number'},
      {arg: 'voterId', type: 'number'},
      {arg: 'id', type: 'number'}
    ],
    http: {path: '/upvote', verb: 'post'}
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
