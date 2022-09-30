import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ExerciseCard from '../../components/ExerciseCard';
import { Mixins } from '../../styles';

const items = [
  {
    id: '1',
    name: 'BALANCE AND AGILITY',
    image: '../assets/images/card1.png',
  },
  {
    id: '2',
    name: 'STRENGTH',
    image: '../assets/images/card2.png',
  },
  {
    id: '3',
    name: 'MASSAGE RECOVERY',
    image: '../assets/images/card3.png',
  },
  {
    id: '4',
    name: 'HAND THERAPY',
    image: '../assets/images/card3.png',
  },

  {
    id: '5',
    name: 'HAND THERAPY',
    image: '../assets/images/card3.png',
  },
];
const HS_ExerciseScreen = ({ navigation }) => {
  const handleClick = (x, y) => {
    navigation.navigate(x, { title: 'Detail Page' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ width: Mixins.scaleSize(365) }}
      >
        <View style={styles.grid}>
          {items.map((item) => (
            <ExerciseCard
              style={styles.item}
              item={item}
              key={item.id}
              onPress={() => handleClick('HS_ExerciseDetailScreen', 'Product')}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Mixins.scaleSize(10),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Mixins.scaleSize(400),
    alignItems: 'center',
    marginBottom: Mixins.scaleSize(80),
  },
  item: {
    margin: Mixins.scaleSize(5),
  },
});

export default HS_ExerciseScreen;
