import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import { Mixins, Typography } from '../../styles';
import { useGetCategoryQuery } from '../../services/strapi';
import Icon from 'react-native-vector-icons/AntDesign';
import NetworkRequest from '../../components/NetworkRequest';
import { moderateScale } from '../../styles/mixins';

const HS_CategoryScreen = ({ navigation }) => {
  const { data, error, isLoading } = useGetCategoryQuery();

  console.log(data);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle={'light-content'} />
      <NetworkRequest error={error} data={data} isLoading={isLoading}>
        <View style={styles.searchBarContainer}>
          <Text style={[styles.searchBar_2]} onPress={() => navigation.navigate('SearchScreen', '')}>
            <Icon name="search1" color="#aaa" size={moderateScale(20)} />
            {'  '} Search for a workout or product
          </Text>
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
    paddingTop: moderateScale(24),
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchBar_2: {
    width: Mixins.scaleSize(340),
    backgroundColor: '#fff',

    paddingRight: Mixins.moderateScale(15),
    paddingVertical: Mixins.moderateScale(10),
    fontFamily: Typography.ROBOTO_BODY,
    fontSize: Typography.FONT_SIZE_15,
    color: '#aaa',
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
