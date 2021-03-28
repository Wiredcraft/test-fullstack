const { ErrorHandler } = require('../helpers/error')
const News = require('../modules/News')
const _ = require('lodash')

/**
 * Add news
 * @param {object} news
 * @returns {Object} saved user
 */
exports.addNews = async (news) => {
  return new News(news).save()
}

/**
 * Retrieve all news
 * @param {string} user_id 
 * @returns {Object[]} all news
 */
exports.findAllNews = (user_id) => {
  return new Promise((resolve, reject) => {
    News.find()
      .populate('creator', '_id name')
      .populate('rates.rater', '_id name')
      .lean()
      .exec(function (err, data) {
        if (err) reject(err)
        for (const e of data) {
          // check if user ratable this news
          e.ratable = true
          // latest rater
          e.latest = null
          // calculate all rates
          e.rate_points = 0

           // retrieve latest rater
          if (!_.isEmpty(e.rates)) {
            const latest = e.rates.reduce((rv, item) => {
              if (item.rater._id.toString() === user_id) e.ratable = false
              rv = rv.rate_time > item.rate_time ? rv : item
              return rv
            }, {})
            if (latest) e.latest = latest
            e.rate_points = e.rates.length
          }
        }

        // order by rate_points descending
        resolve(data.sort((a,b)=>b.rate_points - a.rate_points))
      })
  })
}

/**
 * Retrieve single news
 * @param {string} id news id
 * @returns {Object} news
 */
exports.findNewsById = async (id) => {
  const news = await News.findById(id)
    .populate('creator', '_id name')
    .populate('rates.rater', '_id name')
  if (_.isEmpty(news)) throw new ErrorHandler(404, 'News not found')
  return news
}

/**
 * Update news
 * @param {Object} newsDTO only update title and content
 * @returns {Object} news
 */
exports.updateNewsById = async (id, newsDTO) => {
  const news = await News.findOneAndUpdate({ _id: id }, newsDTO, { new: true })
  if (_.isEmpty(news)) throw new ErrorHandler(404, 'News not found')
  return news
}

/**
 * Rate news
 * @param {Object<{news_id, user_id}>} payload add rate payload
 * @returns {Object} news
 */
exports.addRate = async ({ news_id, user_id }) => {
  const rater = await News.findOne({
    _id: news_id,
    'rates.rater': user_id,
  })

  // if rated by user previously, process will be stopped
  if (!_.isEmpty(rater)) throw new ErrorHandler(400, 'User already rated')
  const news = await News.findOneAndUpdate(
    { _id: news_id },
    {
      $push: {
        rates: {
          rater: user_id,
          rate_time: Date.now(),
        },
      },
    },
    { new: true }
  )
    .populate('creator', '_id name')
    .populate('rates.rater', '_id name')

  if (_.isEmpty(news)) throw new ErrorHandler(404, 'News not found')
  return news
}

/**
 * Delete news
 * @param {Object<{news_id, user_id}>} payload delete rate payload
 * @returns {Object} news
 */
exports.deleteRate = async ({ news_id, user_id }) => {
  const rater = await News.findOne({
    _id: news_id,
    'rates.rater': user_id,
  })

  //  if no rate from user
  if (_.isEmpty(rater)) throw new ErrorHandler(400, 'No rate from user')

  const news = await News.findOneAndUpdate(
    { _id: news_id },
    {
      $pull: {
        rates: {
          rater: user_id,
        },
      },
    },
    { multi: true, new: true }
  )
    .populate('creator', '_id name')
    .populate('rates.rater', '_id name')

  if (_.isEmpty(news)) throw new ErrorHandler(404, 'News not found')
  return news
}
