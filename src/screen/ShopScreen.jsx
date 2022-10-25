import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

import { Linking } from 'react-native';

export default function ShopScreen() {
  useEffect(() => {
    Linking.openURL('https://trnr.com');
  }, []);
  return (
    <View>
      <Text>ShopScreen</Text>
    </View>
  );
}
