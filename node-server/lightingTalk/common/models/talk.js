module.exports = function(Talk) {

  //create a new talk instance
  Talk.talk = function(title, description, speaker, coverURL, talkURL, publisherId, cb) {
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
  };

  Talk.remoteMethod(
    'talk',
    {
      accepts: [
        {
          arg: 'title', type: 'string'
        },
        {
          arg: 'description', type: 'string'
        },
        {
          arg: 'speaker', type: 'string'
        },
        {
          arg: 'coverURL', type: 'string'
        },
        {
          arg: 'talkURL', type: 'string'
        },
        {
          arg: 'publisherId', type: 'number'
        }
      ],
      http: {path: '/talk', verb: 'post'},
      returns: {arg: 'status', type: 'string'}
    }
  );

  Talk.disableRemoteMethod('create', true);
  Talk.disableRemoteMethod('upsert', true);
  Talk.disableRemoteMethod("updateAll", true);
  Talk.disableRemoteMethod("updateAttributes", true);
  Talk.disableRemoteMethod('findById', true);
  Talk.disableRemoteMethod("deleteById", true);
  Talk.disableRemoteMethod('createChangeStream', true);

  Talk.disableRemoteMethod('findOne', true);
  Talk.disableRemoteMethod('count', true);
  Talk.disableRemoteMethod('findOne', true);
  Talk.disableRemoteMethod('replaceOrCreate', true);
};
