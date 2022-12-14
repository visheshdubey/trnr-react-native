import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Button from '../components/Button';
import { Mixins, Typography } from '../styles';
import { moderateScale } from '../styles/mixins';

const Confirmation = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  return (
    <View style={[styles.container, { marginTop: -headerHeight }]}>
      <Image source={require('../assets/images/trnr-logo-light.png')} style={{ width: Mixins.scaleSize(100), height: Mixins.scaleSize(25), marginBottom: moderateScale(20) }} resizeMode="contain" />
      <Text style={styles.heading}>CONFIRM EMAIL</Text>
      <Text style={[styles.body]}>A confirmation has been sent to your email. Please check your email and verify your account.</Text>
      <Button //
        onPress={() => navigation.navigate('SignIn')}
        title="LOGIN"
        fill="#000"
        color="#fff"
        isLoading={false}
        style={{ marginTop: Mixins.moderateScale(30), marginBottom: Mixins.moderateScale(10) }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_48,
  },
  body: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    width: Mixins.scaleSize(250),
    textAlign: 'center',
    marginTop: moderateScale(24),
  },
});

export default Confirmation;
