import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Pressable, Button, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Mixins, Typography } from '../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useGetSearchQuery } from '../services/strapi';
import NetworkRequest from '../components/NetworkRequest';
import Search_Item from '../components/Search_Item';
import { LOG } from '../utils/ApiConstants';

const SearchScreen = ({ navigation: { goBack } }) => {
  const [text, setText] = useState('');
  const [firstChar, setFirstChar] = useState('S');

  const { data, error, isLoading } = useGetSearchQuery(firstChar);

  useEffect(() => {
    if (text.length == 1) {
      if (LOG === true) console.log('🚀 ~ file: SearchScreen.jsx ~ line 19 ~ useEffect ~ text', text);
      setFirstChar(text);
    }
    if (text.length == 0) setFirstChar('S');
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
          placeholder={'SEARCH FOR A PRODUCT OR WORKOUT'}
          // onPress={() => navigation.navigate('SearchScreen', '')}
          placeholderTextColor="#aaa"
        />
      </View>
      <NetworkRequest error={error} data={data} isLoading={isLoading}>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ width: Mixins.WINDOW_WIDTH }}>
          {data?.map((item) => {
            if (item.exercise.toLowerCase().includes(text.toLowerCase()) || item.productName.toLowerCase().includes(text.toLowerCase()))
              return (
                <Search_Item
                  style={styles.item}
                  item={item}
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('HS_ExerciseDetailScreen', {
                      exerciseId: item.id,
                      categoryName: item.name,
                    })
                  }
                />
              );
          })}
        </ScrollView>
      </NetworkRequest>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: Mixins.moderateScale(10),
    backgroundColor: '#fff',
  },
  item: {
    alignItems: 'center',
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

export default SearchScreen;
