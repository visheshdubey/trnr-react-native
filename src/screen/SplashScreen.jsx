import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Logo from '../components/Logo';
import { Mixins } from '../styles';
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Logo />
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
