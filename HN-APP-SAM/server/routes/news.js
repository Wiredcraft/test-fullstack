const express = require('express')
const router = express.Router()
const newsService = require('../service/news-service')
const passport = require('passport')
const { sendData } = require('../utils/common')
const _ = require('lodash')

/**
 * Post news
 * @route POST api/news
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const news = await newsService.addNews({
        ...req.body,
        creator: req.user.id,
        create_time: Date.now(),
      })
      sendData(news, res)
    } catch (err) {
      next(err)
    }
  }
)

/**
 * Retrieve multiple news
 * @route GET api/news
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const newsList = await newsService.findAllNews(req.user.id)
      sendData(newsList, res)
    } catch (err) {
      next(err)
    }
  }
)

/**
 * Retrieve single news
 * @route GET api/news
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const news = await newsService.findNewsById(req.params.id)
      sendData(news, res)
    } catch (err) {
      next(err)
    }
  }
)

/**
 * Update news
 * @route POST api/news
 */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const news = await newsService.updateNewsById(
        req.params.id,
        // only update title content
        _.pick(req.body, ['title', 'content'])
      )
      sendData(news, res)
    } catch (err) {
      next(err)
    }
  }
)

/**
 * Add rate
 * @route POST api/news/:news_id/add_rate
 */
router.post(
  '/:news_id/add_rate',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const news = await newsService.addRate({
        news_id: req.params.news_id,
        user_id: req.user.id,
      })
      sendData(news, res)
    } catch (err) {
      next(err)
    }
  }
)

/**
 * Delete rate
 * @route POST api/news/:news_id/delete_rate
 */
router.post(
  '/:news_id/del_rate',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const news = await newsService.deleteRate({
        news_id: req.params.news_id,
        user_id: req.user.id,
      })
      sendData(news, res)
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
