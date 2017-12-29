'use strict';

module.exports = function(Talk) {
    Talk.vote = function(id, vote, callBack) {
        Talk.findById(id, function(err, instance){
            const currentVoteScore = instance.voteScore;
            const currentVoteCount = instance.voteCount;
            instance.voteScore += vote;
            instance.voteCount++;
            instance.voteAverage = instance.voteScore / instance.voteCount;
            // instance.updated = ;
            Talk.upsert(instance, function(err, object){
                // callBack(object,'b');
            })
        });
        callBack(null,'Voted');
    }

    Talk.remoteMethod('vote',{
        accepts: [
            {arg: 'id', type: 'string'},
            {arg: 'vote', type: 'number'}
        ]
    })

};
