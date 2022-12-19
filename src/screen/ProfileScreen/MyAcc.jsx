import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, TouchableWithoutFeedback, Keyboard, Image, Alert, Pressable } from 'react-native';
import SnackBar from '../../components/SnackBar';
import { Mixins, Typography } from '../../styles';
import Icon from 'react-native-vector-icons/Fontisto';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import { moderateScale } from '../../styles/mixins';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { formValidation } from '../../utils/formValidations';
import { useAddProfileMutation, useAddUserMutation, useGetProfileQuery, useUpdateProfileMutation } from '../../services/strapi';
import { STRAPI_ADD_USER_DATA, STRAPI_UPDATE_PROFILE_USER_DATA } from '../../utils/ApiConstants';
import NetworkRequest from '../../components/NetworkRequest';

const MyAcc = ({ navigation, route }) => {
  const [state, setstate] = useState('NO');

  const location_input = route?.params?.location_input || null;
  const [snack_text, setsnack_text] = useState('Profile updated successfully!');
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [firstName, onChangeFirstName] = React.useState(null);
  const [lastName, onChangeLastName] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [gender, setGender] = React.useState('MALE');
  const [location, setLocation] = React.useState(null);
  const [dob, setDOB] = React.useState(null);
  const [terms, setTerms] = React.useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [error, seterror] = useState(null);
  // const [addUser, userResult] = useAddUserMutation();
  const [updateProfile, userResult] = useUpdateProfileMutation();

  const profileData = useGetProfileQuery();
  //   const state = useRef('NO').current;
  let errors = useRef(null);
  const openSnackBar = () => {
    setstate('ENTER');
    setTimeout(() => {
      setstate('EXIT');
    }, 2000);
  };
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
  const createTwoButtonAlert = () =>
    Alert.alert('Do you want to update your profile?', "Press 'OK' if you want to continue.", [
      {
        text: 'Cancel',
        onPress: () => false,
        style: 'cancel',
      },
      { text: 'OK', onPress: () => true },
    ]);
  React.useEffect(() => {
    if (location_input) {
      setLocation(location_input);
    }
  }, [location_input]);
  //Form Operations
  const handleUpdate = async () => {
    // errors.current =
    if (firstName.length < 1) {
      errors.current = {
        hasErrorLabel: true,
        firstNameLabel: "First name can't be empty",
      };
    }
    // console.log(createTwoButtonAlert());
    // createTwoButtonAlert();
    if (!errors.current?.hasErrorLabel) {
      try {
        seterror(null);
        const data = await updateProfile(STRAPI_UPDATE_PROFILE_USER_DATA(firstName, lastName, gender, dob, location));
        console.log(data?.data?.message);
        if (data?.data?.message?.firstName) {
          console.log(JSON.stringify(data));
          // profileData.refetch();
          setsnack_text('Profile updated successfully!');
          profileData.refetch();
          openSnackBar();
        } else {
          setsnack_text('Something went wrong!');
          openSnackBar();
        }

        // navigation.navigate('SignIn');
      } catch (err) {
        console.log(err.message);
        seterror(err.message);
      }
      // openSnackBar();
    } else {
      forceUpdate();
    }
  };

  React.useEffect(() => {
    if (profileData?.data) {
      console.log(profileData?.data);
      onChangeFirstName(profileData?.data?.firstName);
      onChangeLastName(profileData?.data?.lastName);
      onChangeEmail(profileData?.data?.email);
      setGender(profileData?.data?.gender);
      setDOB(profileData?.data?.DOB);
      if (!location_input) setLocation(profileData?.data?.country);
    }
  }, [profileData?.data]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <NetworkRequest error={profileData.error} data={profileData.data} isLoading={profileData.isLoading}>
        <ScrollView alwaysBounceVertical={false} bounces={false} bouncesZoom={false} maximumZoomScale={0} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
          <View style={{ marginTop: Mixins.moderateScale(10) }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {error && (
                  <View style={{ padding: moderateScale(10), marginVertical: moderateScale(10), backgroundColor: '#ffe88c', borderRadius: moderateScale(5) }}>
                    <Text style={{ fontFamily: Typography.FONT_FAMILY_BODY, fontSize: Typography.FONT_SIZE_16, color: '#8f7306' }}>{error}</Text>
                  </View>
                )}
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                  <View style={{ flex: 1, marginTop: 10, alignItems: 'center' }}>
                    <View style={styles.input_row}>
                      <Text style={styles.fieldLabel}>NAME</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput style={styles.fieldInput} onChangeText={onChangeFirstName} placeholder="First name" value={firstName} placeholderTextColor="#aaa" />
                        <TextInput style={styles.fieldInput} onChangeText={onChangeLastName} placeholder="Last name" value={lastName} placeholderTextColor="#aaa" />
                      </View>
                      {errors.current?.firstNameLabel ? <Text style={styles.error_text}>{errors.current?.firstNameLabel}</Text> : null}
                    </View>
                    <View style={[styles.input_row, { flexDirection: 'row' }]}>
                      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
                      <View style={{ flex: 1 }}>
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
                    </View>
                    <View style={styles.input_row}>
                      <Text style={styles.fieldLabel}>EMAIL</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput style={styles.fieldInput} onChangeText={onChangeEmail} placeholder="Enter your email" editable={false} value={email} placeholderTextColor="#aaa" />
                      </View>
                      {errors.current?.emailLabel ? <Text style={styles.error_text}>{errors.current?.emailLabel}</Text> : null}
                    </View>
                    <View style={styles.input_row}>
                      <Text style={styles.fieldLabel}>GENDER</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
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
                      <View style={{ flex: 1 }}>
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
                                from: 'MyAcc',
                              })
                            }
                          >
                            {location ? location : 'Enter your location'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Button //
                      onPress={handleUpdate}
                      title="SAVE"
                      fill="#000"
                      color="#fff"
                      isLoading={userResult.isLoading}
                      style={{ marginTop: Mixins.moderateScale(50), marginBottom: moderateScale(10) }}
                    ></Button>
                    <Text style={[styles.body, { textDecorationLine: 'underline' }]} onPress={() => navigation.navigate('ResetScreen', 'Reset Password')}>
                      RESET PASSWORD?
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>

        <SnackBar state={state} text={snack_text} />
      </NetworkRequest>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_28,
  },
  body: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    marginTop: Mixins.moderateScale(5),
    width: Mixins.scaleSize(250),
    textAlign: 'center',
  },
  fieldLabel: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_18,
  },
  fieldInput: {
    // borderBottomWidth: 1,
    flex: 1,
    paddingVertical: 8,
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    marginRight: 5,
  },
  custom_input: {
    // borderBottomWidth: 1,
    flex: 1,
    paddingVertical: moderateScale(13),
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    marginRight: 5,
  },
  input_row: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: Mixins.scaleSize(340),
    marginTop: moderateScale(30),
    // flexDirection: 'row',
  },
  error_text: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    color: '#f22',
  },
});

export default MyAcc;
