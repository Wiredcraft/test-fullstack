var disableAllMethods = require('../../utils/helper').disableAllMethods;

module.exports = function(Votehistory) {
  //disable the all methods
  disableAllMethods(Votehistory, "create");

  // verify the user before create the user
  Votehistory.beforeRemote('create', function(ctx, publisher, next) {
    var publisherId = ctx.req.body.publisherId;
    var talkId = ctx.req.body.talkId;

    Votehistory.find({where: {publisherId: publisherId, talkId: talkId}}, function(err, instance){
      if (instance.length === 0) {
        next();
      } else {
        ctx.res.send({
          success: false,
          message: "The publisher is already vote to the talk."
        })
      }
    });
  });

  Votehistory.afterRemote('create', function(ctx, talk, next) {
    ctx.result.success = true;
    next();
  });
}
