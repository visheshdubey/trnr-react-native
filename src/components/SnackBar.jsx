import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { Mixins, Typography } from '../styles';
import { Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale } from '../styles/mixins';

const { width, height } = Dimensions.get('window');
const SnackBar = ({ state, text }) => {
  const bottomTabHeight = useBottomTabBarHeight() || 0;
  console.log(bottomTabHeight);
  const down = -bottomTabHeight * 2;
  const entrance = useRef(new Animated.Value(-150)).current;
  const entranceIn = () => {

    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(entrance, {
      toValue: moderateScale(10),
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const entranceOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(entrance, {
      toValue: down,
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
  //top: entrance,
  return (
    <>
    {<Animated.View style={{ width: Mixins.WINDOW_WIDTH, height: moderateScale(50), zIndex: 99999, bottom: entrance, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={[
          { backgroundColor: 'black', width: Mixins.scaleSize(300), height: 40, alignItems: 'center', borderRadius: 2, justifyContent: 'center' },
          Mixins.generateBoxShadowStyle(-2, 4, '#999', 0.8, 3, 5, '#999'),
        ]}
      >
        <Text style={{ fontFamily: Typography.FONT_FAMILY_BODY, color: 'white', fontSize: Typography.FONT_SIZE_18 }}>
          {' '}
          <Icon name="information" color={'#fff'} size={moderateScale(18)} />
          {'\t'}
          {text}
        </Text>
      </View>
    </Animated.View>}</>
  );
};

const styles = StyleSheet.create({});

export default SnackBar;
