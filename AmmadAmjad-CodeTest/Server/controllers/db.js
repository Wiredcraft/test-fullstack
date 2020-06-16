const Sequelize = require('sequelize');

var sequelize ;


if(process.env.NODE_ENV === 'test'){
  sequelize =  new Sequelize(
    null,
    null,
    null, {
      dialect: 'sqlite',
      storage: './data/db-test.sqlite',
      operatorsAliases: false,
      logging: false
  }); 
}else{
  sequelize =  new Sequelize(
    "hacker-news",
    "root",
    "abcd1234", {
      dialect: 'sqlite',
      storage: './data/db.sqlite',
      operatorsAliases: false,
      logging: false
  });
}


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
