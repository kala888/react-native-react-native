/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import 'react-native-gesture-handler'
import NiceRouter from '@/nice-router/nice-router'
import Config from '@/utils/config'
import { Provider } from 'react-redux'
import { LogBox } from 'react-native'
import { Provider as AntdProvider } from '@ant-design/react-native'

import dva from './src/dva'
import models from './src/models/model-center'

import Router from './src/app-router/router'

LogBox.ignoreLogs([
  'Require cycle:',
])

const dvaApp = dva.createApp({
  initialState: {},
  enableLog: false,
  models: models,
})
const store = dvaApp.getStore()

NiceRouter.start({ config: Config, dispatch: dva.getDispatch() })

const App = () => {
  return (
    <Provider store={store}>
      <AntdProvider>
        <Router />
      </AntdProvider>
    </Provider>
  )
}

export default App
