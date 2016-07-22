var disableAllMethods = require('../../utils/helper').disableAllMethods;
var app = require('../../server/server');
var _ = require('lodash');

module.exports = function(Talk) {
  //disable the all methods
  disableAllMethods(Talk, ["create", "find"]);

  Talk.afterRemote('create', function(ctx, talk, next) {
    ctx.result.success = true;
    next();
  });

  Talk.afterRemote('find', function(ctx, talk, next) {
    var VoteHistory = app.models.VoteHistory;
    var Publisher = app.models.Publisher;
    if (ctx.result) {
      VoteHistory.find({}, function(err, instances) {
        Publisher.find({}, function(e, publishers) {
          if (Array.isArray(ctx.result)) {

            ctx.result.forEach(function(result) {
              result.voteCount = _.filter(instances, function(instance){
                return Number(instance.talkId) === result.id
              }).length;
              var foundPublishers = _.filter(publishers, function(publisher){return publisher.id === Number(result.publisherId)});
              if (foundPublishers.length === 0 ) {
                result.publisher = "Unknown"
              } else {
                result.publisher = foundPublishers[0].username
              }
            });
          } else {
            ctx.result.voteCount = _.filter(instances, function(instance){
              return Number(instance.talkId) === ctx.result.id
            }).length;
          }
          next();
        });
      });
    }
  });
};
