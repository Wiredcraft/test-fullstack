const { DataTypes } = require('sequelize');

/**
 * 用户表
 */
module.exports = db => {
    return db.define('User', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        no: DataTypes.INTEGER, // 排名
        name: DataTypes.STRING, // 昵称
        gender: DataTypes.STRING, // 性别
        phone: DataTypes.STRING, // 电话
        email: DataTypes.STRING, // 邮箱
        avatar: DataTypes.STRING, // 头像
        contact: DataTypes.STRING, // 联系方式
        description: DataTypes.STRING, //个人签名，描述
        website: DataTypes.STRING, //个人网站
        location: DataTypes.STRING, //所在城市
        salt: DataTypes.STRING, // 盐值
        password: DataTypes.STRING, // 密码
        // 喜欢数
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        // 屏蔽数
        blocks: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }, 
        // 消息数
        messages: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }, 
        // 状态 NORMAL, PENDING ,BLOCKED
        status: {
            type: DataTypes.STRING,
            defaultValue: 'NORMAL'
        }, 
        // 注册时间
        registerAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        // 上次登陆时间
        lastLoginAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        blockedAt: {
            type: DataTypes.DATE
        }
    });
};