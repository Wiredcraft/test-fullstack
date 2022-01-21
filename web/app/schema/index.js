module.exports = {
    login: {
        name: [
            { validator: 'required' },
        ],
        password: [
            { validator: 'required' }
        ],
    },

    register: {
        name: [
            { validator: 'required' },
        ],
        password: [
            { validator: 'required' },
            { validator: 'password' },
        ],
    },

    talk: {
        title: [
            { validator: 'required' },
        ],
        description: [
            { validator: 'length', options: { min: 10, max: 100 }}
        ]
    },
}