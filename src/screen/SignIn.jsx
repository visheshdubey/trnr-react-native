import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View } from 'react-native';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { Mixins, Typography } from '../styles';
import DatePicker from '../components/DatePicker';
import { useAccessTokenShopifyUserMutation, useGetShopifyUserMutation } from '../services/shopify';
import { ACCESS_TOKEN_USER_VAR, GET_USER_VAR } from '../utils/ApiConstants';

const SignIn = ({ navigation, route }) => {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  const [accessTokenShopifyUser, tokenResult] = useAccessTokenShopifyUserMutation();
  const [getShopifyUser, userResult] = useGetShopifyUserMutation();

  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };

  const handleSignIn = () => {
    accessTokenShopifyUser(ACCESS_TOKEN_USER_VAR(email, password))
      .then((result, err) => {
        const token = result.data.data.customerAccessTokenCreate.customerAccessToken.accessToken;
        console.log(JSON.stringify(token));
        return token;
      })
      .then((result, err) => getShopifyUser(GET_USER_VAR(result)))
      .then((result, err) => {
        console.log(result.data.data.customer.firstName);
        //save user object in ASYNC STORAGE
      });
  };
  // result.isSuccess ? null : null;
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <Text style={styles.heading}>WELCOME BACK </Text>
        {/* <Text style={[styles.heading_2, {}]}>MEMBER </Text> */}
      </View>

      <Text style={[styles.body, { marginTop: 5 }]}>SIGNIN TO YOUR ACCOUNT</Text>
      <TextInput
        style={[styles.input, { width: Mixins.scaleSize(340), marginTop: Mixins.scaleSize(50) }]}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="EMAIL ADDRESS"
      />
      <TextInput
        style={[styles.input, { width: Mixins.scaleSize(340) }]}
        onChangeText={onChangePassword}
        value={password}
        placeholder="PASSWORD"
        secureTextEntry={true}
      />
      <Text style={styles.body} onPress={() => handleClick('Reset', 'Reset Password')}>
        RESET PASSWORD?
      </Text>
      <Button
        onPress={handleSignIn}
        title="SIGNIN"
        fill="#000"
        color="#fff"
        style={{ marginTop: 20 }}
      ></Button>
      <Text style={styles.body} onPress={() => handleClick('SignUp', 'Sign Up')}>
        NEW MEMEBER? SIGN-UP HERE
      </Text>
    </SafeAreaView>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 70,
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
    borderRadius: 5,
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
});
