module.exports = {
    login: {
        email: [
            { validator: 'required', message: '请输入邮箱' },
            { validator: 'email', message: '邮箱地址不正确' }
        ],
        password: [
            { validator: 'required', message: '请输入密码' }
        ],
    },

    register: {
        name: [
            { validator: 'required', message: '昵称不能为空' },
            { validator: 'length', options: { min: 2, max: 10 }, message: '昵称长度为2~10位之间'}
        ],
        email: [
            { validator: 'required', message: '邮箱不能为空' },
            { validator: 'email', message: '邮箱地址不正确' }
        ],
        password: [
            { validator: 'required', message: '密码不能为空' },
            { validator: 'password', message: '密码长度为6~20位之间'}
        ],
    },

    post: {
        topic: [
            { validator: 'required', message: '请选择或输入合适的话题' },
        ],
        title: [
            { validator: 'required', message: '请输入标题' },
            { validator: 'length', options: { min: 5, max: 50 }, message: '标题长度为5~50位之间'}
        ]
    },

    vote: {
        type: [
            { validator: 'required', message: '字段不能为空' },
        ],
        target: [
            { validator: 'required', message: '字段不能为空' },
        ]
    },

    unvote: {
        type: [
            { validator: 'required', message: '字段不能为空' },
        ],
        target: [
            { validator: 'required', message: '字段不能为空' },
        ]
    },
}