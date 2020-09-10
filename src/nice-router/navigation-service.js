import React from 'react'
import ActionUtil from './action-util'
import { CommonActions } from '@react-navigation/native'
import { Modal } from '@ant-design/react-native'

import { isEmpty, isLocalPagePath, isNotEmpty, LoadingType, noop, parseTaroUri } from './nice-router-util'
import AuthTools from '@/nice-router/auth-tools'
import ProtectedChecker from '@/service/touch-id/protected-checker'
import TouchIdTools from '@/service/touch-id/touch-id-tools'

export const navigationRef = React.createRef()
export const currentScreenRef = React.createRef()
let reduxDispatch = null

const isH5Path = (uri = '') => {
  const str = uri.trim().toLowerCase()
  return str.startsWith('https://') || str.startsWith('http://')
}

const NavigationService = {
  setDispatch(dispatch) {
    if (!reduxDispatch) {
      reduxDispatch = dispatch
    }
  },

  dispatch(type, payload) {
    if (!reduxDispatch) {
      console.error('The redux method dispatch not ready')
      return
    }
    reduxDispatch({ type, payload })
  },

  reset(routeName, params) {
    const navigation = this.getNavigation()
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'HomePage' }],
      })
    )
  },

  /**
   *
   * @param delta
   * @param data
   * @param _page
   * @returns {Promise<any>}
   *
   * eg. 后退传参 NavigationService.back({data},this)
   */
  back() {
    const navigation = this.getNavigation()
    navigation.dispatch(CommonActions.goBack())
  },

  /**
   *
   * @param routeName
   * @param params
   * @param options
   * @returns {Promise<any>}
   */
  navigate(routeName, params, options = {}) {
    const navigation = this.getNavigation()
    navigation.navigate(routeName, params)
  },

  view(action, params = {}, options = {}) {
    return this.routeTo({ action, params, ...options })
  },

  ajax(action, params, options = {}) {
    return this.routeTo({
      action,
      params,
      loading: LoadingType.none,
      ...options,
      statInPage: true,
    })
  },

  post(action, params, options = {}) {
    return this.routeTo({
      action,
      params,
      ...options,
      method: 'post',
    })
  },

  put(action, params, options = {}) {
    return this.routeTo({
      action,
      params,
      ...options,
      method: 'put',
    })
  },

  async routeTo(routerParams) {
    const action = ActionUtil.trans2Action(routerParams)
    const { linkToUrl, params } = action
    if (isEmpty(linkToUrl)) {
      return
    }

    // action上带有属性，confirmContent, 触发先confirm再执行相关动作
    const confirmContent = ActionUtil.getConfirmContent(action)
    if (isNotEmpty(confirmContent)) {
      const confirmResp = Modal.prompt(action.title, confirmContent)
      if (!confirmResp.confirm) {
        return
      }
    }

    // 1, 前端页面跳转, page:///pages/home/home-page?type=qa 或跳转到HomePage的screen
    if (isLocalPagePath(linkToUrl)) {
      const { queryParams, pathname } = parseTaroUri(linkToUrl)
      return this.navigate(pathname, { ...params, ...queryParams })
    }

    // 2, H5跳转：目标页面是Http页面，小程序中需要跳转到webview
    if (isH5Path(linkToUrl)) {
      const h5Param = { linkToUrl }
      return this.navigate('H5Page', h5Param)
    }

    // 3, 后端路由, 获取后端路由缓存 TODO
    // const cachedPage = localCacheService.getCachedPage(linkToUrl)
    // const cachedPage = false
    // log('go to cached page first', cachedPage)
    // // 如果缓存存在，做页面跳转
    // if (cachedPage) {
    //   // this.navigate(cachedPage)
    //   // TODO
    //   log('need CACHE the DATA', cache)
    //   // if (cache) {
    //   //   return
    //   // }
    // }

    // 发送请求
    this.dispatch('niceRouter/route', action)
  },

  getNavigation(props) {
    const navigation = navigationRef.current ? navigationRef.current : {}
    const { dispatch, navigate } = navigation
    return {
      ...navigation,
      dispatch: dispatch || props.dispatch || noop,
      navigate: navigate || props.navigate || noop,
    }
  },

  async safeView(props) {
    const { needLogin = true } = props

    //1.无需登录，直接过
    if (!needLogin) {
      this.view(props)
      return
    }

    //2. token 失效，跳登录
    const loginInfo = await AuthTools.getLoginInfo()
    if (!loginInfo.isValid) {
      await this.navigate('LoginPage', { callbackAction: props })
      return
    }

    //3. token有效，校验touchId保护
    ProtectedChecker.checkLogin().then((result) => {
      // 3.1 通过，直接pass
      if (result === ProtectedChecker.CHECK_PASSED) {
        this.view(props)
        return
      }
      // 3.1 普通登录，同2
      if (result === ProtectedChecker.COMMON_LOGIN_OPTION) {
        this.navigate('LoginPage', { callbackAction: props })
        return
      }
      // 3.1 需要TouchIdLogin，直接校验touchID
      if (result === ProtectedChecker.FACE_LOGIN_OPTION) {
        const { doTouchIdLogin } = TouchIdTools.g()
        doTouchIdLogin().then(() => {
          this.view(props)
        })
      }
    })
  },
}

export default NavigationService
