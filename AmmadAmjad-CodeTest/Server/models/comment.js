module.exports = function (sequelize, DataTypes) {
  return sequelize.define('comment', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}