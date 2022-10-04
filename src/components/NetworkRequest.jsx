import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Mixins } from '../styles';

const image = require('../assets/images/page_not_found.png');
const NetworkRequest = ({ data, error, isLoading, children }) => {
  return (
    <View style={styles.center}>
      {error ? (
        <Image source={image} width={Mixins.scaleSize(100)} />
      ) : isLoading ? (
        <ActivityIndicator color="#000" />
      ) : data ? (
        children
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NetworkRequest;
