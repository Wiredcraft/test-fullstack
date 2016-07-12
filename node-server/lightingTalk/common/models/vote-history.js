module.exports = function(Votehistory) {

  // create a vote history to talk
  Votehistory.vote = function(userId, talkId, cb) {
    Votehistory.create({
      userId: userId,
      talkId: talkId
    }, function(err, voteHistory){
      cb(null, {
        success: true,
        voteHistoryId: voteHistory.id
      });
    })
  };

  Votehistory.remoteMethod(
    'vote',
    {
      accepts: [
        {
          arg: 'userId', type: 'string'
        },
        {
          arg: 'talkId', type: 'string'
        },
      ],
      http: {path: '/vote', verb: 'post'},
      returns: {arg: 'status', type: 'string'}
    }
  )
};
