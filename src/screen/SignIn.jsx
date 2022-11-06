import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { Mixins, Typography } from '../styles';
import { useAccessTokenShopifyUserMutation, useGetShopifyUserMutation } from '../services/shopify';
import { ACCESS_TOKEN_USER_VAR, GET_USER_VAR, LOG, STRAPI_ADD_USER_DATA_AT_SIGNIN } from '../utils/ApiConstants';

import { getDataObject, storeDataObject } from '../services/local';
import { signInFormValidation } from '../utils/formValidations';
import { useDispatch, useSelector } from 'react-redux';

import { signin } from '../services/features/userSlice';
import { useAddUserDataMutation } from '../services/strapi';

import Warning from 'react-native-vector-icons/FontAwesome';

const SignIn = ({ navigation, route }) => {
  //Form States
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  // Label States
  const [emailLabel, onChangeEmailLabel] = React.useState(null);
  const [passwordLabel, onChangePasswordLabel] = React.useState(null);

  const isSignnedIn = useSelector((state) => state.user.isSignnedIn);
  const dispatch = useDispatch();
  //Error Refs
  let hasErrorLabel = useRef(false);
  let someErrorLabel = useRef(false);
  let successLabel = useRef(false);

  const [rerender, setRerender] = React.useState(false);
  const [accessTokenShopifyUser, tokenResult] = useAccessTokenShopifyUserMutation();
  const [getShopifyUser, shopifyUserResult] = useGetShopifyUserMutation();
  const [addUserData, userResult] = useAddUserDataMutation();

  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };
  //Set data to Local Storage
  const setLocal = async (data) => {
    await storeDataObject(data);
  };
  // Get Local data
  const getLocal = async () => {
    const x = await getDataObject();
    if (LOG === true) console.log('Local Data:- ' + JSON.stringify(x));
  };

  //BULK CHANGE LABEL
  const handleLabelChange = (el, pl) => {
    onChangeEmailLabel(el);
    onChangePasswordLabel(pl);
  };
  const handleSignIn = () => {
    //Initializing error flags
    hasErrorLabel.current = false;
    someErrorLabel.current = false;
    if (LOG === true) console.log('SIGNIN ERROR -> 1. SWW :' + someErrorLabel.current + '  --  ERR: ' + hasErrorLabel.current + '  ' + Date.now());

    //Performing initial form validation
    const formErr = signInFormValidation(email, password);

    //Changing Labels
    handleLabelChange(formErr.emailLabel, formErr.passwordLabel);

    //Setting label error flag to true if form failed any field validation
    if (formErr.hasErrorLabel) hasErrorLabel.current = true;

    // If form has no error submit it to SHOPIFY
    if (!hasErrorLabel.current) {
      accessTokenShopifyUser(ACCESS_TOKEN_USER_VAR(email, password))
        .then((result) => {
          const accessTokenResult = result?.data.data.customerAccessTokenCreate;
          if (LOG === true) console.log('AccessToken :- ' + JSON.stringify(accessTokenResult));
          // Checking if we encountered any error || error array length > 0
          if (!accessTokenResult?.customerUserErrors.length > 0) {
            if (accessTokenResult?.customerAccessToken.accessToken) {
              const token = accessTokenResult?.customerAccessToken.accessToken;
              const expiresAt = accessTokenResult?.customerAccessToken.expiresAt;
              if (LOG === true) console.log('Token :-' + token);
              //Returning Token because user token is stored in local
              return { token, expiresAt };
            }
          }
          throw new Error('Failed to generate access token');
        })
        .then(async ({ token, expiresAt }) => {
          const shopifyUserData = await getShopifyUser(GET_USER_VAR(token));
          return { shopifyUserData, token, expiresAt };
        })
        .then(async ({ shopifyUserData, token, expiresAt }) => {
          // Checking if all previous then went through

          if (LOG === true) console.log(JSON.stringify(shopifyUserData));
          let customerObj = shopifyUserData?.data.data.customer;
          let gId = customerObj.id;
          const myArray = gId.split('/');
          let customerID = parseInt(myArray[myArray.length - 1]);
          if (LOG === true) console.log(customerID);
          const strapi = await addUserData(STRAPI_ADD_USER_DATA_AT_SIGNIN(customerID, customerObj.firstName, customerObj.lastName, customerObj.email));
          if (strapi?.data.name) throw new Error('Validation Error');
          if (LOG === true) console.log(JSON.stringify(userResult));
          const data = {
            isSignnedIn: true,
            accessToken: token,
            customerID: customerID,
            expiresAt: expiresAt,
          };
          if (LOG === true) console.log('Storing token locally');

          setLocal(data);
          getLocal();
          dispatch(signin(data));
          if (LOG === true) console.log(isSignnedIn);
        })
        .catch((err) => {
          console.log(err);
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

            <View style={styles.container_2}>
              <Text style={styles.heading}>WELCOME BACK </Text>
              {/* <Text style={[styles.heading_2, {}]}>MEMBER </Text> */}
            </View>

            <Text style={[styles.body, { marginTop: Mixins.moderateScale(5) }]}>SIGNIN TO YOUR ACCOUNT</Text>
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

            <TextInput style={[styles.input, { width: Mixins.scaleSize(340) }]} onChangeText={onChangeEmail} value={email} placeholder="EMAIL ADDRESS" placeholderTextColor="#aaa" />
            {emailLabel ? <Text style={styles.label}>{emailLabel}</Text> : null}
            {/* --------------------------------PASSWORD--------------------------------------------- */}
            <TextInput
              style={[styles.input, { width: Mixins.scaleSize(340) }]}
              onChangeText={onChangePassword}
              value={password}
              placeholder="PASSWORD"
              secureTextEntry={true}
              placeholderTextColor="#aaa"
            />
            <Text style={styles.label}>{passwordLabel}</Text>

            <Text style={[styles.body, { marginTop: Mixins.moderateScale(24), textDecorationLine: 'underline' }]} onPress={() => handleClick('Reset', 'Reset Password')}>
              RESET PASSWORD?
            </Text>
            <Button
              onPress={handleSignIn}
              title="SIGNIN"
              fill="#000"
              color="#fff"
              style={{ marginVertical: Mixins.moderateScale(20) }}
              isLoading={shopifyUserResult.isLoading || userResult.isLoading || tokenResult.isLoading}
            ></Button>
            <Text style={styles.body} onPress={() => handleClick('SignUp', 'Sign Up')}>
              NEW MEMEBER? <Text style={{ textDecorationLine: 'underline' }}>SIGN-UP HERE</Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container_2: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Mixins.moderateScale(30),
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    paddingVertical: Mixins.moderateScale(70),
    
  },
  heading: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
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
  label: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    width: Mixins.scaleSize(340),
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Mixins.moderateScale(-12),
    marginBottom: Mixins.moderateScale(10),
    // borderWidth: 1,
    color: 'red',
  },
  topLabel: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Mixins.moderateScale(24),
    marginBottom: Mixins.moderateScale(10),
    backgroundColor: '#FFF4D8',
    paddingHorizontal: Mixins.moderateScale(16),
    paddingVertical: Mixins.moderateScale(8),
    borderRadius: Mixins.moderateScale(8),
    color: 'red',
  },
});
