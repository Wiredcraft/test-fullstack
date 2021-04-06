'use strict';

module.exports = appInfo => {
	
	const config = exports = {};
	
	config.keys = appInfo.name + '_88888888';
	
	config.cluster = {
		listen: {
			path: '',
			port: 8080,
			hostname: '0.0.0.0',
		}
	};
	
	config.jwt = {
		secret: 'LIGHTINGTALKAPP',
		expiresIn: '1d' // 1Day
	};
	
	config.session = {
		maxAge: 24 * 3600 * 1000, // 1Day
		httpOnly: true,
		encrypt: true,
		renew: true
	};
	
	config.bodyParser = {
		formLimit: '100mb',
		jsonLimit: '100mb',
		textLimit: '100mb'
	}

	config.middleware = [
		'errorHandler',
		'notfoundHandler',
		'robot'
	];
	
	config.errorHandler = {
		match: '/api'
	};

	config.robot = {
		ua: [
			/curl/i,
			/Baiduspider/i
		]
	};
	
	config.bcrypt = {
		saltRounds: 10
	};
	
	config.bizerror = {
		breakDefault: false,
		sendClientAllParams: false,
		interceptAllError: false
	};
	
	config.cors = {
		origin: '*',
		allowMethods: 'GET,PUT,POST,DELETE'
	};

	config.rest = {
		urlprefix: '/api/',
		authRequest: async ctx => {
			const token = ctx.get('authorization');
			if (token) {
				return ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
			}
			return null;
		},
		authIgnores: {
 			user: {
				create: true,
				update: true,
			},
			talk: {
				index: true
			}
		},
		errorResponse: async (ctx, err) => {
			let status = err.status;
			const isErrorInstance = err instanceof Error;
			if (isErrorInstance) {
				if (status >= 500) {
					// Server exception
					if (err.name === 'TokenExpiredError') {
						ctx.status = 401;
						ctx.body = {
							message: 'Token has expired'
						};
					} else if (err.name === 'JsonWebTokenError' && (err.message === 'invalid signature' || err.message === 'jwt malformed')) {
						ctx.status = 401;
						ctx.body = {
							message: 'Invalid Token'
						};
					} else {
						ctx.logger.error(err);
						if (ctx.app.config.env === 'prod') {
							ctx.status = 500;
							ctx.body = {
								message: 'Internal Server Error',
							};
						} else {
							ctx.status = status;
							ctx.body = {
								message: err.name + ': ' + err.message,
								stack: err.stack
							};
						}
					}
				} else {
					// Client exception
					ctx.body = {
						code: err.code,
						message: err.message,
						errors: err.errors,
					};
				}
			} else {
				err.status = undefined;
				ctx.body = err;
			}
		}
	};
	
	config.security = {
		//domainWhiteList:['http://localhost:8080'],
		csrf: {
			enable: false,
			ignoreJSON: true
		},
		ignore: '/api/'
	};
	
	config.validate = {
		convert: true
	};
	
	// add your user config here
	const userConfig = {};

	return {
		...config,
		...userConfig,
	};
};