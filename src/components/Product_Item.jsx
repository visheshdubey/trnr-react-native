import React from 'react';
import { View, StyleSheet, Pressable, Image, Text } from 'react-native';
import { Mixins, Typography } from '../styles';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import ProgressiveImage from './ProgressiveImage';
function Product_Item({ item }) {
  const navigation = useNavigation();

  return (
    <View style={styles.separator} key={item.id}>
      <Pressable
        style={styles.container}
        onPress={() =>
          navigation.navigate('NAV_ExerciseScreen', {
            categoryName: item.name,
            productId: item.id,
          })
        }
      >
        <ProgressiveImage styles={styles} image={item.image} blur_image={item.blur_image} />
        <Text style={styles.text}>{item.name}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Mixins.WINDOW_WIDTH,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Mixins.moderateScale(8, 0.1),
    height: Mixins.moderateScale(104, 0.1),
  },
  imageStyles: {
    width: Mixins.moderateScale(104, 0.1),
    height: Mixins.moderateScale(104, 0.1),
    borderRadius: 5,
    marginRight: Mixins.moderateScale(10, 0.1),
    backgroundColor: '#eee',
  },
  default: {
    position: 'absolute',
    width: Mixins.moderateScale(104, 0.1),
    height: Mixins.moderateScale(104, 0.1),
    bottom: 0,
    borderRadius: 5,
  },
  text: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_18,
  },
  separator: { flex: 1, borderBottomWidth: 1, borderColor: '#eee' },
});

export default Product_Item;
