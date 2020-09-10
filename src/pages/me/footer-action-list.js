import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import _ from 'lodash'
import { Button } from '@ant-design/react-native'
import colors from '@/utils/colors'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import ProtectedChecker from '@/service/touch-id/protected-checker'
import NavigationService from '@/nice-router/navigation-service'
import TouchIdTools from '@/service/touch-id/touch-id-tools'

export default function FooterActionList(props) {
  const { isLogin, onLogout, loginOption, onSuccess } = props
  const { getSupportType, isEnabled } = TouchIdTools.g()

  const handleGoLogin = async () => await NavigationService.navigate('LoginPage')
  const handleGoLogout = async () => {
    onLogout()
    await ProtectedChecker.logout()
  }

  const list = []
  if (isLogin) {
    list.push({
      title: '退出登录',
      style: styles.logoutButton,
      onPress: handleGoLogout,
    })
  } else {
    const showAsTouchIdLogin = loginOption === ProtectedChecker.FACE_LOGIN_OPTION
    const showTouchIdLogin = showAsTouchIdLogin && isEnabled()

    if (showTouchIdLogin) {
      list.push({
        title: `${getSupportType().title}登录`,
        onPress: onSuccess,
      })
    }
    list.push({
      title: showTouchIdLogin ? '其他方式登录' : '去登录',
      onPress: handleGoLogin,
    })
  }

  const action = _.get(list, 0, {})
  const secondAction = _.get(list, 1, {})

  return (
    <View style={styles.footer}>
      <Button style={[styles.footerButton, action.style]} onPress={action.onPress}>
        <Text style={styles.footerButtonTxt}>{action.title}</Text>
      </Button>
      {isNotEmpty(secondAction) && (
        <Text style={styles.footerButtonBrief} onPress={secondAction.onPress}>
          {secondAction.title}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    marginHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 20,
  },

  footerButton: {
    marginHorizontal: 20,
    backgroundColor: colors.primaryColor,
    borderColor: colors.primaryColor,
    borderRadius: 6,
  },
  footerButtonTxt: {
    color: '#fff',
    fontWeight: '700',
  },
  footerButtonBrief: {
    marginTop: 14,
    paddingRight: 20,
    fontSize: 12,
    alignSelf: 'flex-end',
  },
})
