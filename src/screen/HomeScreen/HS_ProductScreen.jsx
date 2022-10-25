import React, { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, SafeAreaView, FlatList, View, Text } from 'react-native';
import NetworkRequest from '../../components/NetworkRequest';
import Product_Item from '../../components/Product_Item';
import { useGetProductQuery } from '../../services/strapi';
import { Mixins, Typography } from '../../styles';
import { WHITE } from '../../styles/colors';

const HS_ProductScreen = ({ route, navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { categoryId, categoryName } = route.params;
  const { data, error, isLoading, refetch } = useGetProductQuery(categoryId);

  useEffect(() => {
    navigation.setOptions({
      title: categoryName,
    });
  }, [categoryName]);

  return (
    <SafeAreaView style={styles.container}>
      <NetworkRequest error={error} data={data} isLoading={isLoading}>
        {data?.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.errorText}>NO PRODUCTS</Text>
          </View>
        ) : null}
        <FlatList
          style={styles.list}
          data={data}
          extraData="hello"
          renderItem={(props) => <Product_Item {...props} />} //We have to use this syntax if we want to use hooks inside the rendered component
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
          bounces={false}
        />
      </NetworkRequest>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
  },

  list: {
    width: Mixins.scaleSize(340),
    marginBottom: Mixins.scaleSize(70),
  },
  errorText: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_24,
    color: '#ccc',
  },
});

export default HS_ProductScreen;
