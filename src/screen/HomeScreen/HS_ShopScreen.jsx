import { View, Text } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';

export default function HS_ShopScreen({ route }) {
  const { link } = route.params;
  console.log(link);
  return <WebView source={{ uri: link }} />;
}
