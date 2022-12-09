import React from 'react';
import { View, StyleSheet } from 'react-native';

const WebView = () => {
  return <WebView style={styles.container} source={{ uri: 'https://expo.dev' }} />;
};

const styles = StyleSheet.create({});

export default WebView;
