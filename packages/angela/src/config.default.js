export default {
    key: 'ANGELA',

    cookie: {
        encode: true, //是否加密
        exclude: /^TOKEN_/ //排除需要被加密的Cookie项
    },

    request: {

    },

    graphql: {
        endpoint: '/graphql',
        options: {
            credentials: 'include'
        }
    },

    service: {
        items: {}
    },

    socket: {
        
    },

    util: {

    }
}