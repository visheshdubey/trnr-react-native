import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ImageBackground, StatusBar, Animated, Dimensions, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Button from '../components/Button';
import SwipeIndicator from '../components/SwipeIndicator';
import { Mixins, Typography } from '../styles';
import { moderateScale, scaleFont, scaleSize } from '../styles/mixins';
const image = require('../assets/images/bg.jpg');
const data = [
  {
    id: 0,
    uri: require('../assets/images/Slide1.jpg'),
    title: 'CREATING AN ACCOUNT IS QUICK AND EASY',
    text: 'Once you’ve created your account, you can start exploring ways to maximise your fitness progress with our products.',
  }, // https://unsplash.com/photos/Jup6QMQdLnM
  {
    id: 1,
    uri: require('../assets/images/Slide2.jpg'),
    title: 'KNOW HOW TO',
    text: 'Discover products and explore various exercise options that suit your needs.',
  }, // https://unsplash.com/photos/oO62CP-g1EA
  {
    id: 2,
    uri: require('../assets/images/Slide3.jpg'),
    title: 'SAVE WORKOUTS',
    text: 'Save the exercises you like and create your own personalised workout.',
  },
];
const Welcome = ({ navigation }) => {
  // const [statusBarStyle, setStatusBarStyle] = React.useState(STYLES[0]);
  const [dataWithPlaceholders, setDataWithPlaceholders] = useState([]);
  const { width } = Dimensions.get('window');
  const [currentPos, setcurrentPos] = useState(0);
  const SPACING = 5;
  const ITEM_LENGTH = width; // Item is a square. Therefore, its height and width are of the same length.
  const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;
  const BORDER_RADIUS = 20;
  const CURRENT_ITEM_TRANSLATE_Y = 48;
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setDataWithPlaceholders([{ id: -1 }, ...data, { id: data.length }]);
  }, [data]);
  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };

  const getItemLayout = (_data, index) => ({
    length: ITEM_LENGTH,
    offset: ITEM_LENGTH * (index - 1),
    index,
  });
  const scrollEvent = (e) => {
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false });
    const scrollOffset = e.nativeEvent.contentOffset.x;
    if (scrollOffset === ITEM_LENGTH * 0) setcurrentPos(0);
    if (scrollOffset > 0 && scrollOffset <= ITEM_LENGTH * 1) setcurrentPos(1);
    if (scrollOffset > ITEM_LENGTH * 1 && scrollOffset <= ITEM_LENGTH * 2) setcurrentPos(2);
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} barStyle={'light-content'} />
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          if (!item.uri || !item.title) {
            return <View style={{ width: EMPTY_ITEM_LENGTH }} />;
          }

          const inputRange = [(index - 2) * ITEM_LENGTH, (index - 1) * ITEM_LENGTH, index * ITEM_LENGTH];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [CURRENT_ITEM_TRANSLATE_Y * 2, CURRENT_ITEM_TRANSLATE_Y, CURRENT_ITEM_TRANSLATE_Y * 2],
            extrapolate: 'clamp',
          });
          return (
            <ImageBackground source={item.uri} resizeMode="cover" style={styles.image}>
              <View style={{ marginBottom: moderateScale(220), alignItems: 'center' }}>
                <Image source={require('../assets/images/trnr-logo-dark.png')} style={{ width: 150 }} resizeMode="contain"></Image>
                <Text style={styles.heading}>{item.title}</Text>
                <Text style={styles.body}>{item.text}</Text>
              </View>
            </ImageBackground>
          );
        }}
        getItemLayout={getItemLayout}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        bounces={false}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.flatListContent}
        onScroll={scrollEvent}
        scrollEventThrottle={16}
        snapToAlignment="start"
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').width}
      />
      <View style={{ position: 'absolute', bottom: moderateScale(50), width: Mixins.WINDOW_WIDTH }}>
        <SwipeIndicator currentPos={currentPos} style={{ marginVertical: moderateScale(30) }} />
        <Button onPress={() => handleClick('SignUp', 'Sign Up')} title="CREATE AN ACCOUNT" fill="#fff" color="#000" isLoading={false} style={{ marginVertical: Mixins.moderateScale(20) }}></Button>
        {/* <Text style={styles.body} onPress={() => handleClick('SignIn', 'Sign In')}>
          Already have an account? Sign in
        </Text> */}
        <Text style={[styles.body]} onPress={() => navigation.navigate('SignIn', 'SignIn')}>
          Already a member? <Text style={{ textDecorationLine: 'underline' }}>Sign-in here</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: Mixins.WINDOW_WIDTH,
    justifyContent: 'flex-end',
    paddingBottom: Mixins.moderateScale(20),
  },
  heading: {
    color: 'white',
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_22,
    textAlign: 'center',
  },
  body: {
    color: 'white',
    maxWidth: '80%',
    alignSelf: 'center',
    marginTop: moderateScale(15),
    fontSize: Typography.FONT_SIZE_13,
    fontFamily: Typography.ROBOTO_BODY,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    color: '#000',
  },
});

export default Welcome;
