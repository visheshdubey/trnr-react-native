import * as React from 'react';
import { Image } from 'react-native';
// Image
import { Mixins } from '../styles';

const Logo = ({ style }) => (

  <>
    <Image
      style={{ maxWidth: Mixins.moderateScale(105), maxHeight: Mixins.moderateScale(36), width: Mixins.moderateScale(105), height: Mixins.moderateScale(36), borderWidth: 1 }}
      source={require('../assets/images/trnr-logo.png')}
      resizeMode="contain"
    ></Image>
  </>
);
export default Logo;
