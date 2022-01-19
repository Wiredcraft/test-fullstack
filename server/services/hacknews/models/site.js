const { DataTypes } = require('sequelize');

module.exports = db => {
    return db.define('Site', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        category: DataTypes.STRING, //分组
        name: DataTypes.STRING, //名称
        url: DataTypes.STRING, //地址
        description: DataTypes.STRING, //描述
        hostname: DataTypes.STRING, //域名
        priority: DataTypes.INTEGER, //优先级
        favicon: DataTypes.STRING, //图标
        likes: DataTypes.INTEGER, //喜欢
        dislikes: DataTypes.INTEGER, //不喜欢
        creater: DataTypes.STRING, //创建者
        recommend: DataTypes.INTEGER, //编辑推荐
        status: DataTypes.STRING, //状态 APPEND || REJECT || ONLINE
        rejectedAt: DataTypes.DATE
    });
};