import StorageTools from './storage-tools'
import TouchIdTools from '@/service/touch-id/touch-id-tools'

const TOKEN = 'TOKEN'
const AUTH_INFO = 'AUTH_INFO'

async function saveTokenAsync(token) {
  StorageTools.set(TOKEN, token)
  // StorageTools.set(AUTH_INFO, authInfo)
  console.log('saveToken', token)
  // console.log('saveAuthInfo', authInfo)
  // return authInfo
}

async function getAuthInfoAsync() {
  const authInfo = await StorageTools.get(AUTH_INFO, {})
  return authInfo
}

async function getTokenAsync() {
  const token = await StorageTools.get(TOKEN, '')
  return token
}

async function logout() {
  StorageTools.remove(TOKEN)
  StorageTools.remove(AUTH_INFO)
  await TouchIdTools.g().logout()
}

const AuthTools = {
  getTokenAsync,
  getAuthInfoAsync,
  saveTokenAsync,
  logout,
}
export default AuthTools
