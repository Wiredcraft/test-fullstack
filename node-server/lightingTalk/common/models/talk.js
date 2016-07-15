var disableAllMethods = require('../../utils/helper').disableAllMethods;

module.exports = function(Talk) {
  //disable the all methods
  disableAllMethods(Talk, ["create", "find"]);

  // override the talk create method
  Talk.on('attached', function() {
    Talk.create = function(filter, cb) {
      var title = filter.title;
      var description = filter.description;
      var speaker = filter.speaker;
      var coverURL = filter.coverURL;
      var talkURL = filter.talkURL;
      var publisherId = filter.publisherId;
      Talk.create({
        title: title,
        description: description,
        speaker: speaker,
        coverURL: coverURL,
        talkURL: talkURL,
        publishDate: new Date(),
        publisherId: publisherId
      }, function(err, talk) {
        if (talk) {
          cb(null, {
            success: true,
            talkId: talk.id
          });
        }
      });
    }


  });

};
