import React, { useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { Mixins, Typography } from '../styles';
import { Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale } from '../styles/mixins';

const { width, height } = Dimensions.get('window');
const SnackBar = ({ state, text }) => {
  const headerHeight = useHeaderHeight();
  const bottomTabHeight = useBottomTabBarHeight() || 0;
  const entrance = useRef(new Animated.Value(height)).current;
  const x = height - bottomTabHeight * 2 - headerHeight - 10;
  console.log('TEst' + state);
  const entranceIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(entrance, {
      toValue: moderateScale(x),
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const entranceOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(entrance, {
      toValue: height,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  if (state === 'ENTER') {
    entranceIn();
  }
  if (state === 'EXIT') {
    entranceOut();
  }
  return (
    <Animated.View style={{ width: Mixins.WINDOW_WIDTH, height: 50, zIndex: 99999, top: entrance, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={[
          { backgroundColor: 'black', width: Mixins.scaleSize(300), height: 40, alignItems: 'center', borderRadius: 2, justifyContent: 'center' },
          Mixins.generateBoxShadowStyle(-2, 4, '#999', 0.8, 3, 5, '#999'),
        ]}
      >
        <Text style={{ fontFamily: Typography.FONT_FAMILY_BODY, color: 'white', fontSize: Typography.FONT_SIZE_18 }}>
          {' '}
          <Icon name="information" color={'#fff'} size={18} />
          {'\t'}
          {text}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export default SnackBar;
