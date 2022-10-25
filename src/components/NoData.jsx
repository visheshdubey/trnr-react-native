import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Mixins, Typography } from '../styles';

const NoData = () => {
  return (
    <View style={styles.center}>
      <View style={styles.NoData}>
        <Text style={styles.NoDataText}>NOTHING TO SHOW</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  NoData: {
    backgroundColor: '#fff',
    paddingHorizontal: Mixins.scaleSize(48),
    paddingVertical: Mixins.scaleSize(16),
    borderColor: '#CDB01A',
    borderWidth: 2,
    borderRadius: 10,
  },
  NoDataText: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_18,
    color: '#888',
  },
});

export default NoData;
