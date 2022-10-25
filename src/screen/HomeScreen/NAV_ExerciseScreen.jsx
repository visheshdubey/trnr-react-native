import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HS_ExerciseScreen from './HS_ExerciseScreen';
import { Typography } from '../../styles';
import { useGetExerciseCategoryListQuery } from '../../services/strapi';
import { Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import NoData from '../../components/NoData';
const Tab = createMaterialTopTabNavigator();

const NAV_ExerciseScreen = ({ route, navigation }) => {
  const { productId, categoryName } = route.params;
  const { error, data, isLoading } = useGetExerciseCategoryListQuery(productId);

  useEffect(() => {
    navigation.setOptions({
      title: categoryName,
    });
  }, [categoryName]);

  return (
    <>
      {error ? (
        <Text style={styles.errorText}>Network connection failed! </Text>
      ) : isLoading ? (
        <ActivityIndicator style={styles.center} color="#000" />
      ) : data.length > 0 ? (
        <Tab.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerTintColor: 'black',
            tabBarScrollEnabled: data?.length > 3,
            headerTitleStyle: {
              fontFamily: Typography.FONT_FAMILY_HEADING,
              fontSize: Typography.FONT_SIZE_24,
            },
            tabBarIndicatorStyle: {
              backgroundColor: 'black',
            },
            tabBarLabelStyle: {
              fontFamily: Typography.FONT_FAMILY_HEADING,
              fontSize: Typography.FONT_SIZE_16,
            },
          }}
        >
          {data?.map((item) => (
            <Tab.Screen name={item.exerciseCategory} key={item.id} component={HS_ExerciseScreen} initialParams={{ categoryId: item.id, categoryName: item.name, productId: productId }} />
          ))}
        </Tab.Navigator>
      ) : (
        <NoData />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_24,

    color: '#ccc',
  },
});

export default NAV_ExerciseScreen;
