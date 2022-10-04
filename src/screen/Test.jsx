import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useGetCategoryQuery } from '../services/Products';

const Test = () => {
  const { data, error, isLoading } = useGetCategoryQuery();
  console.log(error);
  return (
    <View>
      {error ? (
        <Text>Oh no, there was an error = </Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <>
          <Text>{data[0].name}</Text>
          <Image style={{ width: '100%', height: '50%' }} source={{ uri: data[0].image }} />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Test;
