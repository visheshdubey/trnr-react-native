import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Pressable, Button, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Mixins, Typography } from '../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useGetSearchQuery } from '../services/strapi';
import NetworkRequest from '../components/NetworkRequest';
import Search_Item from '../components/Search_Item';
import { moderateScale } from '../styles/mixins';

const SearchScreen = ({ navigation: { goBack } }) => {
  const [text, setText] = useState('');
  const [firstChar, setFirstChar] = useState('S');

  const { data, error, isLoading } = useGetSearchQuery(firstChar);

  useEffect(() => {
    if (text.length > 0 && text.length < 5) {
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
          style={[styles.searchBar_2]} //, Mixins.generateBoxShadowStyle(-2, 4, '#aaa', 0.3, 3, 5, '#aaa')]}
          autoFocus={true}
          value={text}
          onChangeText={setText}
          placeholder={'Search for a product and workout'}
          placeholderTextColor="#aaa"
        />
      </View>
      <NetworkRequest error={error} data={data} isLoading={isLoading}>
        <FlatList
          data={data?.filter((item) => item.exercise.toLowerCase().includes(text.toLowerCase()) || item.productName.toLowerCase().includes(text.toLowerCase()))}
          style={styles.item}
          renderItem={(props) => <Search_Item {...props} />}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps={'always'}
        />
      </NetworkRequest>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: Mixins.WINDOW_WIDTH,
    alignSelf: 'center',
    paddingTop: moderateScale(24),
    // paddingHorizontal: Mixins.moderateScale(10),
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    width: Mixins.scaleSize(340),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchBar_2: {
    width: Mixins.scaleSize(340),
    marginLeft: Mixins.scaleSize(5),
    backgroundColor: '#fff',
    paddingRight: Mixins.moderateScale(15),
    paddingVertical: Mixins.moderateScale(10),
    fontFamily: Typography.ROBOTO_BODY,
    fontSize: Typography.FONT_SIZE_15,
    color: '#777',
  },
});

export default SearchScreen;
