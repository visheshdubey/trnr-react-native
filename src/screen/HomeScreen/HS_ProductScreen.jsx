import React, { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import NetworkRequest from '../../components/NetworkRequest';
import Product_Item from '../../components/Product_Item';
import { useGetProductQuery } from '../../services/Products';
import { Mixins } from '../../styles';
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
  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   refetch().then(() => setRefreshing(false));
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <NetworkRequest error={error} data={data} isLoading={isLoading}>
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
});

export default HS_ProductScreen;
