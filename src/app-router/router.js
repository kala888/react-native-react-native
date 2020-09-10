import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'react-native'

import BottomTabs from './bottom-tabs'

import { currentScreenRef, navigationRef } from '@/nice-router/navigation-service'
import { useScreenOptions } from './screen-use'
import H5Page from '@/nice-router/h5.page'
import NetworkErrorPage from '@/nice-router/network-error.page'
import device from '@/nice-router/device'
import { appInitial } from '@/service/app-initial'
import ActionIcon from '../conponents/action-icon'

const Stack = createStackNavigator()

function getActiveRouteName(state) {
  const route = state.routes[state.index]

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state)
  }

  return route.name
}

const Router = () => {
  const screenOptions = useScreenOptions()

  useEffect(() => {
    appInitial()
  }, [])

  // TODO
  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       alert('物理返回键被拦截了！')
  //       return true
  //     }
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress)
  //     return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  //   }, [])
  // )

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        const previousRouteName = currentScreenRef.current
        const currentRouteName = getActiveRouteName(state)

        if (previousRouteName !== currentRouteName) {
          console.log('[onStateChange]', currentRouteName)
          if (currentRouteName === 'HomeScreen') {
            StatusBar.setBarStyle('dark-content') // 修改 StatusBar
          } else {
            StatusBar.setBarStyle('dark-content') // 修改 StatusBar
          }
        }
        // Save the current route name for later comparision
        currentScreenRef.current = currentRouteName
      }}
    >
      <Stack.Navigator initialRouteName='MePage' screenOptions={screenOptions}>
        <Stack.Screen name='BottomTabScreen' component={BottomTabs} options={{ headerShown: false }} />

        <Stack.Screen
          options={{
            headerTitle: '',
            headerStyle: {
              height: device.isBigger ? 80 : 50,
              elevation: 1,
            },
            headerBackImage: () => (
              <ActionIcon icon='antd-close' size={22} style={{ paddingLeft: device.isBigger ? 10 : 0 }} />
            ),
          }}
          name='H5Page'
          component={H5Page}
        />
        <Stack.Screen options={{ headerTitle: '网络异常' }} name='NetworkErrorPage' component={NetworkErrorPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
