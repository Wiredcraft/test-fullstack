
exports.index = async function (ctx, next) {
	const { app } = ctx;
	let per_page = this.params.per_page ? this.helper.toInt(this.params.per_page) : null;
	let page = this.params.page ? this.helper.toInt(this.params.page) : null;
	let limit = ctx.query.limit ? this.helper.toInt(ctx.query.limit) : null;
	let offset = ctx.query.offset ? this.helper.toInt(ctx.query.offset) : null;
	let sortby = ctx.query.sortby ? ctx.query.sortby : null;
	let order = ctx.query.order ? ctx.query.order : null;
	let current_user_id = ctx.query.user_id ? ctx.query.user_id : null;
	let query = {};
	let _meta = {};
	let _links = {
		self: ctx.request.originalUrl
	};

	let where = {};
	let searchKeyword = ('undefined' !== typeof ctx.query.search_keyword) ? ctx.query.search_keyword : '';
	if (searchKeyword != '') {
		where = {
			[app.Sequelize.Op.or]: [
				{
					title: {
						[app.Sequelize.Op.like]: '%'+searchKeyword+'%'
					}
				},
				{
					description: {
						[app.Sequelize.Op.like]: '%'+searchKeyword+'%'
					}
				}
			]
		};
	}
	
	query.where = where;
	
	if (per_page && page) {
		query.limit = per_page;
		query.offset = per_page * (page - 1);
		_meta.perPage = per_page;
		_meta.currentPage = page ? page : 1;
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
	
	query.order.push(['created_at', 'DESC']);
	query.order.push(['id', 'DESC']);
	
	const talk_count = await this.app.model.Talk.count({
		where: where
	});
	const talks = await this.app.model.Talk.findAndCountAll(query);
	
	let talks_data = [];
	for (i=0; i<talks.rows.length; i++) {
		talks_data[i] = talks.rows[i];
		talks_data[i].dataValues.username = await this.app.model.User.findUsernameById(talks_data[i].dataValues.user_id);
		talks_data[i].dataValues.voteRecordId = current_user_id ? await this.app.model.VoteRecord.hasRecord(talks_data[i].dataValues.id, current_user_id) : false;
	}

	_meta.totalCount = talk_count;
	_meta.totalPage = per_page ? Math.ceil(_meta.totalCount / per_page) : 1;
	_meta.pageCount = talks.rows.length;
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
	this.data = talks_data;
}

exports.show = async function (next) {
	let ids = this.params.ids;
	let talk = [];
	let i = 0;
	for (i=0; i<ids.length; i++) {
		talk[i] = await this.app.model.Talk.findByPk(ids[i]);
	}
	if (talk.length == 0)
		return next;
	if(talk.length == 1)
		this.data = talk[0];
	else
		this.data = talk;
}

exports.create = async function (ctx, next) {
	const talkData = this.params.data;
	const validate_errors = await this.validate(
		{
			title: {
				type: 'string',
				required: true
			},
			description: {
				type: 'string',
				required: true
			},
			user_id: {
				type: 'integer',
				required: true
			}
		},
		talkData
	);
	if(validate_errors) {
		try{
			const talkModel = await this.app.model.Talk.create(talkData);
			this.data = talkModel;			
		} catch(err) {
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

exports.update = async function (ctx, next) {
	const talkData = this.params.data;
	const validate_errors = this.validate(
		{
			vote: {
				type: 'integer',
				required: true
			},
			user_id: {
				type: 'integer',
				required: true
			}
		},
		talkData
	);
	if(validate_errors) {
		try{
			let talk_id = this.params.id;
			let vote_num = this.helper.toInt(talkData.vote);
			let user_id = this.helper.toInt(talkData.user_id);
			let vote_record_id = this.helper.toInt(talkData.vote_record_id);
			const talkModel = await this.app.model.Talk.findByPk(talk_id);
			if(vote_num == 1) {
				const talkUpdatedModel1 = await talkModel.update({
					vote_count: talkModel.dataValues.vote_count + 1
				});
				await this.app.model.VoteRecord.create({
						talk_id: talk_id,
						user_id: user_id
				});
				this.data = talkUpdatedModel1;
			} else {
				const talkUpdatedModel2 = await talkModel.update({
					vote_count: talkModel.dataValues.vote_count - 1
				});
				if (vote_record_id) {
					const model1 = await this.app.model.VoteRecord.findByPk(vote_record_id);
					model1.destroy();
				} else {
					const model2 = await this.app.model.VoteRecord.findOne(
						{
							where: {
								talk_id: talk_id,
								user_id: user_id
							}
						}
					);
					model2.destory();
				}
				this.data = talkUpdatedModel2;
			}
		} catch(err) {
			//
		}
	}
}

exports.destroy = async function (next) {
	let ids = this.params.ids;
	let i = 0;
	for (i=0; i<ids.length; i++) {
		const model = await this.app.model.Talk.findByPk(ids[i]);
		model.destroy();
	}
}
