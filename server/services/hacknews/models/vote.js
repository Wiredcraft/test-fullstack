const { DataTypes } = require('sequelize');

module.exports = db => {
    return db.define('Vote', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        talk: DataTypes.STRING,
        voteBy: DataTypes.STRING
    });
};