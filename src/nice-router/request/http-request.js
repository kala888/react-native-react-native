import request from 'umi-request'
import { log } from '../nice-router-util'
import OptionsProcessor from './options-processor'
import AuthTokenProcessor from './auth-token-processor'
import LoadingAndLogsProcessor from '@/nice-router/request/loading-and-logs-processor'
import CustomProcessor from '@/nice-router/request/custom-processor'

request.interceptors.request.use(OptionsProcessor)
request.interceptors.request.use(AuthTokenProcessor)
request.use(LoadingAndLogsProcessor)
request.use(CustomProcessor)

const httpRequest = {
  send(uri, options = {}) {
    log('http-request options', options)
    return request(uri, { ...options })
  },
}

export default httpRequest
