"use strict";
const {
    UserService
} = require("../services/user");
const {
    CommonService
} = require("../services/common");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.AuthController = class AuthController {
    static async postUserAuth(ctx) {
        console.log("postUserAuth")
        const {
            username,
            password
        } = ctx.request.body;
        const userInfo = await UserService.findUser({
            username
        })
        if (userInfo) {
            if (!bcrypt.compareSync(password, userInfo.password)) {
                ctx.body = CommonService.responseData(undefined, 200, 10002, "wrong password!");
            } else {
                const userToken = {
                    name: userInfo.username,
                    id: userInfo.id
                }
                const secret = 'demo'
                const token = jwt.sign(userToken, secret)
                ctx.body = CommonService.responseData({
                    success: true,
                    token: token,
                    userId: userInfo.id,
                    username: userInfo.username
                });
            }
        } else {
            ctx.body = CommonService.responseData(undefined, 200, 10003, "no user existed!");
        }
    }
}