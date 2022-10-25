import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const WorkoutIcon = (props) => (
  <Svg width={27} height={18} fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clipPath="url(#a)">
      <Path
        d="M23.932 3.707h-.511A3.87 3.87 0 0 0 19.56 0h-1.854a.966.966 0 0 0-.959.959V8.04H9.96V.96A.966.966 0 0 0 9 0H7.146a3.87 3.87 0 0 0-3.86 3.707h-.512A2.769 2.769 0 0 0 0 6.47v5.05a2.78 2.78 0 0 0 2.774 2.774h.512A3.87 3.87 0 0 0 7.146 18H9a.966.966 0 0 0 .959-.959V9.96h6.788v7.082c0 .524.435.959.959.959h1.854a3.87 3.87 0 0 0 3.86-3.707h.512a2.78 2.78 0 0 0 2.774-2.774v-5.05a2.78 2.78 0 0 0-2.774-2.774v.012ZM1.918 11.518v-5.05c0-.472.383-.856.856-.856h.486v6.75h-.486a.857.857 0 0 1-.856-.856v.012ZM8.04 16.07h-.895a1.956 1.956 0 0 1-1.956-1.956V3.874c0-1.087.882-1.956 1.956-1.956h.895v14.164-.012Zm13.487-1.956a1.956 1.956 0 0 1-1.956 1.956h-.894V1.918h.894c1.087 0 1.956.882 1.956 1.956v10.24Zm3.26-2.596a.857.857 0 0 1-.856.857h-.486v-6.75h.486c.473 0 .856.384.856.857v5.05-.014Z"
        fill={props.fill}
      />
    </G>
  </Svg>
);

export default WorkoutIcon;
