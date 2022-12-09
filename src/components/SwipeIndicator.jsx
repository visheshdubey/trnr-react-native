import { View, Text } from 'react-native';
import React from 'react';
import { Mixins } from '../styles';

export default function SwipeIndicator({ currentPos, style }) {
  return (
    <View style={[{ width: Mixins.WINDOW_WIDTH, flexDirection: 'row', justifyContent: 'center' }, { ...style }]}>
      <View
        style={[
          { width: 10, height: 10, borderRadius: 10, marginHorizontal: 5 },
          currentPos !== 0 ? { backgroundColor: 'transparent', borderWidth: 1, borderColor: 'white' } : { backgroundColor: '#fff' },
        ]}
      />
      <View
        style={[
          { width: 10, height: 10, borderRadius: 10, marginHorizontal: 5 },
          currentPos !== 1 ? { backgroundColor: 'transparent', borderWidth: 1, borderColor: 'white' } : { backgroundColor: '#fff' },
        ]}
      />
      <View
        style={[
          { width: 10, height: 10, borderRadius: 10, marginHorizontal: 5 },
          currentPos !== 2 ? { backgroundColor: 'transparent', borderWidth: 1, borderColor: 'white' } : { backgroundColor: '#fff' },
        ]}
      />
    </View>
  );
}
