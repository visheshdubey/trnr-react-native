import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import NetworkRequest from '../components/NetworkRequest';
import SmallButton from '../components/SmallButton';
import { logout } from '../services/features/userSlice';
import { useGetShopifyUserMutation, useUpdateShopifyUserMutation } from '../services/shopify';
import { Mixins, Typography } from '../styles';
import { GET_USER_VAR, LOG, STRAPI_ADD_USER_DATA_AT_PROFILE, UPDATE_USER_VAR } from '../utils/ApiConstants';

import { formValidation } from '../utils/formValidations';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAddUserDataMutation, useGetUserDataQuery } from '../services/strapi';
import moment from 'moment';
import { storeDataObject } from '../services/local';

import Icon from 'react-native-vector-icons/Fontisto';
import Warning from 'react-native-vector-icons/FontAwesome';

const Profile = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState(null);
  const [firstName, onChangeFirstName] = React.useState(null);
  const [lastName, onChangeLastName] = React.useState(null);
  const [edit, onChangeEdit] = React.useState(false);
  const [Gender, setGender] = React.useState(null);
  const [DOB, setDOB] = React.useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  // Label States
  const [emailLabel, onChangeEmailLabel] = React.useState(null);
  const [firstNameLabel, onChangeFirstNameLabel] = React.useState(null);

  //Error Refs
  let hasErrorLabel = useRef(false);
  let someErrorLabel = useRef(false);
  let successLabel = useRef(false);
  const [rerender, setRerender] = React.useState(false);

  const userId = useSelector((state) => state.user.customerID);

  //Redux Hooks
  const [getShopifyUser, result] = useGetShopifyUserMutation();
  const [updateShopifyUser, updateResult] = useUpdateShopifyUserMutation();
  const { error, data, isLoading, isFetching, refetch } = useGetUserDataQuery(userId);
  const [addUserData, userResult] = useAddUserDataMutation();

  //Storing Strapi data whenever data changes
  React.useEffect(() => {
    //Updating Date and Gender whenever data changes
    setDOB(data?.DOB);
    if (LOG === true) console.log('🚀 ~ file: Profile.jsx ~ line 53 ~ React.useEffect ~ data?.DOB', data?.DOB);
    setGender(data?.gender);
  }, [data]);

  const token = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();

  //DATE PICKER METHODS
  const showDatePicker = () => {
    if (edit) setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDOB(moment(date).format());
    if (LOG === true) console.log('🚀 ~ file: Profile.jsx ~ line 71 ~ handleConfirm ~ moment(date).format()', moment(date).format());
    hideDatePicker();
  };

  //GENDER SELECTION METHOD
  const toggleGender = (x) => {
    if (edit) setGender(x);
  };
  //Set data to Local Storage
  const setLocal = async (data) => {
    await storeDataObject(data);
  };
  //BULK CHANGE LABEL
  const handleLabelChange = (el, fnl) => {
    onChangeEmailLabel(el);
    onChangeFirstNameLabel(fnl);
  };

  const handleLogout = () => {
    dispatch(logout());
    setLocal({});
  };

  const toggleEdit = () => {
    onChangeEdit(!edit);
  };

  const updateFields = (fn, ln, eml) => {
    onChangeFirstName(fn);
    onChangeLastName(ln);
    onChangeEmail(eml);

    // setDOB(dob);
    // setGender(gender);

    //We Don't set date and gender here because it cause them to log a undefined value. They are set using useEffect block.
  };
  React.useEffect(() => {
    successLabel.current = false;
    hasErrorLabel.current = false;
    onChangeFirstNameLabel(false);
    setRerender(!rerender);
    getShopifyUser(GET_USER_VAR(token))
      .then((result) => {
        //Checking if response had some base errors

        if (result?.data.errors) throw new Error();

        if (LOG === true) console.log('🚀 ~ file: Profile.jsx ~ line 120 ~ .then ~ someErrorLabel.current', someErrorLabel.current);
        if (LOG === true) console.log('🚀 ~ file: Profile.jsx ~ line 122 ~ .then ~ hasErrorLabel.current', hasErrorLabel.current);
        const customer = result?.data.data.customer;
        return customer;
      })
      .then(async (customer) => {
        refetch();
        updateFields(customer.firstName, customer.lastName, customer.email);
      })
      .catch((err) => {
        console.log('🔴 ~ file: Profile.jsx ~ line 130 ~ React.useEffect ~ err', err);
        someErrorLabel.current = true;
        setRerender(!rerender); //Re-render to show refs updated value
      });
  }, [edit]);

  const handleSave = () => {
    //Initializing error flags
    hasErrorLabel.current = false;
    someErrorLabel.current = false;
    if (LOG === true) console.log('🚀 ~ file: Profile.jsx ~ line 139 ~ .then ~ someErrorLabel.current', someErrorLabel.current);
    if (LOG === true) console.log('🚀 ~ file: Profile.jsx ~ line 140 ~ .then ~ hasErrorLabel.current', hasErrorLabel.current);
    //Performing initial form validation
    const formErr = formValidation(email, firstName);
    //Changing Labels
    handleLabelChange(formErr.emailLabel, formErr.firstNameLabel);

    //Setting label error flag to true if form failed any field validation
    if (formErr.hasErrorLabel) hasErrorLabel.current = true;

    // If form has no error submit it to SHOPIFY
    if (!hasErrorLabel.current) {
      updateShopifyUser(UPDATE_USER_VAR(firstName, lastName, token))
        .then((result) => {
          if (LOG === true) console.log('🚀 ~ file: Profile.jsx ~ line 154 ~ updateShopifyUser.then ~ JSON.stringify(result)', JSON.stringify(result));
          const customerUpdateObj = result?.data.data.customerUpdate;
          if (!customerUpdateObj.customerUserErrors.length > 0) {
            return customerUpdateObj.customer.id; //returning customer ID to next block
          }
          throw new Error('Failed to Update Shopify User');
        })
        .then(async (gId) => {
          // Checking if all previous then went through

          const myArray = gId.split('/');
          let customerID = parseInt(myArray[myArray.length - 1]);
          if (LOG === true) console.log('🚀 ~ file: Profile.jsx ~ line 166 ~ updateShopifyUser.then.then ~ customerID', customerID);
          const strapi = await addUserData(STRAPI_ADD_USER_DATA_AT_PROFILE(customerID, firstName, lastName, Gender, DOB));
          if (strapi?.data.name) throw new Error('Validation Error');
          if (LOG === true) console.log('🚀 ~ file: Profile.jsx ~ line 169 ~ Strapi response ~ JSON.stringify(userResult)', JSON.stringify(userResult));
          // refetch();
          successLabel.current = true;
          setRerender(!rerender);
        })
        .catch((err) => {
          console.log('🔴 ~ file: Profile.jsx ~ line 175 ~ handleSave ~ err', err);
          someErrorLabel.current = true;
          setRerender(!rerender); //Re-render to show refs updated value
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <NetworkRequest error={result.error || error} data={result.data} isLoading={result.isLoading || isLoading}>
        <ScrollView
          alwaysBounceVertical={false}
          bounces={false}
          bouncesZoom={false}
          maximumZoomScale={0}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, flexGrow: 1 }}
          // contentContainerStyle={{ flex: 1 }}
        >
          <View style={[styles.container]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
              <View style={[styles.inner, { flex: 1 }]}>
                <View
                  style={{
                    width: Mixins.scaleSize(340),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.heading}>
                    {'Hi, '}
                    {firstName && Typography.truncateString(firstName, 12)}
                  </Text>

                  {edit ? (
                    <SmallButton onPress={toggleEdit} title="CLOSE" fill="#000" color="#C53437"></SmallButton>
                  ) : (
                    <SmallButton onPress={toggleEdit} title="EDIT" fill="#fff" color="#000"></SmallButton>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* ------------------------EMAIL ADDRESS------------------------------------------ */}
                    {someErrorLabel.current ? (
                      <Text style={styles.topLabel}>
                        <Warning name="warning" color="red" size={16} /> SOMETHING WENT WRONG, TRY AGAIN LATER
                      </Text>
                    ) : (
                      <View
                        style={{
                          marginTop: Mixins.moderateScale(32, 0.1),
                        }}
                      ></View>
                    )}
                    {successLabel.current ? (
                      <Text style={styles.topSuccessLabel}>
                        <Warning name="check" color="#1D6F00" size={16} /> PROFILE UPDATED
                      </Text>
                    ) : (
                      <View
                        style={{
                          marginTop: Mixins.moderateScale(32, 0.1),
                        }}
                      ></View>
                    )}
                    <Text style={[styles.disableInput, { width: Mixins.moderateScale(340, 0.1) }]}>{email}</Text>
                    {emailLabel && hasErrorLabel.current ? <Text style={styles.label}>{emailLabel}</Text> : null}
                    {/* ----------------------------USER NAME ------------------------------------------ */}
                    <View
                      style={{
                        width: Mixins.moderateScale(340, 0.1),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <TextInput
                        style={[edit ? styles.input : styles.disableInput, { width: Mixins.moderateScale(165, 0.1) }]}
                        onChangeText={onChangeFirstName}
                        editable={edit}
                        value={firstName}
                        placeholder="FIRST NAME"
                        placeholderTextColor="#aaa"
                      />

                      <TextInput
                        style={[edit ? styles.input : styles.disableInput, { width: Mixins.moderateScale(165, 0.1) }]}
                        onChangeText={onChangeLastName}
                        editable={edit}
                        value={lastName}
                        placeholder="LAST NAME"
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    {firstNameLabel ? <Text style={styles.label}>{firstNameLabel}</Text> : null}

                    {/* -----------------------------GENDER----------------------------------- */}

                    <View
                      style={[
                        {
                          width: Mixins.moderateScale(340, 0.1),
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginVertical: Mixins.moderateScale(5, 0.1),
                        },
                      ]}
                    >
                      <Text style={[styles.body, edit ? styles.checkbox : styles.disableCheckbox]} onPress={() => toggleGender('MALE')}>
                        {Gender == 'MALE' ? <Icon name="checkbox-active" size={18} /> : <Icon name="checkbox-passive" size={18} />}
                        {'  '}
                        MALE
                      </Text>
                      <Text style={[styles.body, edit ? styles.checkbox : styles.disableCheckbox]} onPress={() => toggleGender('FEMALE')}>
                        {Gender == 'FEMALE' ? <Icon name="checkbox-active" size={18} /> : <Icon name="checkbox-passive" size={18} />}
                        {'  '}
                        FEMALE
                      </Text>
                      <Text style={[styles.body, edit ? styles.checkbox : styles.disableCheckbox]} onPress={() => toggleGender('OTHER')}>
                        {Gender == 'OTHER' ? <Icon name="checkbox-active" size={18} /> : <Icon name="checkbox-passive" size={18} />}
                        {'  '}
                        OTHER
                      </Text>
                    </View>
                    <View style={[styles.custom_input, { backgroundColor: !edit ? '#f9f9f9' : '#fff', borderColor: !edit ? '#ddd' : '#000', color: !edit ? '#888' : '#000' }]}>
                      <Text
                        // placeholder="ENTER YOUR DOB"
                        style={{ fontFamily: Typography.FONT_FAMILY_HEADING, fontSize: Typography.FONT_SIZE_16, color: edit ? (DOB ? '#000' : '#999') : '#999' }}
                        onPress={showDatePicker}
                      >
                        {DOB ? moment(DOB).format('DD MMMM YYYY') : 'ENTER YOUR DATE OF BIRTH'}
                      </Text>
                    </View>

                    <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
                    <Text
                      style={{ textDecorationLine: 'underline', fontFamily: Typography.FONT_FAMILY_HEADING }}
                      onPress={() => navigation.navigate('APPLICATION PRIVACY POLICY', 'APPLICATION PRIVACY POLICY')}
                    >
                      TERMS AND CONDITIONS?
                    </Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {edit ? (
                      <View style={{ minHeight: Mixins.moderateScale(100, 0.1), justifyContent: 'space-between' }}>
                        <Button onPress={handleSave} title="SAVE" fill="#000" color="#fff" isLoading={updateResult.isLoading || isLoading}></Button>
                        <Button onPress={toggleEdit} title="CLOSE" fill="#f9f9f9" color="#C53437"></Button>
                      </View>
                    ) : (
                      <View style={{ minHeight: Mixins.moderateScale(100, 0.1), justifyContent: 'space-between' }}>
                        <Button onPress={() => navigation.navigate('Reset', 'Reset Password')} title="RESET PASSWORD" fill="#FFF" color="black" />
                        <Button onPress={handleLogout} title="LOG OUT" fill="#f9f9f9" color="red" />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </NetworkRequest>
    </SafeAreaView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Mixins.moderateScale(150, 0.1),
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: Mixins.moderateScale(30, 0.1),
  },
  heading: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_48,
  },
  editField: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_14,
    borderRadius: Mixins.moderateScale(2, 0.1),
    paddingHorizontal: Mixins.moderateScale(4, 0.1),
    paddingVertical: Mixins.moderateScale(4, 0.1),
    borderWidth: 1,
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
    borderRadius: Mixins.moderateScale(5, 0.1),
    height: Mixins.moderateScale(40, 0.1),
    marginVertical: Mixins.moderateScale(15, 0.1),
    borderWidth: 1,
    padding: Mixins.moderateScale(10, 0.1),
  },

  custom_input: {
    borderRadius: Mixins.moderateScale(5),
    width: Mixins.moderateScale(340, 0.1),
    height: Mixins.moderateScale(40),
    marginVertical: Mixins.moderateScale(15),
    borderWidth: 1,
    padding: Mixins.moderateScale(10),
  },
  disableInput: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
    backgroundColor: '#f9f9f9',
    borderRadius: Mixins.moderateScale(5, 0.1),
    height: Mixins.moderateScale(40, 0.1),
    marginVertical: Mixins.moderateScale(15, 0.1),
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#888',
    padding: Mixins.moderateScale(10, 0.1),
  },
  checkbox: {
    color: 'black',
  },
  disableCheckbox: {
    color: '#888',
  },
  inputPlaceholder: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
    borderRadius: Mixins.moderateScale(5, 0.1),
    color: '#999',
    height: Mixins.moderateScale(40, 0.1),
    marginVertical: Mixins.moderateScale(15, 0.1),
    borderWidth: 1,
    padding: Mixins.moderateScale(10, 0.1),
  },
  label: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    width: Mixins.moderateScale(340, 0.1),
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Mixins.moderateScale(-12, 0.1),
    marginBottom: Mixins.moderateScale(10, 0.1),
    // borderWidth: 1,
    color: 'red',
  },
  labelSmall: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    width: Mixins.moderateScale(165, 0.1),
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Mixins.moderateScale(-15, 0.1),
    marginBottom: Mixins.moderateScale(10, 0.1),
    color: 'red',
  },
  topLabel: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
    marginVertical: Mixins.moderateScale(0),
    backgroundColor: '#FFF4D8',
    paddingHorizontal: Mixins.moderateScale(16, 0.1),
    paddingVertical: Mixins.moderateScale(8, 0.1),
    borderRadius: 8,
    color: 'red',
  },
  topSuccessLabel: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Mixins.moderateScale(0),
    marginBottom: Mixins.moderateScale(0),
    backgroundColor: '#E3FFD9',
    paddingHorizontal: Mixins.moderateScale(16, 0.1),
    paddingVertical: Mixins.moderateScale(8, 0.1),
    borderRadius: 8,
    color: '#1D6F00',
  },
});
