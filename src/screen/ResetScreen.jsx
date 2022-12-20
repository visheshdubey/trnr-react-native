import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Mixins, Typography } from '../styles';
import Button from '../components/Button';
import { moderateScale } from '../styles/mixins';
import { resetFormValidation, signInFormValidation } from '../utils/formValidations';
import { useUserLoginMutation, useUserResetMutation } from '../services/strapi';
import { getDataObject, storeDataObject } from '../services/local';
import { useDispatch } from 'react-redux';
import { signin } from '../services/features/userSlice';

const ResetScreen = ({ navigation }) => {
  //Force Update
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  //Form States
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState('');
  const [error, seterror] = useState(null);
  const [info, setinfo] = useState('');
  //RTK Hooks
  const [userReset, userResetResult] = useUserResetMutation();
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
    errors.current = resetFormValidation(email);
    if (!errors.current.hasErrorLabel) {
      try {
        const data = await userReset({
          email: email,
        });
        if (data?.data?.ok) {
          setinfo('Reset link shared on your email, please check your inbox.');
        } else {
          seterror('Something went wrong!');
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
      <ScrollView alwaysBounceVertical={false} bounces={false} bouncesZoom={false} maximumZoomScale={0} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
        <View style={{ marginVertical: Mixins.moderateScale(50) }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {info && (
                <View style={{ padding: moderateScale(10), marginVertical: moderateScale(10), backgroundColor: '#bfb', borderRadius: moderateScale(5) }}>
                  <Text style={{ fontFamily: Typography.FONT_FAMILY_BODY, fontSize: Typography.FONT_SIZE_16, color: '#003d0e' }}>{info}</Text>
                </View>
              )}
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
                  <Button //
                    onPress={handleSubmit}
                    title="GENERATE LINK"
                    fill="#000"
                    color="#fff"
                    isLoading={userResetResult.isLoading}
                    style={{ marginVertical: Mixins.moderateScale(30) }}
                  ></Button>
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
    borderBottomWidth: 1,
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

export default ResetScreen;
