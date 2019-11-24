'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('talks', {
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
          zerofill: true,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('talks');
  }
};
