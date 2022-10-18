import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TochableOpacity,
} from 'react-native';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { Mixins, Typography } from '../styles';
import DatePicker from '../components/DatePicker';
import * as ScreenOrientation from 'expo-screen-orientation';
import { WHITE } from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LINE_HEIGHT_18 } from '../styles/typography';

const SignUp = ({ navigation, route }) => {
  const [email, onChangeEmail] = React.useState(null);
  const [firstName, onChangeFirstName] = React.useState(null);
  const [lastName, onChangeLastName] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [confirmPassword, onChangeConfirmPassword] = React.useState(null);
  const [gender, setGender] = React.useState(null);
  const [phone, onChangePhone] = React.useState(null);
  const [country, onChangeCountry] = React.useState(null);
  const [terms, setTerms] = React.useState(true);
  const [orientationIsLandscape, setOrientation] = React.useState(true);

  async function changeScreenOrientation() {
    if (orientationIsLandscape == true) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    } else if (orientationIsLandscape == false) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }
  const toggleOrientation = () => {
    setOrientation(!orientationIsLandscape);
    changeScreenOrientation();
  };
  const toggleGender = (x) => {
    setGender(x);
  };
  const toggleTerms = () => {
    setTerms(!terms);
  };
  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        alwaysBounceVertical={false}
        bounces={false}
        bouncesZoom={false}
        maximumZoomScale={0}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Logo />
              <View
                style={{
                  width: Mixins.WINDOW_WIDTH,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: Mixins.scaleSize(30),
                }}
              >
                <Text style={styles.heading}>LET'S BECOME A </Text>
                <Text style={[styles.heading_2, {}]}>MEMBER </Text>
              </View>
              <Text style={[styles.body, { marginTop: Mixins.scaleSize(5) }]}>
                AND RECIEVE THOUSANDS OF BENEFITS
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { width: Mixins.scaleSize(340), marginTop: Mixins.scaleSize(50) },
                ]}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="EMAIL ADDRESS"
              />
              <View
                style={{
                  width: Mixins.scaleSize(340),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={[styles.input, { width: Mixins.scaleSize(165) }]}
                  onChangeText={onChangeFirstName}
                  value={firstName}
                  placeholder="FIRST NAME"
                />
                <TextInput
                  style={[styles.input, { width: Mixins.scaleSize(165) }]}
                  onChangeText={onChangeLastName}
                  value={lastName}
                  placeholder="LAST NAME"
                />
              </View>
              <TextInput
                style={[styles.input, { width: Mixins.scaleSize(340) }]}
                onChangeText={onChangePassword}
                value={password}
                placeholder="PASSWORD"
                secureTextEntry={true}
              />
              <TextInput
                style={[styles.input, { width: Mixins.scaleSize(340) }]}
                onChangeText={onChangeConfirmPassword}
                value={confirmPassword}
                placeholder="CONFIRM PASSWORD"
                secureTextEntry={true}
              />
              <View
                style={[
                  {
                    width: Mixins.scaleSize(340),
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginVertical: Mixins.scaleSize(5),
                  },
                ]}
              >
                <Text style={[styles.body]} onPress={() => toggleGender('M')}>
                  {gender == 'M' ? (
                    <Icon name="check-square-o" color="#000" size={18} />
                  ) : (
                    <Icon name="square-o" color="#000" size={18} />
                  )}
                  {'  '}
                  MALE
                </Text>
                <Text style={[styles.body]} onPress={() => toggleGender('F')}>
                  {gender == 'F' ? (
                    <Icon name="check-square-o" color="#000" size={18} />
                  ) : (
                    <Icon name="square-o" color="#000" size={18} />
                  )}
                  {'  '}
                  FEMALE
                </Text>
                <Text style={[styles.body]} onPress={() => toggleGender('O')}>
                  {gender == 'O' ? (
                    <Icon name="check-square-o" color="#000" size={18} />
                  ) : (
                    <Icon name="square-o" color="#000" size={18} />
                  )}
                  {'  '}
                  OTHER
                </Text>
              </View>
              <TextInput
                style={[styles.input, { width: Mixins.scaleSize(340) }]}
                onChangeText={onChangePhone}
                value={phone}
                placeholder="PHONE NUMBER (WITH COUNTRY CODE AND NO SPACE )"
              />
              {/* <Text
                style={[styles.input, { width: Mixins.scaleSize(340) }]}
                onChangeText={onChangePhone}
                value={country}
                placeholder="SELECT YOUR COUNTRY"
                onPress={() => navigation.navigate('Country_Selector')}
              /> */}

              <DatePicker
                style={{ width: Mixins.scaleSize(340), marginVertical: Mixins.scaleSize(10) }}
              />
              <Text style={[styles.body, { marginTop: Mixins.scaleSize(5) }]} onPress={toggleTerms}>
                {terms ? (
                  <Icon name="check-square-o" color="#000" size={18} />
                ) : (
                  <Icon name="square-o" color="#000" size={18} />
                )}
                {'  '}AGREE TO OUR{' '}
                <Text style={{ textDecorationLine: 'underline' }}>TERMS AND CONDITIONS?</Text>
              </Text>
              <Button
                onPress={() => handleClick('BaseTabNav', 'HomeScreen')}
                title="CREATE ACCOUNT"
                fill="#000"
                color="#fff"
                style={{ marginTop: Mixins.scaleSize(20) }}
              ></Button>
              <Text style={[styles.body]} onPress={toggleOrientation}>
                {/* onPress={() => handleClick('SignIn', 'Sign In')}>  */}ALREADY MEMEBER?{' '}
                <Text style={{ textDecorationLine: 'underline' }}>SIGN-IN HERE</Text>
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // backgroundColor: 'white',
    // paddingVertical: Mixins.scaleSize(70),
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    paddingVertical: Mixins.scaleSize(70),
  },
  heading: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_28,
  },
  heading_2: {
    fontFamily: Typography.FONT_FAMILY_DISPLAY,
    fontSize: Typography.FONT_SIZE_32,
  },
  body: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
  },
  input: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    height: Mixins.scaleSize(40),
    marginVertical: Mixins.scaleSize(10),
    borderWidth: 1,
    padding: Mixins.scaleSize(10),
  },
});
