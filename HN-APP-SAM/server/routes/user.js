const express = require('express')
const router = express.Router()
const userService = require('../service/user-service')
const passport = require('passport')
const _ = require('lodash')
const { sendData } = require('../utils/common')

/**
 * Login
 * @route POST api/user/login
 */
router.post('/login', async (req, res, next) => {
  try {
    const token = await userService.login(req.body)
    sendData(token, res)
  } catch (err) {
    next(err)
  }
})

/**
 * Register user
 * @route POST api/user
 */
router.post('/', async (req, res, next) => {
  try {
    const savedUser = await userService.addUser(req.body)
    sendData(savedUser, res)
  } catch (err) {
    next(err)
  }
})

/**
 * Retrieve multiple users
 * @route GET api/user
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userList = await userService.findAllUsers()
      sendData(userList, res)
    } catch (err) {
      next(err)
    }
  }
)

/**
 * Retrieve a single user
 * @router GET api/user/{id}
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = await userService.findUserById(req.params.id)
      sendData(user, res)
    } catch (err) {
      next(err)
    }
  }
)

/**
 * Update user
 * @router PUT api/user/{id}
 */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = await userService.updateUserById(req.params.id, req.body)
      sendData(user, res)
    } catch (err) {
      next(err)
    }
  }
)

/**
 * Delete user
 * @router DELETE api/user/{userID}
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = await userService.deleteUserById(req.params.id)
      sendData(user, res)
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
