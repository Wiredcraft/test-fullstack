import request from './request';
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

module.exports = {
    request: request({ baseUrl: serverRuntimeConfig.baseUrl })
}