import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

const HomeIcon = (props) => (
  <Svg width={17} height={18} fill={props.fill} xmlns="http://www.w3.org/2000/svg">
    <G clipPath="url(#a)" fill={props.fill}>
      <Path d="M16.74 7.936 9 .206a.704.704 0 0 0-.99 0L.205 8.01A.7.7 0 0 0 0 8.505v8.786c0 .382.317.7.7.7.383 0 .7-.318.7-.7V8.795L8.505 1.69l7.03 7.03v7.87H4.155c-.383 0-.7.318-.7.7 0 .383.317.7.7.7h12.09c.383 0 .7-.317.7-.7V8.43a.7.7 0 0 0-.205-.494Z" />
      <Path d="M4.164 15.311h9.42c.383 0 .7-.317.7-.7 0-.383-.317-.7-.7-.7h-9.42c-.383 0-.7.317-.7.7 0 .383.317.7.7.7Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16.945v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default HomeIcon;
