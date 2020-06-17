var bcrypt = require('bcrypt');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function (sequelize, DataTypes) {
	var user = sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		salt: {
			type: DataTypes.STRING
		},
		password_hash: {
			type: DataTypes.STRING
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.VIRTUAL,
			allowNull: false,
			validate: {
				len: [7, 100]
			},
			set: function (value) {
				var salt = bcrypt.genSaltSync(10);
				var hashedPassword = bcrypt.hashSync(value, salt);

				this.setDataValue('password', value);
				this.setDataValue('salt', salt);
				this.setDataValue('password_hash', hashedPassword);
			}
		},
		token: {
			type: DataTypes.VIRTUAL,
			allowNull: true,
			set: function (value) {
				var hash = cryptojs.MD5(value).toString();
				this.setDataValue('token', value);
				this.setDataValue('tokenHash', hash);
			}
		},
		tokenHash: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		hooks: {
			beforeValidate: function (user, options) {
				// user.email
				if (typeof user.email === 'string') {
					user.email = user.email.toLowerCase();
				}
			}
		}
	});


	user.authenticate = function (body) {
		return new Promise(function (resolve, reject) {
			if (typeof body.email !== 'string' || typeof body.password !== 'string') {
				;
				reject({
					status: 409,
					message: "Please send both email and password in request body"
				});
			}
			user.findOne({
				where: {
					email: body.email
				}
			}).then(function (user) {
				if (!user || !bcrypt.compareSync(body.password, user.get(
						'password_hash'))) {
					reject({
						status: 401,
						message: "Email or password is incorrect . Please make sure you enter a valid registered email with correct password"
					});
				}
				resolve(user);
			}, function (e) {
				reject();
			});
		});
	};


	user.findByToken = function (token) {
		return new Promise(function (resolve, reject) {
			try {
				const decodedJWT = jwt.verify(token, process.env.USER_TOKEN_SECRET);
				const bytes = cryptojs.AES.decrypt(decodedJWT.token, process.env.USER_TOKEN_CRYPTO_SECRET);
				const tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

				user.findById(tokenData.id).then(function (user) {
					if (user) {
						resolve(user);
					} else {
						reject({
							status: 401,
							message: "User not found. Please make sure the token is valid and user exists"
						});
					}
				}, function (e) {
					reject(e);
				});
			} catch (e) {
				reject(e);
			}
		});
	};


	user.prototype.generateToken = function (type) {
		try {
			var stringData = JSON.stringify({
				id: this.get('id'),
				type: type
			});
			var encryptedData = cryptojs.AES.encrypt(stringData, process.env.USER_TOKEN_CRYPTO_SECRET).toString();
			var token = jwt.sign({
				token: encryptedData
			}, process.env.USER_TOKEN_SECRET);
			return token;
		} catch (e) {
			throw e;
		}
	};

	user.prototype.toPublicJSON = function () {
		var json = this.toJSON();
		return _.pick(json, 'id', 'email', 'createdAt', "name");
	};

	return user;
};