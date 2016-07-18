var disableAllMethods = require('../../utils/helper').disableAllMethods;
var app = require('../../server/server');
var _ = require('lodash');

module.exports = function(Talk) {
  //disable the all methods
  disableAllMethods(Talk, ["create", "find"]);

  Talk.afterRemote('find', function(ctx, talk, next) {
    var VoteHistory = app.models.VoteHistory;
    if (ctx.result) {
      VoteHistory.find({}, function(err, instances) {
        if (Array.isArray(ctx.result)) {
          ctx.result.forEach(function(result) {
            result.voteCount = _.filter(instances, function(instance){
              return Number(instance.talkId) === result.id
            }).length;
          });
        } else {
          ctx.result.voteCount = _.filter(instances, function(instance){
            return Number(instance.talkId) === ctx.result.id
          }).length;
        }
        next();
      });
    }
  });
};
