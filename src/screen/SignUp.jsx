import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, TouchableWithoutFeedback, Keyboard, Image, Alert, Pressable, StatusBar } from 'react-native';
import { Mixins, Typography } from '../styles';
import Icon from 'react-native-vector-icons/Fontisto';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import { moderateScale } from '../styles/mixins';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { formValidation } from '../utils/formValidations';
import { useAddProfileMutation, useAddUserMutation } from '../services/strapi';
import { STRAPI_ADD_USER_DATA } from '../utils/ApiConstants';
// import { StatusBar } from 'expo-status-bar';

const SignUp = ({ navigation, route }) => {
  const [state, setstate] = useState('NO');
  const location_input = route?.params?.location_input || null;
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [firstName, onChangeFirstName] = React.useState(null);
  const [lastName, onChangeLastName] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState('');
  const [confirmPassword, onChangeConfirmPassword] = React.useState('');
  const [gender, setGender] = React.useState('MALE');
  const [location, setLocation] = React.useState(null);
  const [dob, setDOB] = React.useState(null);
  const [terms, setTerms] = React.useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [error, seterror] = useState(null);
  const [addUser, userResult] = useAddUserMutation();
  const [addProfile, userProfileResult] = useAddProfileMutation();

  React.useEffect(() => {
    if (location_input) {
      setLocation(location_input);
    }
  }, [location_input]);

  //GENDER SELECTION METHOD
  const toggleGender = (x) => {
    setGender(x);
  };
  //DATE PICKER METHODS
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setDOB(moment(date).format());
    hideDatePicker();
  };
  //TERMS TOGGLE BUTTON
  const toggleTerms = () => {
    setTerms(!terms);
  };
  let errors = useRef(null);
  //Form Operations
  const handleSubmit = async () => {
    errors.current = formValidation(email, firstName, password, password, gender, terms);
    if (!errors.current.hasErrorLabel) {
      try {
        const data = await addUser({
          email: email,
          password: password,
          username: email,
        });
        const id = data?.data?.user?.id;
        console.log(id);
        if (id) {
          seterror(null);
          const data2 = await addProfile(STRAPI_ADD_USER_DATA(id, firstName, lastName, email, dob, gender, terms, location));
          console.log(JSON.stringify(data2));
        } else {
          throw new Error(data?.error?.data?.error?.message);
        }
        navigation.navigate('Confirmation');
      } catch (err) {
        console.log(err.message);
        seterror(err.message);
      }
      // openSnackBar();
    } else {
      forceUpdate();
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/*  */}
      <ScrollView alwaysBounceVertical={false} bounces={false} bouncesZoom={false} maximumZoomScale={0} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
        <StatusBar animated={true} barStyle={'light-content'} />
        <View style={{ marginTop: Mixins.moderateScale(30), marginBottom: Mixins.moderateScale(50) }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../assets/images/trnr-logo-light.png')}
                style={{ width: Mixins.scaleSize(100), height: Mixins.scaleSize(25), marginBottom: moderateScale(20) }}
                resizeMode="contain"
              />
              <Text style={styles.heading}>GET STARTED NOW</Text>
              <Text style={[styles.body]}>TO ACCESS 100S OF EXERCISE VIDEOS AND MAKE THE MOST OF YOUR TRNR PRODUCTS</Text>
              {error && (
                <View style={{ padding: moderateScale(10), marginVertical: moderateScale(10), backgroundColor: '#ffe88c', borderRadius: moderateScale(5) }}>
                  <Text style={{ fontFamily: Typography.FONT_FAMILY_BODY, fontSize: Typography.FONT_SIZE_16, color: '#8f7306' }}>{error}</Text>
                </View>
              )}
              <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, marginTop: 10, alignItems: 'center' }}>
                  <View style={styles.input_row}>
                    <Text style={styles.fieldLabel}>NAME</Text>
                    <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
                      <TextInput style={styles.fieldInput} onChangeText={onChangeFirstName} placeholder="First name" value={firstName} placeholderTextColor="#aaa" />
                      <TextInput style={styles.fieldInput} onChangeText={onChangeLastName} placeholder="Last name" value={lastName} placeholderTextColor="#aaa" />
                    </View>
                    {errors.current?.firstNameLabel ? <Text style={styles.error_text}>{errors.current?.firstNameLabel}</Text> : null}
                  </View>
                  <View style={styles.input_row}>
                    <Text style={styles.fieldLabel}>EMAIL</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TextInput style={styles.fieldInput} onChangeText={onChangeEmail} placeholder="Enter your email" value={email} placeholderTextColor="#aaa" />
                    </View>
                    {errors.current?.emailLabel ? <Text style={styles.error_text}>{errors.current?.emailLabel}</Text> : null}
                  </View>
                  <View style={[styles.input_row, styles.borderBottom]}>
                    <Text style={styles.fieldLabel}>GENDER</Text>
                    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }]}>
                      <Text style={{ fontFamily: Typography.FONT_FAMILY_BODY, fontSize: Typography.FONT_SIZE_16 }} onPress={() => toggleGender('MALE')}>
                        {gender == 'MALE' ? (
                          <IonIcon name="radio-button-on" color="#000" size={Mixins.moderateScale(18)} />
                        ) : (
                          <IonIcon name="radio-button-off" color="#000" size={Mixins.moderateScale(18)} />
                        )}
                        {'  '}
                        MALE
                      </Text>
                      <Text style={{ fontFamily: Typography.FONT_FAMILY_BODY, fontSize: Typography.FONT_SIZE_16 }} onPress={() => toggleGender('FEMALE')}>
                        {gender == 'FEMALE' ? (
                          <IonIcon name="radio-button-on" color="#000" size={Mixins.moderateScale(18)} />
                        ) : (
                          <IonIcon name="radio-button-off" color="#000" size={Mixins.moderateScale(18)} />
                        )}
                        {'  '}
                        FEMALE
                      </Text>
                      <Text style={{ fontFamily: Typography.FONT_FAMILY_BODY, fontSize: Typography.FONT_SIZE_16 }} onPress={() => toggleGender('OTHER')}>
                        {gender == 'OTHER' ? (
                          <IonIcon name="radio-button-on" color="#000" size={Mixins.moderateScale(18)} />
                        ) : (
                          <IonIcon name="radio-button-off" color="#000" size={Mixins.moderateScale(18)} />
                        )}
                        {'  '}
                        OTHER
                      </Text>
                    </View>
                  </View>
                  <View style={styles.input_row}>
                    <Text style={styles.fieldLabel}>PASSWORD</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TextInput style={styles.fieldInput} onChangeText={onChangePassword} value={password} placeholder="Enter your password" secureTextEntry={true} placeholderTextColor="#aaa" />
                      {/* <TextInput
                        style={styles.fieldInput}
                        onChangeText={onChangeConfirmPassword}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        secureTextEntry={true}
                        placeholderTextColor="#aaa"
                      /> */}
                    </View>
                    <Text style={{ fontSize: Typography.FONT_SIZE_16, fontFamily: Typography.FONT_FAMILY_BODY, color: '#777', marginTop: 4 }}>
                      Should be 8-20 characters long, contain letters and numbers.
                    </Text>
                    {errors.current?.passwordLabel ? <Text style={styles.error_text}>{errors.current?.passwordLabel}</Text> : null}
                    {/* {errors.current?.cpasswordLabel ? <Text style={styles.error_text}>{errors.current?.cpasswordLabel}</Text> : null} */}
                  </View>
                  <View style={[styles.input_row, { flexDirection: 'row' }]}>
                    <View style={[{ flex: 1 }, styles.borderBottom]}>
                      <Text style={styles.fieldLabel}>DATE OF BIRTH</Text>
                      <Pressable>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text
                            style={[
                              styles.custom_input,
                              {
                                color: dob ? '#000' : '#aaa',
                              },
                            ]}
                            onPress={showDatePicker}
                          >
                            {dob ? moment(dob).format('DD MMMM YYYY') : 'Enter your date of birth'}
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                    <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
                    <View style={[{ flex: 1, marginLeft: 5 }, styles.borderBottom]}>
                      <Text style={styles.fieldLabel}>LOCATION</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={[
                            styles.custom_input,
                            {
                              color: location ? '#000' : '#aaa',
                            },
                          ]}
                          onPress={() =>
                            navigation.navigate('Country', {
                              from: 'SignUp',
                            })
                          }
                        >
                          {location ? location : 'Enter your location'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={[{ color: errors.current?.termsLabel ? '#f22' : '#000' }, styles.body, { marginTop: Mixins.moderateScale(20) }]} onPress={toggleTerms}>
                    {terms ? (
                      <Icon name="checkbox-active" color={errors.current?.termsLabel ? '#f22' : '#000'} size={Mixins.moderateScale(18)} />
                    ) : (
                      <Icon name="checkbox-passive" color={errors.current?.termsLabel ? '#f22' : '#000'} size={Mixins.moderateScale(18)} />
                    )}
                    {'  '}Agree to our{' '}
                    <Text style={[{ textDecorationLine: 'underline' }]} onPress={() => navigation.navigate('TERMS AND CONDITIONS', 'TERMS AND CONDITIONS')}>
                      Terms & Conditions?
                    </Text>
                  </Text>
                  <Button //
                    onPress={handleSubmit}
                    title="CREATE ACCOUNT"
                    fill="#000"
                    color="#fff"
                    isLoading={userProfileResult.isLoading || userResult.isLoading}
                    style={{ marginTop: Mixins.moderateScale(30), marginBottom: Mixins.moderateScale(10) }}
                  ></Button>
                  <Text style={[styles.body]} onPress={() => navigation.navigate('SignIn', 'SignIn')}>
                    {' '}
                    Already a member? <Text style={{ textDecorationLine: 'underline' }}>Sign-in here</Text>
                  </Text>
                  {/* <Text style={[styles.body, { marginTop: Mixins.moderateScale(24), textDecorationLine: 'underline' }]} onPress={() => navigation.navigate('ResetScreen', 'Reset Password')}>
                    RESET PASSWORD?
                  </Text> */}
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
    width: Mixins.scaleSize(300),
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
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  custom_input: {
    flex: 1,
    paddingVertical: moderateScale(13),
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    marginRight: 5,
  },
  input_row: {
    width: Mixins.scaleSize(340),
    marginTop: moderateScale(25),
    // flexDirection: 'row',
  },
  error_text: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    color: '#f22',
  },
});

export default SignUp;
