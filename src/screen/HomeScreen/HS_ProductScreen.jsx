import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import NetworkRequest from '../../components/NetworkRequest';
import Product_Item from '../../components/Product_Item';
import { useGetProductQuery } from '../../services/Products';
import { Mixins } from '../../styles';
import { WHITE } from '../../styles/colors';

const HS_ProductScreen = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const { data, error, isLoading } = useGetProductQuery(categoryId);

  useEffect(() => {
    navigation.setOptions({
      title: categoryName,
    });
  }, [categoryName]);

  return (
    <SafeAreaView style={styles.container}>
      <NetworkRequest error={error} data={data} isLoading={isLoading}>
        <FlatList
          style={styles.list}
          data={data}
          extraData="hello"
          renderItem={(props) => <Product_Item {...props} />} //We have to use this syntax if we want to use hooks inside the rendered component
          keyExtractor={(item) => item.id}
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
});

export default HS_ProductScreen;
