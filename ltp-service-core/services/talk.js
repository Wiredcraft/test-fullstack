const bluebird = require('bluebird')
module.exports = function () {
  const talkModelName = 'talk'
  const userLikeTalkModelName = 'userLikeTalk'

  this.add('service:talks,cmd:findAll', function (data, reply) {
    const talk = this.make$(talkModelName)
    talk.list$({sort$: {score: -1}}, reply)
  })

  this.add('service:talks,cmd:getUserLiked', function (data, reply) {
    if (!data.userId) {
      return reply({code: 'INVALID_DATA', message: 'userId should be provided'})
    }
    (async () => {
      const userLikeTalk = this.make$(userLikeTalkModelName)
      userLikeTalk.list$Async = bluebird.promisify(userLikeTalk.list$, {context: userLikeTalk})
      const fetched = await userLikeTalk.list$Async({userId: data.userId})
      reply(null, fetched.map(ult => ult.talkId))
    })()
  })

  this.add('service:talks,cmd:create', function (talkData, reply) {
    if (!talkData.title || !talkData.description || !talkData.userId) {
      return reply({code: 'INVALID_DATA', message: 'Invalid talk creation data'})
    }
    const talk = this.make$(talkModelName)
    talk.title = talkData.title
    talk.description = talkData.description
    talk.userId = talkData.userId
    talk.score = 0
    talk.createdAt = new Date()
    talk.updatedAt = new Date()
    talk.isDeleted = false
    talk.save$(reply)
  })

  this.add('service:talks,cmd:like', function (likeData, reply) {
    if (!likeData.userId || !likeData.talkId) {
      return reply({code: 'INVALID_DATA', message: 'Invalid user like talk data.'})
    }
    (async () => {
      try {
        const talk = this.make$(talkModelName)
        talk.load$Async = bluebird.promisify(talk.load$, {context: talk})
        const talkInstance = await talk.load$Async({id: likeData.talkId})
        if (!talkInstance) {
          return reply({code: 'INVALID_DATA', message: 'Talk not exists'})
        }
        talkInstance.save$Async = bluebird.promisify(talkInstance.save$, {context: talkInstance})
        // TODO: should use mongodb unique index
        const userLikeTalk = this.make$(userLikeTalkModelName)
        userLikeTalk.list$Async = bluebird.promisify(userLikeTalk.list$, {context: userLikeTalk})
        const foundULTs = await userLikeTalk.list$Async({userId: likeData.userId, talkId: likeData.talkId})
        if (foundULTs && foundULTs.length > 0) {
          return reply({code: 'BAD_REQUEST', message: 'user already liked this talk.'})
        }

        talkInstance.score = talkInstance.score + 1
        await talkInstance.save$Async()

        userLikeTalk.userId = likeData.userId
        userLikeTalk.talkId = likeData.talkId
        userLikeTalk.createdAt = new Date()
        userLikeTalk.isDeleted = false
        userLikeTalk.save$(reply)
      } catch (err) {
        reply(err)
      }
    })()
  })
}
