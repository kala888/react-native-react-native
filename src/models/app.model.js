import AuthTools from '@/nice-router/auth-tools'

export default {
  namespace: 'app',
  state: {},
  reducers: {},
  effects: {
    *login({ payload = {} }) {},

    *logout() {
      console.log('logout from app')
      yield AuthTools.logout()
    },
  },
  subscriptions: {},
}
