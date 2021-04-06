module.exports = app => {
	
	const { INTEGER, STRING, DATE, TEXT} = app.Sequelize;
	
	const Talk = app.model.define(
		'talk',
		{
			id: {
				type: INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			title: {
				type: STRING(128),
				allowNull: false
			},
			description: {
				type: TEXT
			},
			user_id: {
				type: INTEGER,
				allowNull: false
			},
			vote_count: {
				type: INTEGER
			},
			created_at: {
				type: DATE,
				defaultValue: Date.now()
			}
		},
		{
			timestamps: false,
			freezeTableName: true
		}
	);
	
	Talk.prototype.voteUp = async function (talk_id, user_id) {
		let model = await this.findOne(talk_id);
		let returnStatus = false;
		if (model && model.user_id != user_id) {
			let transaction;
			try {
				transaction = await this.transaction();
				await this.update({ vote_count: model.vote_count + 1});
				await this.ctx.model.talkRecord.create(
					{
						talk_id: talk_id,
						user_id: user_id
			        },
			    	transaction,
				);
				await transaction.commit();
				returnStatus = true;
			} catch (err) {
				await transaction.rollback();
			}
		}
		return returnStatus;
	}
	
	Talk.prototype.voteDown = async function (talk_id) {
		let model = await this.findOne(talk_id);
		let returnStatus = false;
		if (model && model.user_id != user_id) {
			let transaction;
			try {
				transaction = await this.transaction();
				await this.update({ vote_count: model.vote_count - 1});
				await this.ctx.model.talkRecord.destory(
					{
						where: {
							talk_id: talk_id,
							user_id: user_id
				        },
						transaction,
					}
				);
				await transaction.commit();
				returnStatus = true;
			} catch (err) {
				await transaction.rollback();
			}
		}
		return returnStatus;
	}
	
	return Talk;
	
}