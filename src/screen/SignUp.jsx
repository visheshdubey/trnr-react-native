import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, TextInput, Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { Mixins, Typography } from '../styles';
import Icon from 'react-native-vector-icons/Fontisto';
import Warning from 'react-native-vector-icons/FontAwesome';
import { formValidation } from '../utils/formValidations';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useCreateShopifyUserMutation, useResetShopifyUserMutation } from '../services/shopify';
import { CREATE_USER_VAR, DEFAULT_PSWD, LOG, RESET_USER_VAR, STRAPI_ADD_USER_DATA } from '../utils/ApiConstants';
import { useAddUserDataMutation } from '../services/strapi';

import moment from 'moment';

const SignUp = ({ navigation }) => {
  //Form States
  const [email, onChangeEmail] = React.useState(null);
  const [firstName, onChangeFirstName] = React.useState(null);
  const [lastName, onChangeLastName] = React.useState(null);
  const [password, onChangePassword] = React.useState(DEFAULT_PSWD().toString());
  const [gender, setGender] = React.useState('MALE');
  const [DOB, setDOB] = React.useState(null);
  const [terms, setTerms] = React.useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  // Label States
  const [emailLabel, onChangeEmailLabel] = React.useState(null);
  const [firstNameLabel, onChangeFirstNameLabel] = React.useState(null);

  //Error Refs
  let hasErrorLabel = useRef(false);
  let someErrorLabel = useRef(false);
  let successLabel = useRef(false);
  const [rerender, setRerender] = React.useState(false);

  //Redux Hooks
  const [createShopifyUserMutation, createResult] = useCreateShopifyUserMutation();
  const [addUserData, userResult] = useAddUserDataMutation();
  const [resetShopifyUserMutation, resetResult] = useResetShopifyUserMutation();

  //USE EFFECT TO SET UPDATED PASSWORD
  React.useEffect(() => {
    onChangePassword(DEFAULT_PSWD().toString());
  }, [email]);

  React.useEffect(() => {
    if (createResult.isError || userResult.isError || resetResult.isError) someErrorLabel.current = true;
    setRerender(!rerender); //Re-render to show refs updated value
    if (LOG === true) console.log(createResult.isError + '---' + JSON.stringify(userResult) + ' --- ' + resetResult.isError + '1. SWW :' + someErrorLabel.current);
  }, [createResult.isError, userResult.isError, resetResult.isError]);

  //DATE PICKER METHODS
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDOB(moment(date).format());
    if (LOG === true) console.log('A date has been picked: ', moment(date).format());
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
  const handleLabelChange = (el, fnl) => {
    onChangeEmailLabel(el);
    onChangeFirstNameLabel(fnl);
  };

  //HANDLE FORM SUBMIT
  const handleSubmit = async () => {
    //Initializing error flags
    hasErrorLabel.current = false;
    someErrorLabel.current = false;
    if (LOG === true) console.log('1. SWW :' + someErrorLabel.current + '  --  ERR: ' + hasErrorLabel.current + '  ' + Date.now());

    //Performing initial form validation
    const formErr = formValidation(email, firstName);
    //Changing Labels
    handleLabelChange(formErr.emailLabel, formErr.firstNameLabel);

    //Setting label error flag to true if form failed any field validation
    if (formErr.hasErrorLabel) hasErrorLabel.current = true;

    // If form has no error submit it to SHOPIFY
    if (!hasErrorLabel.current) {
      //Creating User
      if (LOG === true) console.log('Creating customer :- ' + password);
      createShopifyUserMutation(CREATE_USER_VAR(firstName, lastName, email, password, terms))
        .then((result) => {
          //Checking if response had some base errors
          if (result?.data.errors) {
            throw new Error(result?.data.errors[0].message);
          }
          //If there are no error storing customer data into variable
          var customerCreate = result?.data.data.customerCreate;
          let errorMSG;
          //If customer_create has some error, map it to the label
          if (customerCreate?.customerUserErrors.length > 0) {
            customerCreate?.customerUserErrors.map((item) => {
              onChangeEmailLabel(item.message);
              if (LOG === true) console.log(item.message);
              errorMSG = item.message;
            });
            //Found error so we dont have result
            throw new Error(errorMSG);
          }
          return result;
        })
        //Now, generating a RESET password link
        .then(async (result) => {
          if (LOG === true) console.log('Sending reset password link ...');
          const resetResult = await resetShopifyUserMutation(RESET_USER_VAR(email));
          if (LOG === true) console.log('AccessToken :- ' + JSON.stringify(resetResult));
          if (!resetResult?.data.data.customerRecover.customerUserErrors.length > 0) {
            successLabel.current = true;
            setRerender(!rerender);
            setTimeout(() => {
              handleClick('SignIn', 'Sign In');
            }, 5000);
            return result;
          } else {
            throw new Error('Failed to send password reset link!');
          }
        })
        .then((result) => {
          if (LOG === true) console.log(JSON.stringify(result));
          let gId = result?.data.data.customerCreate.customer.id;
          const myArray = gId.split('/');
          let customerId = parseInt(myArray[myArray.length - 1]);
          addUserData(STRAPI_ADD_USER_DATA(customerId, firstName, lastName, email, DOB, gender, terms));
        })
        .catch((err) => {
          console.log('Error Message:- ' + err.message);
          someErrorLabel.current = true;
          setRerender(!rerender); //Re-render to show refs updated value
        });
    }
  };

  // getLocal();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView alwaysBounceVertical={false} bounces={false} bouncesZoom={false} maximumZoomScale={0} showsVerticalScrollIndicator={false}>
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
                    marginTop: Mixins.moderateScale(30),
                  }}
                >
                  <Text style={styles.heading}>LET'S BECOME A </Text>
                  <Text style={[styles.heading_2, {}]}>MEMBER </Text>
                </View>
                <Text style={[styles.body, { marginTop: Mixins.moderateScale(5) }]}>AND RECIEVE THOUSANDS OF BENEFITS</Text>
              </View>

              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* ------------------------EMAIL ADDRESS------------------------------------------ */}
                {someErrorLabel.current ? (
                  <Text style={styles.topLabel}>
                    <Warning name="warning" color="red" size={Mixins.moderateScale(16)} /> SOMETHING WENT WRONG, TRY AGAIN LATER
                  </Text>
                ) : (
                  <View
                    style={{
                      marginTop: Mixins.moderateScale(32),
                    }}
                  ></View>
                )}
                {successLabel.current ? (
                  <Text style={styles.topSuccessLabel}>
                    <Warning name="check" color="#1D6F00" size={Mixins.moderateScale(16)} /> ACCOUNT CREATED, CHECK YOUR EMAIL TO SET PASSWORD
                  </Text>
                ) : (
                  <View
                    style={{
                      marginTop: Mixins.moderateScale(32),
                    }}
                  ></View>
                )}
                <TextInput style={[styles.input, { width: Mixins.scaleSize(340) }]} onChangeText={onChangeEmail} value={email} placeholder="EMAIL ADDRESS" placeholderTextColor="#aaa" />
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
                  <TextInput style={[styles.input, { width: Mixins.scaleSize(165) }]} onChangeText={onChangeFirstName} value={firstName} placeholder="FIRST NAME" placeholderTextColor="#aaa" />
                  <TextInput style={[styles.input, { width: Mixins.scaleSize(165) }]} onChangeText={onChangeLastName} value={lastName} placeholder="LAST NAME" placeholderTextColor="#aaa" />
                </View>
                {firstNameLabel ? <Text style={styles.label}>{firstNameLabel}</Text> : null}

                {/* -----------------------------GENDER----------------------------------- */}

                <View
                  style={[
                    {
                      width: Mixins.scaleSize(340),
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginVertical: Mixins.moderateScale(5),
                    },
                  ]}
                >
                  <Text style={[styles.body]} onPress={() => toggleGender('MALE')}>
                    {gender == 'MALE' ? <Icon name="checkbox-active" color="#000" size={18} /> : <Icon name="checkbox-passive" color="#000" size={Mixins.moderateScale(18)} />}
                    {'  '}
                    MALE
                  </Text>
                  <Text style={[styles.body]} onPress={() => toggleGender('FEMALE')}>
                    {gender == 'FEMALE' ? <Icon name="checkbox-active" color="#000" size={18} /> : <Icon name="checkbox-passive" color="#000" size={Mixins.moderateScale(18)} />}
                    {'  '}
                    FEMALE
                  </Text>
                  <Text style={[styles.body]} onPress={() => toggleGender('OTHER')}>
                    {gender == 'OTHER' ? <Icon name="checkbox-active" color="#000" size={18} /> : <Icon name="checkbox-passive" color="#000" size={Mixins.moderateScale(18)} />}
                    {'  '}
                    OTHER
                  </Text>
                </View>
                <View style={styles.custom_input}>
                  <Text
                    // placeholder="ENTER YOUR DOB"
                    style={{ fontFamily: Typography.FONT_FAMILY_HEADING, fontSize: Typography.FONT_SIZE_16, color: DOB ? '#000' : '#999' }}
                    onPress={showDatePicker}
                  >
                    {DOB ? moment(DOB).format('DD MMMM YYYY') : 'ENTER YOUR DATE OF BIRTH'}
                  </Text>
                </View>

                <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />

                <Text style={[styles.body, { marginTop: Mixins.moderateScale(5) }]} onPress={toggleTerms}>
                  {terms ? <Icon name="checkbox-active" color="#000" size={18} /> : <Icon name="checkbox-passive" color="#000" size={Mixins.moderateScale(18)} />}
                  {'  '}AGREE TO OUR{' '}
                  <Text style={{ textDecorationLine: 'underline' }} onPress={() => handleClick('APPLICATION PRIVACY POLICY', 'APPLICATION PRIVACY POLICY')}>
                    TERMS AND CONDITIONS?
                  </Text>
                </Text>
                <Button //
                  onPress={handleSubmit} //{() => handleClick('BaseTabNav', 'HomeScreen')}
                  title="CREATE ACCOUNT"
                  fill="#000"
                  color="#fff"
                  isLoading={createResult.isLoading || userResult.isLoading}
                  style={{ marginVertical: Mixins.moderateScale(30) }}
                ></Button>
                <Text style={[styles.body]} onPress={() => handleClick('SignIn', 'Sign In')}>
                  {' '}
                  ALREADY A MEMEBER? <Text style={{ textDecorationLine: 'underline' }}>SIGN-IN HERE</Text>
                </Text>
                <Text style={[styles.body, { marginTop: Mixins.moderateScale(24), textDecorationLine: 'underline' }]} onPress={() => handleClick('Reset', 'Reset Password')}>
                  RESET PASSWORD?
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
    paddingVertical: Mixins.moderateScale(70),
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
    borderRadius: Mixins.moderateScale(5),
    height: Mixins.moderateScale(40),
    marginVertical: Mixins.moderateScale(15),
    borderWidth: 1,
    padding: Mixins.moderateScale(10),
  },
  custom_input: {
    borderRadius: Mixins.moderateScale(5),
    width: Mixins.scaleSize(340),
    height: Mixins.moderateScale(40),
    marginVertical: Mixins.moderateScale(15),
    borderWidth: 1,
    padding: Mixins.moderateScale(10),
  },
  label: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    width: Mixins.scaleSize(340),
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Mixins.moderateScale(-12),
    marginBottom: Mixins.moderateScale(10),
    // borderWidth: 1,
    color: 'red',
  },
  labelSmall: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    width: Mixins.scaleSize(165),
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Mixins.moderateScale(-15),
    marginBottom: Mixins.moderateScale(10),
    color: 'red',
  },
  topLabel: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
    // marginTop: Mixins.scaleSize(24),
    // marginBottom: Mixins.scaleSize(10),
    backgroundColor: '#FFF4D8',
    paddingHorizontal: Mixins.moderateScale(16),
    paddingVertical: Mixins.moderateScale(8),
    borderRadius: Mixins.moderateScale(8),
    color: 'red',
  },
  topSuccessLabel: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Mixins.moderateScale(24),
    marginBottom: Mixins.moderateScale(10),
    backgroundColor: '#E3FFD9',
    paddingHorizontal: Mixins.moderateScale(16),
    paddingVertical: Mixins.moderateScale(8),
    borderRadius: Mixins.moderateScale(8),
    color: '#1D6F00',
  },
});
