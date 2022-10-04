import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Mixins, Typography } from '../styles';

const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={[
            styles.searchBar,
            Mixins.generateBoxShadowStyle(-2, 4, '#aaa', 0.2, 3, 2, '#121212'),
          ]}
          autoFocus={true}
          // onPress={() => navigation.navigate('SearchScreen', '')}
        ></TextInput>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: Mixins.scaleSize(10),
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    marginTop: Mixins.scaleSize(5),
    paddingVertical: Mixins.scaleSize(10),
  },
  searchBar: {
    width: Mixins.scaleSize(340),
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: Mixins.scaleSize(15),
    paddingVertical: Mixins.scaleSize(10),
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    letterSpacing: 0.7,
    color: '#777',
  },
});

export default SearchScreen;
