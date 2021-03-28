const { ErrorHandler } = require('../helpers/error')
const User = require('../modules/User')
const utils = require('../utils/common')
const _ = require('lodash')

/**
 * Logs user into the system
 * @param {string} name
 * @param {string} password
 * @param {string} expire token expiration
 * @returns {Object} token
 */
exports.login = async ({ name, password }) => {
  const user = await User.findOne({ name })
  if (_.isEmpty(user)) {
    throw new ErrorHandler(404, 'User not found')
  }
  // check password
  const isMatch = await utils.decrypt(password, user.password)
  if (!isMatch) throw new ErrorHandler(400, 'Invalid password')
  const token = await utils.genToken({
    name,
    password,
    id: user.id,
  })
  return {
    token: 'Bearer ' + token,
  }
}

/**
 * Register user
 * @param {object} user
 * @returns {Object} saved user
 */
exports.addUser = async (user) => {
  const existedUser = await User.findOne({ name: user.name })
  if (!_.isEmpty(existedUser)) {
    throw new ErrorHandler(400, 'User existed')
  }
  user.password = await utils.encrypt(user.password)
  return new User(user).save()
}

/**
 * Find user by conditions
 * @param {string} payload Find user by conditions
 * @returns {Object} User
 */
exports.findUserBy = async (payload) => {
  return User.findOne({ ...payload })
}

/**
 * Find all users order by user name ascending
 * @returns {Object[]} user list
 */
exports.findAllUsers = async () => {
  return User.find().collation({ locale: 'en' }).sort({ name: 1 })
}

/**
 * Retrieve a single user
 *  @param {string} id user id
 * @returns {Object} user
 */
exports.findUserById = async (id) => {
  const user = await User.findById(id)
  if (_.isEmpty(user)) throw new ErrorHandler(404, 'User not found')
  return user
}

/**
 * Replace a single User
 * @returns {Object} user
 */
exports.updateUserById = async (id, userDTO) => {
  if (userDTO.password) userDTO.password = await utils.encrypt(userDTO.password)
  const user = await User.findOneAndUpdate({ _id: id }, userDTO, { new: true })
  if (_.isEmpty(user)) throw new ErrorHandler(404, 'User not found')
  return user
}

/**
 * delete user
 * @returns {Object} user before deleted if return null means not found
 */
exports.deleteUserById = async (id) => {
  const user = await User.findByIdAndDelete(id)
  if (_.isEmpty(user)) throw new ErrorHandler(404, 'User not found')
  return user
}
