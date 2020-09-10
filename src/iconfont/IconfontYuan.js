/* eslint-disable */

import React from 'react'
import { Svg, Path } from 'react-native-svg'
import { getIconColor } from './helper'

const IconfontYuan = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox='0 0 1024 1024' width={size} height={size} {...rest}>
      <Path
        d='M463.3 958.3V772.1H228.8v-77.5h234.5v-80.5H228.8v-83.5H420L191.5 128h113.7L469 420.6c18.2 33.4 32.4 62.4 42.7 86.9 9-19.8 24.6-50.5 46.8-92.1L713.9 128h120.8L605.5 530.6h192.9v83.5H564.9v80.5h233.5v77.5H564.9v186.2H463.3z'
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  )
}

IconfontYuan.defaultProps = {
  size: 18,
}

export default React.memo ? React.memo(IconfontYuan) : IconfontYuan
