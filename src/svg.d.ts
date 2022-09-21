declare module '*.svg' {
  import { FunctionComponent } from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: FunctionComponent<SvgProps>;
  export default content;
}
