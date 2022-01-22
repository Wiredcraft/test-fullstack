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
        ],
    },

    talk: {
        title: [
            { validator: 'required' },
        ],
        description: [
            { validator: 'required' },
            { validator: 'length', options: { min: 10, max: 100 }}
        ]
    },
}