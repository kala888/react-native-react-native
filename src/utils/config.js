import viewConfig from './viewmapping.config'

const baseURL = 'https://demo2.doublechaintech.com/storedev/wxappService/' //后端服务地址
const h5Prefix = 'https://demo2.doublechaintech.com/'

const Config = {
  name: 'NiceRouter App Start',
  baseURL,
  h5Prefix,
  version: '4.2',
  appType: 'app',
  viewConfig,
  backendRouterPageKeyBlackList: ['refreshPage/', 'goBack/', 'goPrevious/'],
  backendRouterPageBlackList: ['NetworkException'],
  api: {
    FooterHome: '/index',
    FooterMe: '/center',

    Login: '/login',
    LoginVerifyCode: '/login-sms-code',

    UserTerms: `${h5Prefix}/user-terms`,
    PrivacyTerms: `${h5Prefix}/privacy`,
    AboutUs: `${h5Prefix}/about-us`,
  },
  loginMethod: 'vcode',
  // loginMethod: 'password',
}

console.log('***********   current env  ***********   ')
console.log('config.js is', Config)
export default Config
