'use strict';

const Service = require('egg').Service;

class UserService extends Service {
	
	async signJwt(username, password) {
		const { app, ctx } = this;
		if (username && username != '') {
			const UserModel = await app.model.User.findByUsername(username);
			if ( UserModel ) {
				if (password && password != '') {
					const password_compare = await ctx.compare(password, UserModel.password_hash);
					if (password_compare) {
						const token = app.jwt.sign(
							{
								id: UserModel.id,
								username: UserModel.username
							},
							app.config.jwt.secret,
							{
								expiresIn: app.config.jwt.expiresIn
							}
						);
						return {
							code: 200,
							message: 'logged in',
							data: {
								id: UserModel.id,
								username: UserModel.username,
								created_at: UserModel.created_at
							},
							token: token
						}
					} else {
						return {
							code: 200,
							error: [{
								message: 'incorrect password',
								field: 'pwd'
							}]
						};
					}
				} else {
					return {
						code: 200,
						error: [{
							message: 'please enter your password',
							field: 'pwd'
						}]
					};
				}
			} else {
				return {
					code: 200,
					error: [{
						message: 'incorrect username',
						field: 'username'
					}]
				};
			}
		} else {
			return {
				code: 200,
				error: [{
					message: 'please enter your username',
					field: 'username'
				}]
			};
		}
	}
	
}

module.exports = UserService;