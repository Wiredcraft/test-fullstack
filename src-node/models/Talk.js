const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Talk extends Model {};
    Talk.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT,
        },
        authorName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        voteCount: {
            type: Sequelize.INTEGER,
            unsigned: true,
            defaultValue: 0,
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        },
    }, {
        sequelize,
        modelName: 'talk',
    });
    return Talk;
};