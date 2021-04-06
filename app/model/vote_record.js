module.exports = app => {
	
	const { INTEGER, DATE } = app.Sequelize;
	
	const VoteRecord = app.model.define(
		'vote_record',
		{
			id: {
				type: INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			talk_id: {
				type: INTEGER,
				allowNull: false
			},
			user_id: {
				type: INTEGER,
				allowNull: false
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
	
	VoteRecord.hasRecord = async function (talk_id, user_id) {
		const model = await this.findOne(
			{
				where: {
					talk_id: talk_id,
					user_id: user_id
				}
			}
		);
		if (model)
			return model.dataValues.id;
		return false;
	}

	return VoteRecord;
	
}