import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, TouchableWithoutFeedback, Keyboard, Image, StatusBar } from 'react-native';
import { Mixins, Typography } from '../styles';
import Button from '../components/Button';
import { moderateScale } from '../styles/mixins';
import { signInFormValidation } from '../utils/formValidations';
import { useUserLoginMutation } from '../services/strapi';
import { getDataObject, storeDataObject } from '../services/local';
import { useDispatch } from 'react-redux';
import { signin } from '../services/features/userSlice';

const SignIn = ({ navigation }) => {
  //Force Update
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  //Form States
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState('');
  const [error, seterror] = useState(null);
  //RTK Hooks
  const [userLogin, userLoginResult] = useUserLoginMutation();
  const dispatch = useDispatch();

  let errors = useRef(null);
  //Set data to Local Storage
  const setLocal = async (data) => {
    await storeDataObject(data);
  };
  // Get Local data
  const getLocal = async () => {
    const x = await getDataObject();
  };
  //Form Operations
  const handleSubmit = async () => {
    errors.current = signInFormValidation(email, password);
    if (!errors.current.hasErrorLabel) {
      try {
        const data = await userLogin({
          identifier: email,
          password: password,
        });
        const token = data?.data?.jwt;
        if (!token) {
          if (data?.error?.data?.error?.message) throw new Error(data?.error?.data?.error?.message);
        } else {
          const localData = {
            isSignnedIn: true,
            accessToken: token,
            customerID: 123,
            expiresAt: 123,
          };
          setLocal(localData);
          getLocal();
          dispatch(signin(localData));
        }
      } catch (err) {
        seterror(err.message);
      }
    } else {
      forceUpdate();
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar animated={true} barStyle={'light-content'} />
      <ScrollView alwaysBounceVertical={false} bounces={false} bouncesZoom={false} maximumZoomScale={0} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
        <View style={{ marginVertical: Mixins.moderateScale(50) }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../assets/images/trnr-logo-light.png')}
                style={{ width: Mixins.scaleSize(100), height: Mixins.scaleSize(25), marginBottom: moderateScale(20) }}
                resizeMode="contain"
              />
              <Text style={styles.heading}>WELCOME BACK</Text>
              {error && (
                <View style={{ padding: moderateScale(10), marginVertical: moderateScale(10), backgroundColor: '#ffe88c', borderRadius: moderateScale(5) }}>
                  <Text style={{ fontFamily: Typography.FONT_FAMILY_BODY, fontSize: Typography.FONT_SIZE_16, color: '#8f7306' }}>{error}</Text>
                </View>
              )}
              <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, marginTop: 10, alignItems: 'center' }}>
                  <View style={styles.input_row}>
                    <Text style={styles.fieldLabel}>EMAIL</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TextInput style={styles.fieldInput} onChangeText={onChangeEmail} placeholder="Enter your Email" value={email} placeholderTextColor="#aaa" />
                    </View>
                    {errors.current?.emailLabel ? <Text style={styles.error_text}>{errors.current?.emailLabel}</Text> : null}
                  </View>
                  <View style={styles.input_row}>
                    <Text style={styles.fieldLabel}>PASSWORD</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TextInput style={styles.fieldInput} onChangeText={onChangePassword} value={password} placeholder="Enter your password" secureTextEntry={true} placeholderTextColor="#aaa" />
                    </View>
                    {errors.current?.passwordLabel ? <Text style={styles.error_text}>{errors.current?.passwordLabel}</Text> : null}
                    {errors.current?.cpasswordLabel ? <Text style={styles.error_text}>{errors.current?.cpasswordLabel}</Text> : null}
                  </View>
                  <Button //
                    onPress={handleSubmit}
                    title="LOGIN"
                    fill="#000"
                    color="#fff"
                    isLoading={userLoginResult.isLoading}
                    style={{ marginTop: Mixins.moderateScale(50), marginBottom: Mixins.moderateScale(10) }}
                  ></Button>
                  <Text style={[styles.body]} onPress={() => navigation.navigate('SignUp', 'Sign Up')}>
                    {' '}
                    Not a member? <Text style={{ textDecorationLine: 'underline' }}>Sign-up here</Text>
                  </Text>
                  <Text style={[styles.body, { marginTop: Mixins.moderateScale(10) }]} onPress={() => navigation.navigate('ResetScreen', 'Reset Password')}>
                    Forgot password?
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_28,
  },
  body: {
    fontFamily: Typography.ROBOTO_HEADING,
    fontSize: Typography.FONT_SIZE_12,
    marginTop: Mixins.moderateScale(5),
    width: Mixins.scaleSize(250),
    textAlign: 'center',
  },
  fieldLabel: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_18,
  },
  fieldInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
    paddingVertical: 8,
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    marginRight: 5,
  },
  custom_input: {
    borderBottomWidth: 1,
    flex: 1,
    paddingVertical: moderateScale(13),
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    marginRight: 5,
  },
  input_row: {
    width: Mixins.scaleSize(340),
    marginTop: 20,
    // flexDirection: 'row',
  },
  error_text: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    color: '#f22',
  },
});

export default SignIn;
