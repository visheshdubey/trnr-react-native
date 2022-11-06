import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
import { Mixins } from '../styles';
const ProfileIcon = (props) => (
  <Svg width={18} height={18} fill={props.fill} xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#a)" fill={props.fill}>
      <Path d="M8.8 10.79c2.98 0 5.4-2.42 5.4-5.4C14.2 2.41 11.78 0 8.8 0 5.82 0 3.4 2.42 3.4 5.4c0 2.98 2.42 5.4 5.4 5.4v-.01Zm0-9.29c2.15 0 3.9 1.75 3.9 3.9s-1.75 3.9-3.9 3.9-3.9-1.75-3.9-3.9 1.75-3.9 3.9-3.9ZM16.14 13.62a4.947 4.947 0 0 0-3.52-1.46H4.97c-1.33 0-2.58.52-3.52 1.46A4.98 4.98 0 0 0 0 17.14c0 .41.34.75.75.75s.75-.34.75-.75c0-.93.36-1.8 1.02-2.46.66-.66 1.53-1.02 2.46-1.02h7.65c.93 0 1.8.36 2.46 1.02.66.66 1.02 1.53 1.02 2.46 0 .41.34.75.75.75s.75-.34.75-.75c0-1.33-.52-2.58-1.46-3.52h-.01Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h17.6v17.89H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ProfileIcon;
