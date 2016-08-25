'use strict';

var debug = require('debug')('lt');
var app = require('../../server/server');

function updateTalkVoteCount(talkId, num, cb) {
  var Talk = app.models.Talk;
  Talk.findById(talkId, function (err, talk) {
    // ignore err
    debug('update voteCount');
    debug('before: ' + talk.voteCount);
    // console.log(talk);
    talk.updateAttribute('voteCount', talk.voteCount + num, function (err, talk) {
      if (err) cb(err);
      debug('after: ' + talk.voteCount);
      cb();
    });
  });
}


module.exports = function(Vote) {
  /*
   * new remote method `upvote`
   * endpoint /api/Votes/upvote - POST
   * the post data will be used as the filter to query the db to find
   * a Vote instance
   * if it can find one, the instance will be deleted, relevant talks
   * voteCount will be decreased by 1
   * if it can not find one, a new instance will be created, relevant
   * talks voteCount will be increased by 1 
   */
  Vote.upvote = function(talkId, voterId, cb) {
    var data = {talkId: talkId, voterId: voterId}; // used as filter
    Vote.findOrCreate({ where: data}, data, function(err, ins, created) {
      if (err) cb(err);
      if (created) {
        // create
        // new vote, increase corresponding talks voteCount
        updateTalkVoteCount(talkId, 1, function(err) {
          if(err) cb(err);
          cb(null, ins.talkId, ins.voterId, ins.id);
        });
      } else {
        // exist
        // if exist, we delete it and decrease corresponding talks voteCount
        Vote.destroyById(ins.id, function(err) {
          if(err) cb(err);
          updateTalkVoteCount(talkId, -1, function(err) {
            if (err) cb(err);
            cb(null, ins.talkId, ins.voterId, ins.id);
          });
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
};
