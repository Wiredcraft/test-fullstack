var disableAllMethods = require('../../utils/helper').disableAllMethods;

module.exports = function(Votehistory) {
  //disable the all methods
  disableAllMethods(Votehistory, "create");

  Votehistory.on("create", function() {
    Votehistory.create = function(filter, cb){
      var publisherId = filter.publisherId;
      var talkId = filter.talkId;

      Votehistory.find({where: {publisherId: publisherId, talkId: talkId}}, function(err, instance){
        if (instance === null) {
          Votehistory.create({
            publisherId: publisherId,
            talkId: talkId
          }, function(err, voteHistory){
            cb(null, {
              success: true,
              voteHistoryId: voteHistory.id
            });
          })
        } else {
          cb(null, {
            success: false,
            message: "The publisher is already vote to the talk."
          });
        }
      });
    }
  });

};
