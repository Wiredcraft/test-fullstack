const { DataTypes } = require('sequelize');

module.exports = db => {
    return db.define('User', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: DataTypes.STRING,
        salt: DataTypes.STRING,
        password: DataTypes.STRING,
        registerAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
};