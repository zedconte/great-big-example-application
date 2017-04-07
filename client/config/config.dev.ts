import { commonConfig } from './config.common'

export const devConfig = Object.assign({}, commonConfig, {
  port: '3130',
  apiUrl: '/api'
})
