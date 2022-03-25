"use strict";

const db = require("./index");
const sequelize = db.sequelize;
const { Model, DataTypes } = require("sequelize");
const { Sequelize } = require("./index");

class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      comment: "用户名",
    },
    password: { type: DataTypes.STRING, allowNull: false, comment: "密码" },
  },
  {
    sequelize,
    modelName: "user",
    comment: "用户",
  }
);
exports.User = User;
