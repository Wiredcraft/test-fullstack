
exports.index = async function (ctx, next) {
	let per_page = this.params.per_page ? this.helper.toInt(this.params.per_page) : null;
	let page = this.params.page ? this.helper.toInt(this.params.page) : null;
	let limit = ctx.query.limit ? this.helper.toInt(ctx.query.limit) : null;
	let offset = ctx.query.offset ? this.helper.toInt(ctx.query.offset) : null;
	let sortby = ctx.query.sortby ? ctx.query.sortby : null;
	let order = ctx.query.order ? ctx.query.order : null;
	let query = {};
	let _meta = {};
	let _links = {
		self: ctx.request.originalUrl
	};
	
	if (per_page && page) {
		query.limit = per_page;
		query.offset = per_page * (page - 1);
		_meta.perPage = per_page;
		_meta.currentPage = page;
	} else {
		if (limit)
			query.limit = limit;
		if (offset)
			query.offset = offset;
	}
	
	if (sortby && order) {
		query.order = [
			[sortby, order.toUpperCase()]
		];
	}
	
	const users = await this.app.model.User.findAndCountAll(query);
	_meta.totalCount = users.count;
	_meta.totalPage = per_page ? Math.ceil(_meta.totalCount / per_page) : 1;
	_meta.pageCount = users.rows.length;
	this.meta = _meta;
	if (page && per_page < _meta.totalCount) {
		if(page > 1){
			_links.last = this.helper.replaceUrlPageNumber(_links.self, page, page-1);
		}
		if(page < _meta.totalPage){
			_links.next = this.helper.replaceUrlPageNumber(_links.self, page, page+1);
		}
	}
	this.links = _links;
	this.data = users.rows;
}

exports.show = async function (next) {
	let ids = this.params.ids;
	let user = [];
	let i = 0;
	for (i=0; i<ids.length; i++) {
		let userModel = await this.app.model.User.findOne(
			{
				where: {
					id: `${ids[i]})`
				},
				attributes: [
					'id',
					'username',
					'created_at'
				]
			}
		);
		if (userModel)
			user[i] = userModel;
	}
	if (user.length == 0)
		return next;
	if(user.length == 1)
		this.data = user[0];
	else
		this.data = user;
}

exports.create = async function (ctx, next) {
	const userData = this.params.data;
	let validate_errors = await this.validate(
		{
			username: {
				type: 'string',
				required: true
			},
			pwd: {
				type: 'string',
				required: true
			},
			repwd: {
				type: 'string',
				required: true
			}
		},
		userData
	);
	if (validate_errors) {
		let error_arr = [];
		let error_index = 0;
		if (! /^[a-zA-Z0-9_-]+$/.test(userData.username)) {
			error_arr[error_index] = {
				message: 'Username must be alphanumeric',
				field: 'username'
			};
			error_index++;
		} else if (userData.username.length < 6 || userData.username.length > 16) {
			error_arr[error_index] = {
				message: 'Username`s length must be between 6 to 16',
				field: 'username'
			};
			error_index++;
		}
		if (userData.pwd !== userData.repwd) {
			error_arr[error_index] = {
				message: 'The password is not the same as the Retyped',
				field: 'pwd'
			};
			error_index++;
		}
		if (error_index > 0) {
			validate_errors = false;
			ctx.body = {
				code: 200,
				message: 'Format Validation Failed',
				error: error_arr
			};
		}
	}
	if(validate_errors) {
		userData.password_hash = await ctx.genHash(userData.pwd);
		try {
			const userModel = await this.app.model.User.create(userData);
			this.data = userModel;
		} catch (err) {
			if (err.errors && Array.isArray(err.errors)) {
				let error_arr = [];
				let error_index = 0;
				err.errors.forEach(
					function (item, index) {
						error_arr[error_index] = {
							message: item.message,
							field: item.path,
							code: item.type
						};
						error_index++;
					}
				);
				ctx.body = {
					code: 'invalid_param',
					message: 'Sequelize Validation Failed',
					error: error_arr
				};
			} else {
				this.body = {
					code: 'invalid_param',
					message: err.name,
					error: err.original
				};
			}
		}
	}
}

exports.update = async function (next) {
	const { service } = this;
	const loginData = this.params.data;
	this.body = await service.user.signJwt(loginData.username, loginData.pwd);
}

exports.destroy = async function (next) {
	this.body = {
		code: 'Not Allowed',
		message: 'Not Allowed',
		error: 'Not Allowed'
	};
}
