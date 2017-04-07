import { commonConfig } from './config.common'

export const prodConfig = Object.assign({}, commonConfig, {
    port: '8080',
    apiUrl: '/api'
})
