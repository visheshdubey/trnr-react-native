import React from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import Logo from '../components/Logo';
import { Mixins } from '../styles';
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/trnr-logo-light.png')} style={{ width: 150 }} resizeMode="contain"></Image>
      <ActivityIndicator color="#000" style={styles.indicator}></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    marginTop: Mixins.moderateScale(15),
  },
});

export default SplashScreen;
