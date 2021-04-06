module.exports = app => {
	
	const { STRING, INTEGER, DATE } = app.Sequelize;
	
	const User = app.model.define(
		'user',
		{
			id: {
				type: INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			username: {
				type: STRING(16),
				unique: true,
				allowNull: false
			},
			password_hash: STRING,
			created_at: {
				type: DATE
			}
		},
		{
			timestamps: false,
			freezeTableName: true
		}
	);
	
	User.findUsernameById = async function (user_id) {
		const model = await this.findOne(
			{
				where: {
					id: user_id
				}
			}
		);
		if (model)
			return model.dataValues.username;
		return null;
	}

	User.findByUsername = async function (username) {
		return await this.findOne(
			{
				where: {
					username: username
				}
			}
		);
	}

	User.prototype.changePassword = async function (ctx, newPassword) {
		let password_hash = await ctx.genHash(newPassword);
		return await this.update({ password_hash:  password_hash});
	}
	
	return User;
}