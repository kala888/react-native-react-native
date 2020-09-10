import React from 'react'
import _ from 'lodash'
import IconFont from '../iconfont'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const getType = (icon = '') => {
  if (icon.startsWith('http://') || icon.startsWith('https://')) {
    return {
      type: 'image',
      value: icon,
    }
  }
  const groups = /(\w+)-(.*)/.exec(icon)
  return { type: _.get(groups, 1), value: _.get(groups, 2, icon) }
}

const ActionIcon = ({ icon, size = 18, color, style = {} }) => {
  const { type, value } = getType(icon)
  if (type === 'image') {
    return null
  }
  if (type === 'iconfont') {
    return <IconFont name={`font-${value}`} size={size} color={color} style={style} />
  }
  if (type === 'antd') {
    return <AntDesignIcon name={value} size={size} color={color} style={style} />
  }
  return <FontAwesome5 name={value} size={size} color={color} style={style} />
}

export default ActionIcon
