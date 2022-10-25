import React from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Mixins, Typography } from '../styles';
import NoData from './NoData';

const NetworkRequest = ({ data, error, isLoading, children }) => {
  return <View style={styles.center}>{error ? <Error /> : isLoading ? <ActivityIndicator color="#000" /> : data ? children : <NoData />}</View>;
};

const Error = () => {
  return (
    <View style={styles.error}>
      <Text style={styles.errorText}>CONNECTION ERROR</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    backgroundColor: '#FFD9D9',
    paddingHorizontal: Mixins.scaleSize(48),
    paddingVertical: Mixins.scaleSize(32),
    borderColor: '#FF2D2D',
    borderWidth: 2,
    borderRadius: 10,
  },
  errorText: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_18,
    color: '#FF2d2d',
  },
});

export default NetworkRequest;
