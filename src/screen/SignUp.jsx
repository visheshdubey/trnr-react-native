import React, { useRef } from 'react';
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
import Icon from 'react-native-vector-icons/Fontisto';
import Warning from 'react-native-vector-icons/FontAwesome';
import { formValidation } from '../utils/formValidations';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  useAccessTokenShopifyUserMutation,
  useCreateShopifyUserMutation,
} from '../services/shopify';
import {
  ACCESS_TOKEN_USER_VAR,
  CREATE_USER_VAR,
  STRAPI_ADD_USER_DATA,
} from '../utils/ApiConstants';
import { useAddUserDataMutation } from '../services/strapi';

import moment from 'moment';
import { getData, storeData } from '../services/local';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({ navigation, route }) => {
  const [email, onChangeEmail] = React.useState(null);
  const [firstName, onChangeFirstName] = React.useState(null);
  const [lastName, onChangeLastName] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [confirmPassword, onChangeConfirmPassword] = React.useState(null);
  const [gender, setGender] = React.useState('MALE');
  const [DOB, setDOB] = React.useState(new Date(null));
  const [country, onChangeCountry] = React.useState(null);
  const [terms, setTerms] = React.useState(true);

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const [emailLabel, onChangeEmailLabel] = React.useState(null);
  const [firstNameLabel, onChangeFirstNameLabel] = React.useState(null);
  const [passwordLabel, onChangePasswordLabel] = React.useState(null);
  const [confirmPasswordLabel, onChangeConfirmPasswordLabel] = React.useState(null);

  let hasErrorLabel = useRef(false);
  let someErrorLabel = useRef(false);

  const [createShopifyUserMutation, createResult] = useCreateShopifyUserMutation();
  const [addUserData, userResult] = useAddUserDataMutation();
  const [accessTokenShopifyUserMutation, tokenResult] = useAccessTokenShopifyUserMutation();

  //DATE PICKER METHODS
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDOB(date);
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  //GENDER SELECTION METHOD
  const toggleGender = (x) => {
    setGender(x);
  };

  //TERMS TOGGLE BUTTON
  const toggleTerms = () => {
    setTerms(!terms);
  };

  //NAVIGATION BUTTON
  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };

  //BULK CHANGE LABEL
  const handleLabelChange = (el, fnl, pl, cpl) => {
    onChangeEmailLabel(el);
    onChangeFirstNameLabel(fnl);
    onChangePasswordLabel(pl);
    onChangeConfirmPasswordLabel(cpl);
  };

  //USE EFFECT TO RERENDER WHEN SOMETHING GOES WRONG
  React.useEffect(() => {}, [someErrorLabel]);

  //HANDLE FORM SUBMIT
  const handleSubmit = () => {
    hasErrorLabel.current = false;
    someErrorLabel.current = false;
    console.log(
      '1. SWW :' +
        someErrorLabel.current +
        '  --  ERR: ' +
        hasErrorLabel.current +
        '  ' +
        Date.now()
    );
    const formErr = formValidation(email, firstName, password, confirmPassword);
    handleLabelChange(
      formErr.emailLabel,
      formErr.firstNameLabel,
      formErr.passwordLabel,
      formErr.confirmPasswordLabel
    );

    if (formErr.hasErrorLabel) hasErrorLabel.current = true;

    if (!hasErrorLabel.current) {
      // createShopifyUserMutation(CREATE_USER_VAR(firstName, lastName, email, password, terms))
      //   .then((result) => {
      //     someErrorLabel.current = result?.data.errors ? true : false;

      //     if (!someErrorLabel.current) {
      //       var customerCreate = result?.data.data.customerCreate;

      //       if (customerCreate?.customerUserErrors) {
      //         customerCreate?.customerUserErrors.map((item) => {
      //           onChangeEmailLabel(item.message);
      //           console.log(item.message);
      //         });
      //       }
      //     }
      //   })
      // .then((result) =>
      addUserData(STRAPI_ADD_USER_DATA(firstName, lastName, email, DOB, gender, terms))
        // )
        .then((result) =>
          console.log(
            JSON.stringify(STRAPI_ADD_USER_DATA(firstName, lastName, email, DOB, gender, terms))
          )
        )
        .then((result) => accessTokenShopifyUserMutation(ACCESS_TOKEN_USER_VAR(email, password)))
        .then((result) => console.log(JSON.stringify(result)));

      //SAVE THIS ACCESSTOKEN AND USER ID IN ASYNC STORAGE
    }
  };
  // Object.keys(formErr).forEach(function (key, idx) {
  //   console.log(key + ': ' + formErr[key]);
  // });
  // };

  React.useEffect(() => {
    someErrorLabel.current = true;
  }, [createResult.isError, userResult.isError, tokenResult.isError]);

  // storeData('This is a stored value');
  const gettingData = async () => {
    console.log(await getData());
  };
  gettingData();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* ------------------------EMAIL ADDRESS------------------------------------------ */}
                {someErrorLabel.current ? (
                  <Text style={styles.topLabel}>
                    <Warning name="warning" color="red" size={16} /> SOMETHING WENT WRONG, TRY AGAIN
                    LATER
                  </Text>
                ) : (
                  <View
                    style={{
                      marginTop: Mixins.scaleSize(32),
                    }}
                  ></View>
                )}
                <TextInput
                  style={[styles.input, { width: Mixins.scaleSize(340) }]}
                  onChangeText={onChangeEmail}
                  value={email}
                  placeholder="EMAIL ADDRESS"
                />
                {emailLabel ? <Text style={styles.label}>{emailLabel}</Text> : null}
                {/* ----------------------------USER NAME ------------------------------------------ */}
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
                {firstNameLabel ? <Text style={styles.label}>{firstNameLabel}</Text> : null}
                {/* --------------------------------PASSWORD--------------------------------------------- */}
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
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="PASSWORD"
                    secureTextEntry={true}
                  />
                  <TextInput
                    style={[styles.input, { width: Mixins.scaleSize(165) }]}
                    onChangeText={onChangeConfirmPassword}
                    value={confirmPassword}
                    placeholder="CONFIRM PASSWORD"
                    secureTextEntry={true}
                  />
                </View>

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
                  {passwordLabel || confirmPasswordLabel ? (
                    <>
                      <Text style={styles.labelSmall}>{passwordLabel}</Text>
                      <Text style={styles.labelSmall}>{confirmPasswordLabel}</Text>
                    </>
                  ) : null}
                </View>

                {/* -----------------------------GENDER----------------------------------- */}

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
                  <Text style={[styles.body]} onPress={() => toggleGender('MALE')}>
                    {gender == 'MALE' ? (
                      <Icon name="checkbox-active" color="#000" size={18} />
                    ) : (
                      <Icon name="checkbox-passive" color="#000" size={18} />
                    )}
                    {'  '}
                    MALE
                  </Text>
                  <Text style={[styles.body]} onPress={() => toggleGender('FEMALE')}>
                    {gender == 'FEMALE' ? (
                      <Icon name="checkbox-active" color="#000" size={18} />
                    ) : (
                      <Icon name="checkbox-passive" color="#000" size={18} />
                    )}
                    {'  '}
                    FEMALE
                  </Text>
                  <Text style={[styles.body]} onPress={() => toggleGender('OTHER')}>
                    {gender == 'OTHER' ? (
                      <Icon name="checkbox-active" color="#000" size={18} />
                    ) : (
                      <Icon name="checkbox-passive" color="#000" size={18} />
                    )}
                    {'  '}
                    OTHER
                  </Text>
                </View>
                <Text
                  style={
                    DOB
                      ? [styles.input, { width: Mixins.scaleSize(340) }]
                      : [styles.inputPlaceholder, { width: Mixins.scaleSize(340) }]
                  }
                  // placeholder="ENTER YOUR DOB"
                  onPress={showDatePicker}
                >
                  {DOB ? moment(DOB).format('DD MMMM YYYY') : 'ENTER YOUR DATE OF BIRTH'}
                </Text>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />

                <Text
                  style={[styles.body, { marginTop: Mixins.scaleSize(5) }]}
                  onPress={toggleTerms}
                >
                  {terms ? (
                    <Icon name="checkbox-active" color="#000" size={18} />
                  ) : (
                    <Icon name="checkbox-passive" color="#000" size={18} />
                  )}
                  {'  '}AGREE TO OUR{' '}
                  <Text style={{ textDecorationLine: 'underline' }}>TERMS AND CONDITIONS?</Text>
                </Text>
                <Button //
                  onPress={handleSubmit} //{() => handleClick('BaseTabNav', 'HomeScreen')}
                  title="CREATE ACCOUNT"
                  fill="#000"
                  color="#fff"
                  isLoading={
                    createResult.isLoading || userResult.isLoading || tokenResult.isLoading
                  }
                  style={{ marginVertical: Mixins.scaleSize(30) }}
                ></Button>
                <Text style={[styles.body]} onPress={() => handleClick('SignIn', 'Sign In')}>
                  {' '}
                  ALREADY A MEMEBER?{' '}
                  <Text style={{ textDecorationLine: 'underline' }}>SIGN-IN HERE</Text>
                </Text>
              </View>
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
    fontSize: Typography.FONT_SIZE_16,
    borderRadius: 5,
    height: Mixins.scaleSize(40),
    marginVertical: Mixins.scaleSize(15),
    borderWidth: 1,
    padding: Mixins.scaleSize(10),
  },
  inputPlaceholder: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
    borderRadius: 5,
    color: '#999',
    height: Mixins.scaleSize(40),
    marginVertical: Mixins.scaleSize(15),
    borderWidth: 1,
    padding: Mixins.scaleSize(10),
  },
  label: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    width: Mixins.scaleSize(340),
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Mixins.scaleSize(-12),
    marginBottom: Mixins.scaleSize(10),
    // borderWidth: 1,
    color: 'red',
  },
  labelSmall: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    width: Mixins.scaleSize(165),
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Mixins.scaleSize(-15),
    marginBottom: Mixins.scaleSize(10),
    color: 'red',
  },
  topLabel: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Mixins.scaleSize(24),
    marginBottom: Mixins.scaleSize(10),
    backgroundColor: '#FFF4D8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    color: 'red',
  },
});
