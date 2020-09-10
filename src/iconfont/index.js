/* eslint-disable */

import React from 'react'

import IconfontFaceid from './IconfontFaceid'
import IconfontDocs from './IconfontDocs'
import IconfontFingerprint from './IconfontFingerprint'
import IconfontCc from './IconfontCc'
import IconfontFile from './IconfontFile'
import IconfontMoney from './IconfontMoney'
import IconfontBook from './IconfontBook'
import IconfontYuan from './IconfontYuan'
import IconfontLock from './IconfontLock'
import IconfontSecurityCheck from './IconfontSecurityCheck'

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'font-faceid':
      return <IconfontFaceid key='1' {...rest} />
    case 'font-docs':
      return <IconfontDocs key='2' {...rest} />
    case 'font-fingerprint':
      return <IconfontFingerprint key='3' {...rest} />
    case 'font-cc':
      return <IconfontCc key='4' {...rest} />
    case 'font-file':
      return <IconfontFile key='5' {...rest} />
    case 'font-money':
      return <IconfontMoney key='6' {...rest} />
    case 'font-book':
      return <IconfontBook key='7' {...rest} />
    case 'font-yuan':
      return <IconfontYuan key='8' {...rest} />
    case 'font-lock':
      return <IconfontLock key='9' {...rest} />
    case 'font-security-check':
      return <IconfontSecurityCheck key='10' {...rest} />
  }

  return null
}

export default React.memo ? React.memo(IconFont) : IconFont
