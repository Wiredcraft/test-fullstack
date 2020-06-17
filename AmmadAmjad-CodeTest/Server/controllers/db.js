require('custom-env').env(true)
const Sequelize = require('sequelize');


var sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_FILE_PATH,
    operatorsAliases: false,
    logging: false
});

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

db.user = sequelize.import('../models/user.js');

db.comment = sequelize.import('../models/comment.js');
db.comment.belongsTo(db.user , {
  as : 'author'
});

db.commentVoters = sequelize.define('commentVoters', {});
db.comment.belongsToMany(db.user, {
  through: db.commentVoters,
  as: 'voters'
});


module.exports = db;
