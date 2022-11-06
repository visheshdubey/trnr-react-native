import React from 'react';
import { View, StyleSheet, Pressable, Image, Text } from 'react-native';
import { Mixins, Typography } from '../styles';

import { useNavigation } from '@react-navigation/native';

function Product_Item({ item }) {
  const navigation = useNavigation();
  // if(LOG===true) console.log(props);

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
        <Image style={styles.imageStyles} source={{ uri: item.image }} resizeMode="cover" />
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
  text: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_18,
  },
  separator: { flex: 1, borderBottomWidth: 1, borderColor: '#eee' },
});

export default Product_Item;
