import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import Button from '../components/Button';
import { Typography } from '../styles';
import { scaleFont } from '../styles/mixins';

const image = require('../assets/images/bg.jpg');

const Welcome = ({ navigation, route }) => {
  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.body}>
          IDEAL FOR UPPER BODY CONDITIONING, TARGETING THE BACK, PECS, SHOULDERS, BICEPS, TRICEPS
          AND ABS. HELPS DEVELOP MUSCLE MASS, PROTECT JOINTS AND INCREASE BONE DENSITY. DOOR ANCHOR
          INCLUDED THAT CAN BE POSITIONED AT VARIOUS HEIGHTS TO LEVERAGE A DIVERSE RANGE OF
          EXERCISES.
        </Text>
        <Button
          onPress={() => handleClick('SignUp', 'Sign Up')}
          title="BEGIN"
          fill="#fff"
          color="#000"
          isLoading={false}
          style={{ marginVertical: 20 }}
        ></Button>
        <Text style={styles.body} onPress={() => handleClick('SignIn', 'Sign In')}>
          ALREADY MEMEBER? SIGN-IN HERE
        </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  heading: {
    color: 'white',
    lineHeight: scaleFont(124),
    fontFamily: Typography.FONT_FAMILY_DISPLAY,
    fontSize: Typography.FONT_SIZE_96,
    textAlign: 'center',
  },
  body: {
    color: 'white',
    maxWidth: '80%',
    alignSelf: 'center',
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BODY,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: 'white',
    color: '#000',
  },
});

export default Welcome;
