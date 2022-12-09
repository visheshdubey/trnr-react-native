import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Pressable, Button, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Mixins, Typography } from '../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useGetSearchQuery } from '../services/strapi';
import NetworkRequest from '../components/NetworkRequest';
import Search_Item from '../components/Search_Item';
import { LOG } from '../utils/ApiConstants';
import { country } from '../utils/CountryList';
import Country_Item from '../components/Country_Item';
// Country_Item;
const CountrySelectorScreen = ({ navigation: { goBack } }) => {
  const [text, setText] = useState('');
  const [firstChar, setFirstChar] = useState('A');

  // const { data, error, isLoading } = useGetSearchQuery(firstChar);
  const data = country;
  useEffect(() => {
    if (text.length > 0 && text.length < 3) {
      if (LOG === true) console.log('🚀 ~ file: SearchScreen.jsx ~ line 19 ~ useEffect ~ text', text);
      setFirstChar(text);
    }
    if (text.length == 0) setFirstChar('a');
  }, [text, data]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Pressable onPress={() => goBack()}>
          <Icon name="arrowleft" color="#000" size={22} />
        </Pressable>
        <TextInput
          style={[styles.searchBar, Mixins.generateBoxShadowStyle(-2, 4, '#aaa', 0.3, 3, 5, '#aaa')]}
          autoFocus={true}
          value={text}
          onChangeText={setText}
          placeholder={'SEARCH FOR YOUR COUNTRY'}
          // onPress={() => navigation.navigate('SearchScreen', '')}
          placeholderTextColor="#aaa"
        />
      </View>

      <FlatList
        data={data?.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))}
        style={styles.item}
        renderItem={(props) => <Country_Item {...props} />}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps={'always'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: Mixins.WINDOW_WIDTH,
    alignSelf: 'center',
    paddingTop: 15,
    paddingHorizontal: Mixins.moderateScale(10),
    backgroundColor: '#fff',
  },
  item: {
    // alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    width: Mixins.scaleSize(340),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBar: {
    width: Mixins.scaleSize(300),
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: Mixins.moderateScale(15),
    paddingVertical: Mixins.moderateScale(10),
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    letterSpacing: 0.7,
    color: '#777',
  },
});

export default CountrySelectorScreen;
