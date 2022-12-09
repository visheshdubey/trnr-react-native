import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar, TextInput, Pressable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import { Mixins, Typography } from '../../styles';
// SnackBar
import { useGetCategoryQuery } from '../../services/strapi';
import NetworkRequest from '../../components/NetworkRequest';
import SnackBar from '../../components/SnackBar';
const HS_CategoryScreen = ({ navigation }) => {
  const { data, error, isLoading } = useGetCategoryQuery();

  console.log(data);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#fff" barStyle={'dark-content'} />
      <NetworkRequest error={error} data={data} isLoading={isLoading}>
        <View style={styles.searchBarContainer}>
          <Text style={[styles.searchBar, Mixins.generateBoxShadowStyle(-2, 4, '#aaa', 0.3, 3, 5, '#aaa')]} onPress={() => navigation.navigate('SearchScreen', '')}>
            {/* <Icon name="search1" color="#aaa" size={16} /> */}
            {'   '}
            SEARCH FOR A PRODUCT OR WORKOUT
          </Text>
          {/* <Pressable onPress={() => navigation.navigate('SearchScreen', '')}>
            <TextInput
              style={[styles.searchBar, Mixins.generateBoxShadowStyle(-2, 4, '#aaa', 0.3, 3, 5, '#aaa')]}
              autoFocus={true}
              editable={false}
              placeholder={'SEARCH FOR A PRODUCT OR WORKOUT'}
              placeholderTextColor="#aaa"
            />
          </Pressable> */}
        </View>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ width: Mixins.scaleSize(340) }}>
          <View style={styles.scrollview}>
            <Text style={styles.heading}>BEGIN YOUR </Text>
            <Text style={[styles.heading_2, {}]}>JOURNEY </Text>
            <View style={styles.separator}></View>

            {data?.map((item) => (
              <CategoryCard
                style={styles.item}
                item={item}
                key={item.id}
                onPress={() =>
                  navigation.navigate('HS_ProductScreen', {
                    categoryId: item.id,
                    categoryName: item.name,
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      </NetworkRequest>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Mixins.moderateScale(10),
    backgroundColor: '#fff',

    paddingTop: 15,
  },

  scrollview: {
    width: Mixins.scaleSize(340),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Mixins.moderateScale(30),
    marginBottom: Mixins.moderateScale(80),
  },
  separator: {
    width: Mixins.scaleSize(340),
    height: 2,
    backgroundColor: '#eee',
    marginVertical: 5,
    borderRadius: 10,
  },
  item: {
    marginVertical: Mixins.moderateScale(8),
    borderRadius: Mixins.moderateScale(10),
    width: Mixins.scaleSize(340),
  },
  searchBarContainer: {
    paddingBottom: Mixins.moderateScale(10),
  },
  searchBar: {
    width: Mixins.scaleSize(340),
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: Mixins.moderateScale(15),
    paddingVertical: Mixins.moderateScale(15),
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    letterSpacing: 0.7,
    color: '#777',
  },
  heading: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_32,
  },
  heading_2: {
    fontFamily: Typography.FONT_FAMILY_DISPLAY,
    fontSize: Typography.FONT_SIZE_56,
    marginTop: Mixins.moderateScale(-10),
  },
});

export default HS_CategoryScreen;
