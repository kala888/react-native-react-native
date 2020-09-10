import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomePage from '../pages/home/home-page'
import MePage from '../pages/me/me-page'
import { IconOutline } from '@ant-design/icons-react-native'
import colors from '@/utils/colors'

const Tab = createBottomTabNavigator()
export default function BottomTabs() {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const iconName = route.name === 'HomePage' ? 'home' : 'user'
      return <IconOutline name={iconName} size={size} color={color} />
    },
  })
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        activeTintColor: colors.primaryColor,
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='HomePage' options={{ tabBarLabel: '首页' }} component={HomePage} />
      <Tab.Screen name='MePage' options={{ tabBarLabel: '我的' }} component={MePage} />
    </Tab.Navigator>
  )
}
