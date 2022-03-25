"use strict";

const db = require("./index");
const sequelize = db.sequelize;
const { Model, DataTypes } = require("sequelize");

class LightningTalk extends Model {}

LightningTalk.init(
  {
    title: {
      type: DataTypes.STRING,
      comment: "标题",
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      comment: "内容"
    },
    authorName: {
      type: DataTypes.STRING,
      comment: "作者",
      allowNull: false
    },
    rankCount: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "lightning_talks",
  }
);
exports.LightningTalk = LightningTalk;
