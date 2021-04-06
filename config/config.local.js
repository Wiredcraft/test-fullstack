const path = require('path');

module.exports = appInfo => {
	
	exports.sequelize = {
		datasources: [
			{
				delegate: 'model',
				baseDir: 'model',
				dialect: 'mysql',
				database: 'lightning_talk',
				host: '127.0.0.1',
				port: 3306,
				username: 'root',
				password: '',
				timezone: '+08:00',
				dialectOptions: {
					dateStrings: true,
					typeCast (field, next) {
						if (field.type === 'DATETIME') {
							return field.string();
						}
						return next();
					}
				}
			}
		]
	}
	
	exports.logger = {
		dir: path.join(appInfo.baseDir, '/logs/local'),
		outputJSON: true
	}

	return exports;
}
