'use strict';

var debug = require('debug')('lt');
var app = require('../../server/server');
var co = require('co');
var _ = require('../../lib/queryPromisify');

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
    var defaultError = new Error('Vote failed');
    defaultError.statusCode = 400;
    defaultError.code = 'VOTE_ERROR';

    co(function *() {
      var ins = undefined;
      try {
        ins = yield _.findOne(Vote, { where: data });

        // exist
        // if exist, we delete it and decrease corresponding talks
        // voteCount

        // delete it
        yield _.destroyById(app.models.Vote, ins.id);

        // find the talk
        var talk = yield _.findById(app.models.Talk, talkId);
        debug('before: ' + talk.voteCount);

        // decrease `voteCount` of the talk by one
        var newIns = yield _.updateAttribute(talk, 'voteCount', talk.voteCount - 1);
        debug('before: ' + newIns.voteCount);

        return cb(null, ins.talkId, ins.voterId, ins.id);
      } catch (e) {

        // so the vote is not exist
        // we will create one and increase coresponding talks
        // voteCount

        // validate vote
        // prevent trolling
        var talkP = _.findById(app.models.Talk, talkId);
        var voterP = _.findById(app.models.AppUser, voterId);
        var res = yield [talkP, voterP];


        // create a vote
        var newVote = yield _.create(app.models.Vote, data);

        var talk = res[0];
        debug('before: ' + talk.voteCount);

        // increase `voteCount` of the talk by one
        var newIns = yield _.updateAttribute(talk, 'voteCount', talk.voteCount + 1);
        debug('before: ' + newIns.voteCount);

        return cb(null, newVote.talkId, newVote.voterId, newVote.id);
      }
    }).catch(function (err) {
      if(err) return cb(err);
      return cb(defaultError);
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
