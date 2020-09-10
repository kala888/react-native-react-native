import AuthTools from '../auth-tools'
import { log } from '../nice-router-util'

const AuthTokenProcessor = async (url, options) => {
  const token = await AuthTools.getTokenAsync()
  log('set Authorization token to Request Header:', token)
  const { headers } = options

  return {
    options: {
      ...options,
      headers: {
        ...headers,
        'X-Auth-Token': token,
      },
    },
  }
}

export default AuthTokenProcessor
