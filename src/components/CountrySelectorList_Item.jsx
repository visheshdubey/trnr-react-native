import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Mixins, Typography } from '../styles';
import { useNavigation } from '@react-navigation/native';

function CountrySelectorList_Item({ item, style }) {
  const navigation = useNavigation();

  return (
    <View style={[styles.separator, style]} key={item.id}>
      <Pressable
        style={styles.container}
        onPress={() =>
          navigation.navigate('SignUp', {
            countryName: item.name,
          })
        }
      >
        <View>
          <Text style={styles.exercise}>{item.name}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Mixins.scaleSize(340),
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Mixins.scaleSize(10),
    height: Mixins.scaleSize(42),
  },
  imageStyles: {
    width: Mixins.scaleSize(24),
    height: Mixins.scaleSize(24),
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  exercise: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_18,
    marginLeft: Mixins.scaleSize(40), // This was chenged when we removed the image
  },
  productName: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    color: '#aaa',
  },
  // textBox:{
  //   fl
  // }
  separator: { flex: 1, borderBottomWidth: 1, borderColor: '#eee' },
});

export default CountrySelectorList_Item;
