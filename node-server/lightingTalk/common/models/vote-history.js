var disableAllMethods = require('../../utils/helper').disableAllMethods;

module.exports = function(Votehistory) {
  //disable the all methods
  disableAllMethods(Votehistory, "create");

  Votehistory.on("attached", function() {
    Votehistory.create = function(filter, cb){
      var userId = filter.userId;
      var talkId = filter.talkId;
      Votehistory.create({
        userId: userId,
        talkId: talkId
      }, function(err, voteHistory){
        cb(null, {
          success: true,
          voteHistoryId: voteHistory.id
        });
      })
    }
  });
  
};
