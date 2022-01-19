// next.config.js

const withLess = require('@zeit/next-less')

module.exports = withLess({
  serverRuntimeConfig: {
    baseUrl: 'http://utopia:7003',
    // baseUrl: 'http://192.168.1.102:7001'
    // baseUrl: 'http://192.168.111.2:7004'
  },
  useFileSystemPublicRoutes: false,
  experimental: {
    documentMiddleware: true
  },
  cssModules: true,
  webpack (config, options) {
    return config;
  }
})