import React, { useEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview'
import NavigationService from '@/nice-router/navigation-service'
import AuthTools from '@/nice-router/auth-tools'
import { Linking, StatusBar, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button } from '@ant-design/react-native'
import device from '@/nice-router/device'
import { StackActions } from '@react-navigation/native'
import _ from 'lodash'
import ActionIcon from '../conponents/action-icon'
import { SafeAreaView } from 'react-native-safe-area-context'
import LocationService from '@/service/location-service'
import PermissionService from '@/service/permission-service'
import colors from '@/utils/colors'
import NetworkErrorPage from '@/nice-router/network-error.page'

const queryString = require('query-string')

const NETWORK_ISSUE_CODE = [-6, -2, -11, -8, -1, -1009, 310]

export default function H5Page({ route, navigation }) {
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const { uri, linkToUrl } = route.params
  const src = uri || linkToUrl
  console.log('action path in H5', src)

  const [injectJSContent, setInjectJSContent] = useState()
  const webview = useRef()

  // 1. 加载H5之前，获取token
  useEffect(() => {
    // 注入之前，应该做域名校验，防止安全问题
    if (src.indexOf('doublechaintech.com') === -1) {
      return
    }
    AuthTools.getTokenAsync().then((token = {}) => {
      setInjectJSContent(
        `(function() {
        window.localStorage.setItem('token', '${token}');
        window.localStorage.setItem('refer', 'native-app');
      })();
       true;
      `
      )
    })
  }, [src])

  //回调H5上的方法，默认去widow上的callback，传字符串
  const callbackH5Function = (funcName, object) => {
    const str = JSON.stringify(object)
    const runScript = `
    // alert(typeof window.${funcName} )
      if(typeof window.${funcName} === 'function' ){
        window.${funcName}('${str}')
      }
      true;
    `
    webview.current.injectJavaScript(runScript)
  }

  const getDeviceInfo = (action) => callbackH5Function(action.callback || 'setDeviceInfo', device)
  const getLocation = _.throttle((action) => {
    LocationService.getLocation()
      .then((location) => {
        console.log('location', location)
        callbackH5Function(action.callback || 'setLocation', location)
      })
      .catch((error) => {
        callbackH5Function(action.callback || 'setLocation', error)
      })
  }, 1000)

  const checkPermission = (action) => {
    PermissionService.check(action.value)
      .then((result) => {
        callbackH5Function(action.callback || 'setPermission', { code: result })
      })
      .catch(() => {
        callbackH5Function(action.callback || 'setPermission', {
          code: 'error',
        })
      })
  }

  const checkCameraPermission = (action) => {
    PermissionService.checkCameraPermission()
      .then((result) => {
        callbackH5Function(action.callback || 'setPermission', { code: result })
      })
      .catch(() => {
        callbackH5Function(action.callback || 'setPermission', {
          code: 'error',
        })
      })
  }

  const actions = {
    saveToken: (action) => AuthTools.saveTokenAsync(action),
    goLogin: (action) => NavigationService.getNavigation().dispatch(StackActions.replace('LoginPage', action)),
    setTitle: (action) => setHeaderTitle(action.title),
    getDeviceInfo: getDeviceInfo,
    getLocation: getLocation,
    view: (action) => NavigationService.view(action),
    goSetting: () => Linking.openSettings().then(),
    checkPermission: checkPermission,
    checkCameraPermission: checkCameraPermission,
  }

  // H5 端口发来登录命令，
  const handleMessage = (event) => {
    // console.log('callll event....', event)
    const { nativeEvent = {} } = event
    const { data = '{}' } = nativeEvent
    if (!_.isNil(nativeEvent.canGoBack)) {
      setCanGoBack(event.nativeEvent.canGoBack)
      setCanGoForward(event.nativeEvent.canGoForward)
    }

    const action = JSON.parse(data)
    const targetFunction = actions[action.code]
    console.log('callll....', action)
    if (targetFunction) {
      targetFunction(action)
    }
  }

  const handleH5Back = () => {
    webview.current.goBack()
  }
  const handleH5Forward = () => {
    webview.current.goForward()
  }

  const setHeaderTitle = (title = '') => {
    console.log('set...', title)
    if (!_.startsWith(title, 'http')) {
      navigation.setOptions({ headerTitle: title })
    }
  }

  const handleStateChange = (navState) => {
    setCanGoBack(navState.canGoBack)
    setCanGoForward(navState.canGoForward)
    const { url, title } = navState
    const parsed = queryString.parse(url)
    setHeaderTitle(title || parsed.headerTitle)
  }

  const renderError = (errorName, code) => {
    const isNetworkIssue = NETWORK_ISSUE_CODE.indexOf(code) > -1
    const title = isNetworkIssue ? '网络状态待提升，稍后重试' : '出错啦，请稍后再试'
    const brief = isNetworkIssue ? '' : `错误代码: ${code}`
    return <NetworkErrorPage title={title} brief={brief} networkError={isNetworkIssue} />
  }

  return (
    <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#f4f4f4', width: '100%', height: '100%' }}>
      <StatusBar backgroundColor={'#fff'} barStyle='dark-content' />
      <WebView
        ref={webview}
        source={{ uri: src }}
        javaScriptEnabled
        injectedJavaScript={injectJSContent}
        onMessage={handleMessage}
        startInLoadingState
        showsVerticalScrollIndicator={false}
        allowsBackForwardNavigationGestures={false}
        mediaPlaybackRequiresUserAction={false}
        onNavigationStateChange={handleStateChange}
        renderLoading={() => <ActivityIndicator toast text='正在加载' />}
        renderError={renderError}
      />

      {(canGoBack || canGoForward) && (
        <View style={styles.footer}>
          <Button style={styles.footerBtn} disabled={!canGoBack} onPress={handleH5Back}>
            <ActionIcon icon='antd-left' size={24} />
          </Button>
          <Button style={styles.footerBtn} disabled={!canGoForward} onPress={handleH5Forward}>
            <ActionIcon icon='antd-right' size={24} />
          </Button>
        </View>
      )}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    height: device.isBigger ? 50 : 46,
    alignItems: 'center',
  },
  footerBtn: {
    paddingHorizontal: 10,
    marginHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 4,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  error: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTest: {
    color: colors.textColorLight,
  },
})
