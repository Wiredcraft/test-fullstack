const { DataTypes } = require('sequelize');

module.exports = db => {
    return db.define('Talk', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        points: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        createdBy: DataTypes.STRING
    });
};