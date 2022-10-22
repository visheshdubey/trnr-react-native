import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Mixins, Typography } from '../styles';
import { useNavigation } from '@react-navigation/native';

function CountrySelectorList_Item({ item, style }) {
  const navigation = useNavigation();
  // console.log(props);

  return (
    <View style={[styles.separator, style]} key={item.id}>
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate('SignUp', {
            countryName: item.name,
          })
        }
      >
        {/* <Image
          style={styles.imageStyles}
          source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAPzSURBVHja7JdNb9xUFIafa3s+kslkJpO0Cf2AftBWILWKVLGpVCGVDRLLrvgd/BW23bCr2LCrxAIJAQWhglBpK1qpoKYU2iZtkvHYY/veew6LOMkMidOs0k2PZFnWubr38bnve3xtVJXXGQGvOd4AGCAEGuX9IMMDeQRMX/30+sswMpUj06TBZCvn+hfX9jXzi49PowQYpPrNg4DZG5/3IqAThIbLl96pHFwUEfW6A67sC6BxZR7FYKh2mLv7EKATAQ3vhaJwrPdzNl1pyoKoQpZFNJsOeFru2m6hWzl5FiGbFdCNuXRzCBDMtJG8AGhEAOKVbOjIMjcmjs3Ic0NgHJDvqwKa5aW+hZF1t2NYA7uxVgRgnTDMxgHGxg8N4IDh/gCGOToCsCNfr0ExAuC9kKQF6dBWAigWSLYlbGs4WwMjhAFEjWwrJ0kGBGgVQBii7n8Ag8SSprsDpKlBdQPgxeMTZHaaVvc5T+59BAoLZ76nGM5RC2H2+H00Sfd2gQEtim2AwiqDOK+sQJIaVAsgZm3lOMNbAWmomIkHhLMB67cNhZshmGvTO3oLjVOUsLT6LiEKwxEA54Q4LXZoQEsFDwYBGEu6HpLLCrVvHnPqs3mWv7xH4/KA2tM+w+ku//YWSfsNNBmWAK6Us47LWgS1dhTAE8cFReG3LaDlFUCaBpjQsnR3kf7KKQ6dHKBTM0iziXPfEdoB3oZkqyd4+OsEbw3uVIiwBLFu3AXOCokrsFZ2NmqFJAkwxtI79hMvn89jTw54/FWBm7WErQ5pA6TXwmUDjp6+iSYRQkhQsQVa1CAKRgC8kCS7AJTRj8H5jJmF21C7QFN+o7v2F7Y3g3m7AT+uwPvT/P3Pu/SO/cza6nlkDxtSiwg6U6N9wOO9ILJ76xRRRJQnD87SX17gCA0Qj3glNB4xgmRN0vVDPLpzgY73ZfmqXODRsT7gPKIbC23t/8gWiCiiSr1ep93s8qf9kPa5i9Sm64RPIP8go780STOcZqI5CbK+N4AGiBsRobWCKojqeN/U8QocOfsLRdpibaVLMugQxwvwyGDqj+gcXqI7d5+FMzd5Ie8BprIRGVX8mAi9RzV45RaAcmLxWwAGqx3++OEq3oWcu/Q13cPPxvyr6J5fQ/V+3IZRFFJ1PlWlzG2/0dTMKhc/uQYYjJGdjWbLxxWnkdEKiJRfrQoCVS1z43lj9iB+BYCUFQg2H4w5yIOgwcsIgKpgDpLAGLTUW7RZYgNMteq7V1TqTLUEaO9v/nYL84ozoeg2gAcljtcrB8dxBuSsrsb7AliL+3u24hGHewPMA+eBQwd8LF8GfjflP0G7vB9k5EBs3vycvm6A/wYAXeA31ArpC7kAAAAASUVORK5CYII=',
          }}
          resizeMode="cover"
        /> */}
        <View>
          <Text style={styles.exercise}>{item.name}</Text>
        </View>
      </TouchableOpacity>
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
