import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import { Mixins, Typography } from '../../styles';

import { useGetCategoryQuery } from '../../services/Products';

const HS_CategoryScreen = ({ navigation }) => {
  const { data, error, isLoading } = useGetCategoryQuery();
  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <Text>Oh no, there was an error = </Text>
      ) : isLoading ? (
        <ActivityIndicator color="#000" />
      ) : data ? (
        <>
          <View style={styles.searchBarContainer}>
            <Text
              style={[
                styles.searchBar,
                Mixins.generateBoxShadowStyle(-2, 4, '#aaa', 0.2, 3, 2, '#121212'),
              ]}
              onPress={() => navigation.navigate('SearchScreen', '')}
            >
              SEARCH FOR A PRODUCT OR WORKOUT
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ width: Mixins.scaleSize(340) }}
          >
            <View style={styles.scrollview}>
              <Text style={styles.heading}>BEGIN YOUR </Text>
              <Text style={[styles.heading_2, {}]}>JOURNEY </Text>
              <View style={styles.separator}></View>

              {data?.map((item) => (
                <CategoryCard
                  style={styles.item}
                  item={item}
                  key={item.id}
                  onPress={() => navigation.navigate('HS_ProductScreen', { categoryId: item.id })}
                />
              ))}
            </View>
          </ScrollView>
        </>
      ) : null}
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
  scrollview: {
    width: Mixins.scaleSize(340),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Mixins.scaleSize(30),
    marginBottom: Mixins.scaleSize(80),
  },
  separator: {
    width: Mixins.scaleSize(340),
    height: 2,
    backgroundColor: '#eee',
    marginVertical: 5,
    borderRadius: 10,
  },
  item: {
    marginVertical: Mixins.scaleSize(8),
    borderRadius: Mixins.scaleSize(10),
    width: Mixins.scaleSize(340),
  },
  searchBarContainer: {
    marginTop: Mixins.scaleSize(5),

    paddingVertical: Mixins.scaleSize(10),
  },
  searchBar: {
    width: Mixins.scaleSize(340),
    backgroundColor: '#fff',
    borderColor: '#ddd',
    // borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: Mixins.scaleSize(15),
    paddingVertical: Mixins.scaleSize(15),
    fontFamily: Typography.FONT_FAMILY_BODY,
    letterSpacing: 0.7,
    color: '#777',

    // shadowColor: '#aaa',
    // shadowOffset: { width: 20, height: 20 },
    // shadowOpacity: 0.8,
    // shadowRadius: 40,
    // elevation: 3,
  },
  heading: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: 36,
  },
  heading_2: {
    fontFamily: Typography.FONT_FAMILY_DISPLAY,
    fontSize: Typography.FONT_SIZE_56,
    marginTop: -10,
  },
});

export default HS_CategoryScreen;
