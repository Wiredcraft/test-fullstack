import _ from 'lodash';

export function isLiked(topic, userId){
    return (_.findWhere(topic.likes, {userId: userId}) !== undefined) ? true : false;
}

export function getLikeId(topic, userId){
    var res = _.find(topic.likes, (like) => {
      return (like.userId === userId);
    });
    console.log((res === undefined) ? undefined : res.id)
    return (res === undefined) ? undefined : res.id;
}
