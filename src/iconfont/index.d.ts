/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  name: 'font-faceid' | 'font-docs' | 'font-fingerprint' | 'font-cc' | 'font-file' | 'font-money' | 'font-book' | 'font-yuan' | 'font-lock' | 'font-security-check';
  size?: number;
  color?: string | string[];
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
