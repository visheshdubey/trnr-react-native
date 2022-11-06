import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { Mixins, Typography } from '../styles';
import { useResetShopifyUserMutation } from '../services/shopify';
import { LOG, RESET_USER_VAR } from '../utils/ApiConstants';

import { resetFormValidation } from '../utils/formValidations';

import Warning from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/features/userSlice';

const ResetScreen = ({ navigation: { goBack }, route, navigation }) => {
  //Form States
  const [email, onChangeEmail] = React.useState(null);
  // Label States
  const [emailLabel, onChangeEmailLabel] = React.useState(null);

  //Error Refs
  let hasErrorLabel = useRef(false);
  let someErrorLabel = useRef(false);
  let successLabel = useRef(false);

  const [rerender, setRerender] = React.useState(false);
  //RTK Hooks
  const [resetShopifyUserMutation, resetResult] = useResetShopifyUserMutation();

  const isSignnedIn = useSelector((state) => state.user.isSignnedIn);
  const dispatch = useDispatch();

  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };

  //BULK CHANGE LABEL
  const handleLabelChange = (el) => {
    onChangeEmailLabel(el);
  };
  const handleSignIn = () => {
    //Initializing error flags
    if (LOG === true) console.log('🚀 ~ file: ResetScreen.jsx ~ line 43 ~ .then ~ someErrorLabel.current', someErrorLabel.current);
    if (LOG === true) console.log('🚀 ~ file: ResetScreen.jsx ~ line 44 ~ .then ~ hasErrorLabel.current', hasErrorLabel.current);

    //Performing initial form validation
    const formErr = resetFormValidation(email);

    //Changing Labels
    handleLabelChange(formErr.emailLabel);

    //Setting label error flag to true if form failed any field validation
    if (formErr.hasErrorLabel) hasErrorLabel.current = true;

    // If form has no error submit it to SHOPIFY
    if (!hasErrorLabel.current) {
      resetShopifyUserMutation(RESET_USER_VAR(email))
        .then((result) => {
          if (result?.data.errors) {
            throw new Error(result?.data.errors[0].message);
          }
          if (LOG === true) console.log('🚀 ~ file: ResetScreen.jsx ~ line 64 ~ .Shopify Access Token result ~ JSON.stringify(result)', JSON.stringify(result));
          if (!result?.data.data.customerRecover.customerUserErrors.length > 0) {
            successLabel.current = true;
            setRerender(!rerender);

            setTimeout(() => {
              dispatch(logout());
            }, 3500);
            return result;
          } else {
            throw new Error('Failed to send password reset link!');
          }
        })
        .catch((err) => {
          console.log('🔴 ~ file: ResetScreen.jsx ~ line 78 ~ handleSignIn ~ err', err);
          someErrorLabel.current = true;
          setRerender(!rerender); //Re-render to show refs updated value
        });
    }
  };
  // result.isSuccess ? null : null;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView alwaysBounceVertical={false} bounces={false} bouncesZoom={false} maximumZoomScale={0} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Logo />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: Mixins.moderateScale(30),
              }}
            >
              <Text style={styles.heading}>RESET PASSWORD</Text>
              {/* <Text style={[styles.heading_2, {}]}>MEMBER </Text> */}
            </View>

            <Text style={[styles.body, { marginTop: 5 }]}>GENERATE A RESET PASSWORD LINK</Text>
            {/* ------------------------EMAIL ADDRESS------------------------------------------ */}
            {someErrorLabel.current ? (
              <Text style={styles.topLabel}>
                <Warning name="warning" color="red" size={16} /> SOMETHING WENT WRONG, TRY AGAIN LATER
              </Text>
            ) : (
              <View
                style={{
                  marginTop: Mixins.scaleSize(32),
                }}
              ></View>
            )}
            {successLabel.current ? (
              <Text style={styles.topSuccessLabel}>
                <Warning name="check" color="#1D6F00" size={16} /> LINK GENERATED SUCCESFULLY, CHECK YOUR EMAIL!
              </Text>
            ) : (
              <View
                style={{
                  marginTop: Mixins.scaleSize(32),
                }}
              ></View>
            )}

            <TextInput style={[styles.input, { width: Mixins.scaleSize(340) }]} onChangeText={onChangeEmail} value={email} placeholder="EMAIL ADDRESS" placeholderTextColor="#aaa" />
            {emailLabel ? <Text style={styles.label}>{emailLabel}</Text> : null}
            {!isSignnedIn ? (
              <>
                <Text style={[styles.body, { marginTop: Mixins.scaleSize(24) }]} onPress={() => handleClick('SignIn', 'SignIn')}>
                  REMEMBER PASSWORD?
                </Text>
              </>
            ) : null}
            <Button onPress={handleSignIn} title="GENERATE RESET LINK" fill="#000" color="#fff" style={{ marginVertical: 20 }} isLoading={resetResult.isLoading}></Button>
            {isSignnedIn ? <Button onPress={goBack} title="CLOSE" fill="#fafafa" color="#C53437"></Button> : null}

            {!isSignnedIn ? (
              <>
                <Text style={styles.body} onPress={() => handleClick('SignUp', 'Sign Up')}>
                  NEW MEMEBER? SIGN-UP HERE
                </Text>
              </>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: Mixins.moderateScale(70, 0.1),
  },
  heading: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: 28,
  },
  heading_2: {
    fontFamily: Typography.FONT_FAMILY_DISPLAY,
    fontSize: 32,
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
  label: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    width: Mixins.scaleSize(340),
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Mixins.scaleSize(-12),
    marginBottom: Mixins.scaleSize(10),
    // borderWidth: 1,
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
  topSuccessLabel: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Mixins.scaleSize(24),
    marginBottom: Mixins.scaleSize(10),
    backgroundColor: '#E3FFD9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    color: '#1D6F00',
  },
});
