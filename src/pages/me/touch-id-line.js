import React, { useState } from 'react'
import NavigationLine from './navigation-line'
import { noop } from '@/nice-router/nice-router-util'
import { Switch } from '@ant-design/react-native'
import GlobalToast from '@/nice-router/global-toast'
import TouchIdTools from '@/service/touch-id/touch-id-tools'

export default function TouchIdLineItem() {
  const { isSupport, isEnabled, setEnabled, getSupportType, doTouchIdLogin } = TouchIdTools.g()
  const [switchEnabled, setSwitchEnabled] = useState(isEnabled())

  const onSwitchChange = (value) => {
    setSwitchEnabled(value)

    if (value === true) {
      doTouchIdLogin()
        .then(() => {
          setEnabled(true).then(() => {
            setSwitchEnabled(true)
            GlobalToast.show({
              text: `${getSupportType().title}识别，开启成功`,
            })
          })
        })
        .catch(() => {
          setEnabled(false).then(() => setSwitchEnabled(false))
        })
      return
    }

    setEnabled(false).then(noop)
  }

  if (!isSupport()) {
    return null
  }

  return (
    <NavigationLine
      title={`${getSupportType().title}登录`}
      icon={getSupportType().code === 'FaceID' ? 'iconfont-faceid' : 'iconfont-fingerprint'}
      brief={<Switch checked={switchEnabled} onChange={onSwitchChange} />}
      onPress={noop}
      iconSize={20}
    />
  )
}
