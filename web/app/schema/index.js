module.exports = {
    login: {
        email: [
            { validator: 'required', message: '请输入邮箱' },
            { validator: 'email', message: '邮箱地址不正确' }
        ],
        password: [
            { validator: 'required', message: '请输入密码' }
        ],
        captcha: [
            { validator: 'required', message: '请输入验证码' }
        ]
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
        code: [
            { validator: 'required', message: '验证码不能为空' }
        ]
    },

    reset: {
        email: [
            { validator: 'required', message: '请输入邮箱' },
            { validator: 'email', message: '邮箱地址不正确' }
        ],
        password: [
            { validator: 'required', message: '请输入新密码' },
            { validator: 'password', message: '新密码必须为长度6~20位之间的数字，字母，特殊字符' }
        ],
        code: [
            { validator: 'required', message: '验证码不能为空' }
        ]
    },

    verify: {
        email: [
            { validator: 'required', message: '邮箱不能为空' },
            { validator: 'email', message: '邮箱地址不正确' }
        ]
    },

    avatar: {
        input:  [
            { validator: 'required', message: '输入不能为空' },
        ]
    },

    password: {
        passwordOld: [
            { validator: 'required', message: '请输入原密码' },
        ],
        passwordNew: [
            { validator: 'required', message: '请输入新密码' },
            { validator: 'password', message: '新密码必须为长度6~20位之间的数字，字母，特殊字符' }
        ]
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

    append: {
        id: [
            { validator: 'required', message: '字段不能为空' },
        ],
        content: [
            { validator: 'required', message: '内容不能为空' },
            { validator: 'length', options: { min: 5, max: 5000 }, message: '内容太短'}
        ]
    },

    reply: {
        post: [
            { validator: 'required', message: '帖子不能为空' },
        ],
        content: [
            { validator: 'required', message: '内容不能为空' },
        ]
    },

    relation: {
        type: [
            { validator: 'required', message: '字段不能为空' },
        ],
        target: [
            { validator: 'required', message: '字段不能为空' },
        ]
    },

    unrelation: {
        type: [
            { validator: 'required', message: '字段不能为空' },
        ],
        target: [
            { validator: 'required', message: '字段不能为空' },
        ]
    },
}