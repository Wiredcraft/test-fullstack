"user strict";
const {
  User
} = require("../models/User");
const bcrypt = require('bcryptjs')
const {
  v4: uuidv4
} = require('uuid');

exports.UserService = class UserService {
  static async findUser(userQuery) {
    const realQuery = {
      ...userQuery
    }
    console.log(realQuery)
    try {
      const result = await User.findOne({
        where: realQuery,
        raw: true
      });
      return result
    } catch (error) {
      console.log(error)
    }
  }

  static async createUser(username, password) {
    console.log('createUser', username, password)
    const hashPassword = await bcrypt.hash(password, 10)
    const realItem = {
      id: uuidv4(),
      username,
      password: hashPassword
    }
    try {
      const result = await User.create({
        ...realItem
      })
      return result.get({
        plain: true
      })
    } catch (error) {
      console.log(error)
    }
  }
};