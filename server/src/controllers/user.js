"use strict";
const {
  CommonService
} = require("../services/common");
const {
  UserService
} = require("../services/user");

exports.UserController = class UserController {
  static async register(ctx) {
    const {
      username,
      password
    } = ctx.request.body;

    let newUser
    try {
      const user = await UserService.findUser({
        username
      })
      if (!user) {
        newUser = await UserService.createUser(username, password)
        if (newUser) {
          delete newUser.password
          ctx.body = CommonService.responseData({
            ...newUser
          });
        }
      } else {
        ctx.body = CommonService.responseData(undefined, 200, 10001, "该用户已经被创建！");
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async getUserInfo(ctx) {
    console.log("getUserInfo", ctx.params.id)
    try {
      const user = await UserService.findUser({
        id: ctx.params.id
      })
      if (user) {
        delete user.password
        ctx.body = CommonService.responseData({
          ...user
        });
      } else {
        ctx.body = CommonService.responseData(undefined, 200, 10003, "该用户不存在!");
      }
    } catch (err) {
      console.log(err)
    }
  }
};