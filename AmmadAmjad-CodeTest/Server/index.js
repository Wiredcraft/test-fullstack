// require('dotenv').config();

const PORT = process.env.PORT || 3001;
const force = process.env.force || false;

const app = require('./server');
const db = require('./controllers/db.js');

db.sequelize.sync({
	force: force
}).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on PORT ' + PORT + ' ! ');
	});
});

