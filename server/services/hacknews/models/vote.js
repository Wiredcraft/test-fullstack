const { DataTypes } = require('sequelize');

module.exports = db => {
    return db.define('Vote', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        site: DataTypes.STRING, // 网站
        action: DataTypes.STRING, // 喜欢 || 不喜欢
        creater: DataTypes.STRING, // 创建者
    });
};