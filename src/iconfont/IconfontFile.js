/* eslint-disable */

import React from 'react'
import { Svg, Path } from 'react-native-svg'
import { getIconColor } from './helper'

const IconfontFile = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox='0 0 1024 1024' width={size} height={size} {...rest}>
      <Path
        d='M858.251002 65.538669 709.22692 65.538669l-0.204661 0.184195c-0.112564 0-0.204661-0.038886-0.312108-0.038886-13.967106 0-25.461905 10.3006-27.538193 23.667026l-0.248663 0.225127c-7.556093 33.045627-18.427698 76.41232-53.822836 76.41232l-246.183935-1.517563c-34.927487 0-45.37442-42.771129-53.413514-75.16491-1.36509-13.386892-12.069897-23.892153-25.568329-24.910343l-0.370437-0.375553L165.181063 64.020082c-20.552082 0-37.239136 16.666588-37.239136 37.239136l0 819.454394c0 20.571525 16.686031 37.238113 37.239136 37.238113l693.049472 1.517563c20.557198 0 37.239136-16.666588 37.239136-37.238113L895.469672 102.777805C895.490138 82.205257 878.788757 65.538669 858.251002 65.538669L858.251002 65.538669 858.251002 65.538669zM858.251002 922.232199l-693.069939-1.517563L165.181063 101.260242l126.998439 0c9.087982 36.459377 26.38288 100.44569 88.810698 100.44569l246.183935 1.517563c62.952774 0 80.69281-64.810075 88.940658-100.44569L858.230536 102.777805l0 819.454394L858.251002 922.232199 858.251002 922.232199 858.251002 922.232199zM407.172513 101.372805l209.110575 1.517563c10.295484 0 18.61701-8.346085 18.61701-18.622126 0-10.277064-8.321526-18.61701-18.61701-18.61701L407.172513 64.133669c-10.281157 0-18.622126 8.339946-18.622126 18.61701C388.550387 93.025697 396.891356 101.372805 407.172513 101.372805L407.172513 101.372805 407.172513 101.372805zM246.674099 381.845685c0 10.276041 8.339946 18.61701 18.61701 18.61701l497.744321 1.517563c10.295484 0 18.622126-8.340969 18.622126-18.61701 0-10.277064-8.326643-18.622126-18.622126-18.622126l-497.744321-1.517563C255.014044 363.223558 246.674099 371.56862 246.674099 381.845685L246.674099 381.845685 246.674099 381.845685zM763.03543 542.794353l-497.744321-1.517563c-10.277064 0-18.61701 8.321526-18.61701 18.61701 0 10.3006 8.339946 18.622126 18.61701 18.622126l497.744321 1.517563c10.295484 0 18.622126-8.321526 18.622126-18.622126C781.657556 551.115879 773.330914 542.794353 763.03543 542.794353L763.03543 542.794353 763.03543 542.794353zM763.03543 719.526497l-497.744321-1.517563c-10.277064 0-18.61701 8.321526-18.61701 18.622126 0 10.295484 8.339946 18.61701 18.61701 18.61701l497.744321 1.517563c10.295484 0 18.622126-8.321526 18.622126-18.61701C781.657556 727.848023 773.330914 719.526497 763.03543 719.526497L763.03543 719.526497 763.03543 719.526497zM763.03543 719.526497'
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  )
}

IconfontFile.defaultProps = {
  size: 18,
}

export default React.memo ? React.memo(IconfontFile) : IconfontFile